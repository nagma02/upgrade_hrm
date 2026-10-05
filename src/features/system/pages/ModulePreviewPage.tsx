import { PageHeader } from '@/components/common/page-header'
import { Card } from '@/components/ui/card'

export function ModulePreviewPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="page-stack">
      <PageHeader title={title} description={description} />
      <Card>
        <p>
          This route is reserved for future module work. The foundation only establishes the architecture and shell.
        </p>
      </Card>
    </div>
  )
}