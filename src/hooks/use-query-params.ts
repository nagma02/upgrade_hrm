export function useQueryParams() {
  const params = new URLSearchParams(window.location.search)

  return {
    get: (key: string) => params.get(key),
    has: (key: string) => params.has(key),
  }
}