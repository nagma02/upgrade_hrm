import { Button } from '@/components/ui/button'

export function Pagination({
  page,
  pageSize,
  onPrevious,
  onNext,
}: {
  page: number
  pageSize: number
  onPrevious: () => void
  onNext: () => void
}) {
  return (
    <div className="pagination">
      <span>Page {page} · {pageSize} per page</span>
      <div className="pagination__actions">
        <Button variant="secondary" onClick={onPrevious}>Previous</Button>
        <Button variant="secondary" onClick={onNext}>Next</Button>
      </div>
    </div>
  )
}