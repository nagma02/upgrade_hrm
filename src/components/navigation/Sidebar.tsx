import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Activity, CalendarDays, ChevronLeft, ChevronRight, Clock3, LayoutDashboard, Settings, Users, Wallet, Building2, BadgeCheck } from 'lucide-react'

const links = [
  ['Dashboard','/app/dashboard',LayoutDashboard],['Employees','/app/employees',Users],['Attendance','/app/attendance',Activity],['Leave','/app/leave',CalendarDays],['Shifts','/app/shifts',Clock3],['Departments','/app/departments',Building2],['Designations','/app/designations',BadgeCheck],['Payroll','/app/payroll',Wallet],
] as const
const settingsLink = ['Settings','/app/settings',Settings] as const
export default function Sidebar() {
  const [collapsed,setCollapsed]=useState(false)
  useEffect(()=>{const toggle=()=>setCollapsed(value=>!value);window.addEventListener('hrm:sidebar-toggle',toggle);return()=>window.removeEventListener('hrm:sidebar-toggle',toggle)},[])
  return <div className={`side-nav ${collapsed?'is-collapsed':''}`}>
    <div className="brand"><span className="brand-mark">H</span>{!collapsed&&<span className="brand-copy">HRM<small>Human Resource Management</small></span>}</div>
    <div className="nav-label">WORKSPACE</div>
    <nav aria-label="Main navigation">{links.map(([label,href,Icon])=><NavLink key={href} to={href} end={href==='/app/dashboard'} title={label} className={({isActive})=>`nav-item ${isActive?'active':''}`}><Icon size={18}/>{!collapsed&&<span>{label}</span>}</NavLink>)}</nav>
    <div className="nav-label nav-label-secondary">OTHER</div>
    <nav aria-label="Other navigation"><NavLink to={settingsLink[1]} title={settingsLink[0]} className={({isActive})=>`nav-item ${isActive?'active':''}`}><Settings size={18}/>{!collapsed&&<span>{settingsLink[0]}</span>}</NavLink></nav>
    <div className="sidebar-bottom"><div className="help-card"><span className="help-icon">?</span>{!collapsed&&<div><b>Need a hand?</b><small>Visit our help center</small></div>}</div>{!collapsed&&<div className="sidebar-footnote">© 2026 HRM</div>}<button className="collapse-button" onClick={()=>setCollapsed(!collapsed)} aria-label={collapsed?'Expand sidebar':'Collapse sidebar'} title={collapsed?'Expand sidebar':'Collapse sidebar'}>{collapsed?<ChevronRight size={16}/>:<ChevronLeft size={16}/>}</button></div>
  </div>
}
