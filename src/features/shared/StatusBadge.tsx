import React from 'react'

export default function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Active: { bg: 'rgba(42,166,95,0.08)', color: 'var(--color-primary)' },
    Inactive: { bg: 'rgba(107,114,128,0.08)', color: 'var(--color-muted)' },
    'On Leave': { bg: 'rgba(245,158,11,0.08)', color: '#f59e0b' },
    Pending: { bg: 'rgba(124,58,237,0.06)', color: '#7c3aed' },
  }
  const style = map[status] || { bg: 'rgba(17,24,39,0.04)', color: 'var(--color-text)' }
  return <div style={{ padding: '6px 10px', borderRadius: 9999, background: style.bg, color: style.color, fontWeight: 700, fontSize: 13 }}>{status}</div>
}
