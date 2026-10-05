import { useMemo, useState } from 'react'

export function usePagination({ initialPage = 1, pageSize = 10 } = {}) {
  const [page, setPage] = useState(initialPage)

  return useMemo(
    () => ({
      page,
      pageSize,
      nextPage: () => setPage((current) => current + 1),
      previousPage: () => setPage((current) => Math.max(1, current - 1)),
      setPage,
    }),
    [page, pageSize],
  )
}