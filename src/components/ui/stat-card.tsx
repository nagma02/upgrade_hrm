import { Card } from './card'

export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <div className="stat-card">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </Card>
  )
}