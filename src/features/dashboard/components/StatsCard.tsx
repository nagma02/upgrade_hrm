import React from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'

type Props = {
  icon: React.ReactNode
  label: string
  value: number | string
  hint?: string
  change?: number
  sparkline?: number[]
}

export default function StatsCard({ icon, label, value, hint, change, sparkline }: Props) {
  const positive = typeof change === 'number' && change >= 0
  const min = Math.min(...(sparkline ?? [0]))
  const max = Math.max(...(sparkline ?? [1]))
  const points = (sparkline ?? []).map((point, index) => `${(index / Math.max(1, (sparkline?.length ?? 1) - 1)) * 70},${25 - ((point - min) / Math.max(1, max - min)) * 20}`).join(' ')
  return (
    <div className="card stat-card" style={{ padding: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div>
          <div style={{ fontSize: 13, color: 'var(--color-muted)' }}>{label}</div>
          <div style={{ fontSize: 21, fontWeight: 700, marginTop: 6 }}>{value}</div>
          {hint ? <div style={{ fontSize: 13, color: 'var(--color-muted)', marginTop: 6 }}>{hint}</div> : null}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: 8 }}>
          {points && <svg className="stat-sparkline" viewBox="0 0 70 28" role="img" aria-label={`${label} recent trend`}><polyline points={points} fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          <div style={{ width: 44, height: 44, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'rgba(42,166,95,0.08)' }}>
            {icon}
          </div>
          {typeof change === 'number' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: positive ? 'var(--color-success)' : 'var(--color-danger)', fontSize: 13 }}>
              {positive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
              <span>{Math.abs(change)}%</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
