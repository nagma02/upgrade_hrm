import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ChartTooltip from './ChartTooltip'
import { employeeGrowth } from '../data/dashboardData'

export default function EmployeeGrowth() {
  const latestHeadcount = employeeGrowth.at(-1)?.employees ?? 0
  return (
    <section className="card growth-card">
      <div className="chart-heading">
        <div>
          <span className="eyebrow">WORKFORCE</span>
          <h3 className="section-title">Employee growth</h3>
          <p>Headcount over the last six months</p>
        </div>
        <span className="growth-total">{latestHeadcount} <small>employees</small></span>
      </div>
      <div className="growth-chart" role="group" aria-label={`Employee headcount increased from ${employeeGrowth[0]?.employees ?? 0} in ${employeeGrowth[0]?.month ?? 'the first month'} to ${latestHeadcount} in ${employeeGrowth.at(-1)?.month ?? 'the latest month'}`}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={employeeGrowth} margin={{ top: 10, right: 8, left: -14, bottom: 0 }}>
            <defs><linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0b7168" stopOpacity={0.2}/><stop offset="72%" stopColor="#0b7168" stopOpacity={0.055}/><stop offset="100%" stopColor="#0b7168" stopOpacity={0.005}/></linearGradient></defs>
            <CartesianGrid stroke="#e9efeb" strokeDasharray="4 5" vertical={false}/>
            <XAxis dataKey="month" tickFormatter={(month: string) => month.slice(0, 3)} axisLine={false} tickLine={false} tick={{ fill: '#68756c', fontSize: 12 }} dy={8}/>
            <YAxis domain={[210, 255]} ticks={[210, 220, 230, 240, 250]} tickFormatter={(value: number) => value.toLocaleString()} axisLine={false} tickLine={false} tick={{ fill: '#68756c', fontSize: 12 }}/>
            <Tooltip content={ChartTooltip} cursor={{ stroke: '#d8e4dc', strokeDasharray: '4 4' }} animationDuration={180}/>
            <Area type="monotone" dataKey="employees" name="Employees" stroke="#0b7168" strokeWidth={2.5} fill="url(#growthFill)" dot={{ r: 3.5, fill: '#0b7168', stroke: '#fff', strokeWidth: 1.5 }} activeDot={{ r: 5.5, fill: '#0b7168', stroke: '#fff', strokeWidth: 2 }}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
