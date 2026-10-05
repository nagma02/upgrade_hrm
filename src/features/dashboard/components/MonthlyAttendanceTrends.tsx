import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { monthlyAttendanceTrends } from '../data/dashboardData'

export default function MonthlyAttendanceTrends() {
  return <section className="card dashboard-visual-card" aria-labelledby="monthly-attendance-title">
    <div className="chart-heading"><div><span className="eyebrow">SIX MONTHS</span><h3 className="section-title" id="monthly-attendance-title">Monthly attendance trends</h3><p>Present, absent, and late records</p></div></div>
    <div className="monthly-attendance-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={monthlyAttendanceTrends} margin={{ top: 10, right: 4, left: -20, bottom: 0 }}>
      <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 4" vertical={false}/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }}/><YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }}/><Tooltip contentStyle={{ border: '1px solid #E2E8F0', borderRadius: 10 }} formatter={(value, name) => [Number(value), String(name).replace(/^./, (letter) => letter.toUpperCase())]}/>
      <Bar dataKey="present" stackId="attendance" fill="#10B981" radius={[0, 0, 0, 0]}/><Bar dataKey="absent" stackId="attendance" fill="#F59E0B"/><Bar dataKey="late" stackId="attendance" fill="#94A3B8" radius={[4, 4, 0, 0]}/>
    </BarChart></ResponsiveContainer></div>
    <div className="dashboard-chart-legend"><span><i style={{background:'#10B981'}}/>Present</span><span><i style={{background:'#F59E0B'}}/>Absent</span><span><i style={{background:'#94A3B8'}}/>Late</span></div>
    <small className="dashboard-data-note">Monthly comparison values are illustrative demo trends.</small>
  </section>
}
