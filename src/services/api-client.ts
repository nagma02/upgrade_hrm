import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { appEnv } from '@/app/config/env'
import { APP_STORAGE_KEYS } from '@/constants/app'
import type { ApiErrorShape, ApiResponse, ApiSuccessResponse } from '@/types/api'
import type { AuthSession } from '@/types/auth'

export class ApiClientError extends Error implements ApiErrorShape {
  status: number
  code?: string
  details?: unknown

  constructor(shape: ApiErrorShape) {
    super(shape.message)
    this.name = 'ApiClientError'
    this.status = shape.status
    this.code = shape.code
    this.details = shape.details
  }
}

type RequestOptions<TBody = unknown> = Omit<
  AxiosRequestConfig<TBody>,
  'url' | 'method' | 'data'
> & { body?: TBody }

const client = axios.create({
  baseURL: appEnv.apiBaseUrl.replace(/\/$/, ''),
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})

client.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const serialized =
      window.localStorage.getItem(APP_STORAGE_KEYS.authSession) ??
      window.sessionStorage.getItem(APP_STORAGE_KEYS.authSession)
    if (serialized) {
      try {
        const session = JSON.parse(serialized) as AuthSession
        if (session.accessToken)
          config.headers.set('Authorization', `Bearer ${session.accessToken}`)
      } catch {
        window.localStorage.removeItem(APP_STORAGE_KEYS.authSession)
        window.sessionStorage.removeItem(APP_STORAGE_KEYS.authSession)
      }
    }
  }
  return config
})

client.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ success?: boolean; message?: string; errors?: unknown; code?: string }>) => {
    if (error.response?.status === 401 && typeof window !== 'undefined')
      window.dispatchEvent(new Event('hrm:unauthorized'))
    const payload = error.response?.data
    return Promise.reject(
      new ApiClientError({
        status: error.response?.status ?? 0,
        message: payload?.message ?? error.message ?? 'The request could not be completed.',
        code: payload?.code,
        details: payload?.errors,
      }),
    )
  },
)

async function request<TData, TBody = unknown>(
  path: string,
  options: RequestOptions<TBody> & { method?: AxiosRequestConfig['method'] } = {},
): Promise<ApiSuccessResponse<TData>> {
  const { body, ...config } = options
  try {
    const response = await client.request<ApiResponse<TData>>({ ...config, url: path, data: body })
    const payload = response.data
    if (payload && typeof payload === 'object' && 'success' in payload) {
      if (payload.success) return payload
      throw new ApiClientError({
        status: response.status,
        message: payload.message,
        details: payload.errors,
      })
    }
    return { success: true, message: 'Request completed.', data: payload as TData }
  } catch (error) {
    if (error instanceof ApiClientError) throw error
    throw new ApiClientError({
      status: 0,
      message: error instanceof Error ? error.message : 'The request could not be completed.',
    })
  }
}

export const apiClient = {
  get: <TData>(path: string, signal?: AbortSignal) =>
    request<TData>(path, { method: 'GET', signal }),
  post: <TData, TBody = unknown>(path: string, body?: TBody) =>
    request<TData, TBody>(path, { method: 'POST', body }),
  put: <TData, TBody = unknown>(path: string, body?: TBody) =>
    request<TData, TBody>(path, { method: 'PUT', body }),
  patch: <TData, TBody = unknown>(path: string, body?: TBody) =>
    request<TData, TBody>(path, { method: 'PATCH', body }),
  delete: <TData>(path: string) => request<TData>(path, { method: 'DELETE' }),
}
