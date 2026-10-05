import React from 'react'
import StatsCard from './StatsCard'
import { Users, CheckCircle, UserPlus, Briefcase, CalendarCheck, XCircle } from 'lucide-react'
import { attendanceSparklines, kpiStats } from '../data/dashboardData'

const iconMap: Record<string, React.ReactNode> = {
  total: <Users size={18} />,
  present: <CheckCircle size={18} />,
  onLeave: <CalendarCheck size={18} />,
  absent: <XCircle size={18} />,
  new: <UserPlus size={18} />,
  open: <Briefcase size={18} />,
}

export default function StatsGrid() {
  return (
    <div className="dashboard-grid">
      {kpiStats.filter((s) => ['total', 'present', 'onLeave', 'absent'].includes(s.key)).map((s) => (
        <StatsCard key={s.key} icon={iconMap[s.key]} label={s.label} value={s.value} change={s.change} sparkline={attendanceSparklines[s.key]} />
      ))}
    </div>
  )
}
