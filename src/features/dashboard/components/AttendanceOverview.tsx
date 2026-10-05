import { useState } from 'react'
import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import ChartTooltip from './ChartTooltip'
import { attendanceSummary, attendanceWeekly } from '../data/dashboardData'

export default function AttendanceOverview() {
  const [chartWidth, setChartWidth] = useState(0)
  return (
    <section className="card attendance-chart-card">
      <div className="chart-heading">
        <div>
          <span className="eyebrow">ATTENDANCE</span>
          <h3 className="section-title">Weekly attendance</h3>
          <p>Present, absent, and late check-ins this week</p>
        </div>
        <span className="chart-period">Oct 5 – Oct 11, 2026</span>
      </div>
      <div className="attendance-summary" aria-label="Today's attendance summary">
        {attendanceSummary.map((item) => <div className={`attendance-summary-item attendance-summary-item--${item.key}`} key={item.key}><span>{item.label}</span><strong>{item.value}</strong></div>)}
      </div>
      <div className="attendance-chart" role="group" aria-label="Weekly attendance chart showing present, absent, and late employees from Monday to Sunday">
        <ResponsiveContainer width="100%" height="100%" onResize={(width) => setChartWidth(width)}>
          <ComposedChart data={attendanceWeekly} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
            <CartesianGrid stroke="#e9efeb" strokeDasharray="4 5" vertical={false} />
            <XAxis dataKey="day" tickFormatter={(day: string) => chartWidth < 520 ? day.slice(0, 3) : day} interval={chartWidth < 520 ? 'preserveStartEnd' : 0} axisLine={false} tickLine={false} tick={{ fill: '#7f8b83', fontSize: chartWidth < 520 ? 9 : 10 }} dy={9} />
            <YAxis yAxisId="employees" domain={[0, 220]} ticks={[0, 55, 110, 165, 220]} axisLine={false} tickLine={false} tick={{ fill: '#68756c', fontSize: 12 }} />
            <YAxis yAxisId="events" orientation="right" domain={[0, 25]} hide />
            <Tooltip content={ChartTooltip} cursor={{ stroke: '#d8e4dc', strokeDasharray: '4 4' }} animationDuration={180} />
            <Legend verticalAlign="top" align="right" height={32} iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 12, color: '#6e7a72', paddingBottom: 5 }} />
            <Line yAxisId="employees" type="monotone" dataKey="present" name="Present" stroke="#0b7168" strokeWidth={2.7} dot={{ r: 3.5, fill: '#0b7168', stroke: '#fff', strokeWidth: 1.5 }} activeDot={{ r: 5.5, fill: '#0b7168', stroke: '#fff', strokeWidth: 2 }} />
            <Line yAxisId="events" type="monotone" dataKey="absent" name="Absent" stroke="#d89b43" strokeWidth={2.2} dot={{ r: 3.5, fill: '#d89b43', stroke: '#fff', strokeWidth: 1.5 }} activeDot={{ r: 5.5, fill: '#d89b43', stroke: '#fff', strokeWidth: 2 }} />
            <Line yAxisId="events" type="monotone" dataKey="late" name="Late" stroke="#8292ad" strokeWidth={2.2} dot={{ r: 3.5, fill: '#8292ad', stroke: '#fff', strokeWidth: 1.5 }} activeDot={{ r: 5.5, fill: '#8292ad', stroke: '#fff', strokeWidth: 2 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
