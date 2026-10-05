export type ApiSuccessResponse<TData = unknown, TMeta = unknown> = {
  success: true
  message: string
  data: TData
  meta?: TMeta
}

export type ApiErrorResponse = {
  success: false
  message: string
  errors?: unknown
}

export type ApiResponse<TData = unknown, TMeta = unknown> =
  | ApiSuccessResponse<TData, TMeta>
  | ApiErrorResponse

export type ApiErrorShape = {
  status: number
  message: string
  code?: string
  details?: unknown
}