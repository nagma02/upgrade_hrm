import { Card } from '@/components/ui/card'
import { PageHeader } from '@/components/common/page-header'

export function ModulePlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="page-stack">
      <PageHeader title={title} description={description} />
      <Card>
        <p>
          This screen is reserved for future implementation. The current foundation only establishes the route and
          folder structure.
        </p>
      </Card>
    </div>
  )
}