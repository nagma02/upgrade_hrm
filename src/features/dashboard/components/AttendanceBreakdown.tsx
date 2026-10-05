import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { attendanceBreakdown } from '../data/dashboardData'

export default function AttendanceBreakdown() {
  const total = attendanceBreakdown.reduce((sum, entry) => sum + entry.value, 0)
  return <section className="card dashboard-visual-card" aria-labelledby="attendance-breakdown-title">
    <div className="chart-heading"><div><span className="eyebrow">TODAY</span><h3 className="section-title" id="attendance-breakdown-title">Attendance breakdown</h3><p>Team status across today’s shift</p></div></div>
    <div className="attendance-donut-layout"><div className="attendance-donut">
      <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={attendanceBreakdown} dataKey="value" nameKey="name" innerRadius="65%" outerRadius="88%" paddingAngle={3} stroke="none">{attendanceBreakdown.map((item) => <Cell key={item.name} fill={item.color}/>)}</Pie><Tooltip formatter={(value, name) => [`${Number(value)} employees`, name]} contentStyle={{ border: '1px solid #E2E8F0', borderRadius: 10, boxShadow: '0 8px 22px rgb(15 23 42 / 10%)' }}/></PieChart></ResponsiveContainer>
      <div className="attendance-donut-center"><strong>{total}</strong><span>employees</span></div>
    </div><div className="attendance-donut-legend">{attendanceBreakdown.map((item) => <div key={item.name}><i style={{ backgroundColor: item.color }}/><span>{item.name}</span><strong>{item.value}</strong></div>)}</div></div>
    <small className="dashboard-data-note">Remote attendance is not recorded in the current demo data.</small>
  </section>
}
