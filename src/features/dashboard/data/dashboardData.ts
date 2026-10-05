const attendanceToday = { present: 198, onLeave: 12, absent: 38 }

export const kpiStats = [
  { key: 'total', label: 'Total Employees', value: 248, change: 2.4 },
  { key: 'present', label: 'Present Today', value: attendanceToday.present, change: -1.2 },
  { key: 'onLeave', label: 'On Leave', value: attendanceToday.onLeave, change: 0 },
  { key: 'absent', label: 'Absent Today', value: attendanceToday.absent, change: 0.5 },
  { key: 'new', label: 'New Employees This Month', value: 6, change: 50 },
  { key: 'open', label: 'Open Positions', value: 4, change: -20 },
]

export const attendanceSparklines: Record<string, number[]> = {
  total: [224, 229, 233, 239, 243, 248],
  present: [186, 190, 194, 192, 201, 198],
  onLeave: [9, 11, 10, 13, 11, 12],
  absent: [31, 29, 34, 32, 36, 38],
}

export const attendanceWeekly = [
  { day: 'Monday', present: 180, absent: 12, late: 5 },
  { day: 'Tuesday', present: 185, absent: 15, late: 8 },
  { day: 'Wednesday', present: 190, absent: 10, late: 6 },
  { day: 'Thursday', present: 188, absent: 14, late: 7 },
  { day: 'Friday', present: 195, absent: 12, late: 4 },
  { day: 'Saturday', present: 120, absent: 8, late: 3 },
  { day: 'Sunday', present: 60, absent: 5, late: 1 },
]

export const attendanceSummary = [
  { key: 'present', label: 'Present Today', value: attendanceToday.present },
  { key: 'absent', label: 'Absent Today', value: attendanceToday.absent },
  { key: 'on-leave', label: 'On Leave', value: attendanceToday.onLeave },
  { key: 'late', label: 'Late', value: 5 },
]

export const attendanceBreakdown = [
  { name: 'Present', value: attendanceToday.present, color: '#10B981' },
  { name: 'On Leave', value: attendanceToday.onLeave, color: '#34D399' },
  { name: 'Late', value: attendanceSummary.find((item) => item.key === 'late')?.value ?? 0, color: '#6EE7B7' },
  { name: 'Remote', value: 0, color: '#A7F3D0' },
]

export const monthlyAttendanceTrends = [
  { month: 'May', present: 178, absent: 18, late: 9 },
  { month: 'Jun', present: 184, absent: 17, late: 8 },
  { month: 'Jul', present: 188, absent: 16, late: 7 },
  { month: 'Aug', present: 192, absent: 15, late: 7 },
  { month: 'Sep', present: 195, absent: 14, late: 6 },
  { month: 'Oct', present: attendanceToday.present, absent: attendanceToday.absent, late: 5 },
]

export const departmentGoalProgress = { percent: 78, label: 'Department goals', period: 'October 2026 · demo target' }

export const departmentDistribution = [
  { name: 'Engineering', count: 82 },
  { name: 'Sales', count: 46 },
  { name: 'HR', count: 24 },
  { name: 'Design', count: 31 },
  { name: 'Marketing', count: 28 },
  { name: 'Operations', count: 37 },
]

export const departmentTotal = departmentDistribution.reduce((total, department) => total + department.count, 0)

export const leaveOverview = { approved: 24, pending: 8, rejected: 3 }

export const employeeGrowth = [
  { month: 'May', employees: 210 },
  { month: 'June', employees: 218 },
  { month: 'July', employees: 226 },
  { month: 'August', employees: 235 },
  { month: 'September', employees: 242 },
  { month: 'October', employees: 248 },
]

export const recentEmployees = [
  { id: 'E-1001', name: 'Jane Cooper', dept: 'Engineering', title: 'Software Engineer', joinDate: '2026-10-01', status: 'Active' },
  { id: 'E-1002', name: 'John Doe', dept: 'Design', title: 'Product Designer', joinDate: '2026-09-29', status: 'Active' },
  { id: 'E-1003', name: 'Aisha Khan', dept: 'HR', title: 'HR Manager', joinDate: '2026-09-28', status: 'Active' },
  { id: 'E-1004', name: 'Rahul Sharma', dept: 'Engineering', title: 'Frontend Developer', joinDate: '2026-09-25', status: 'Active' },
  { id: 'E-1005', name: 'Priya Verma', dept: 'HR', title: 'HR Executive', joinDate: '2026-09-22', status: 'Active' },
]

export type UpcomingEvent = { date: string; dateLabel?: string; time?: string; type: string; person: string; category: 'Meeting' | 'People' | 'Performance' }

export const upcomingEvents: UpcomingEvent[] = [
  { date: '2026-10-05', dateLabel: 'Today', time: '3:00 PM', type: 'Team Meeting', person: 'HR & department leads', category: 'Meeting' },
  { date: '2026-10-06', dateLabel: 'Tomorrow', time: '10:00 AM', type: 'Employee Onboarding', person: 'New hire orientation', category: 'People' },
  { date: '2026-10-08', type: 'Performance Review', person: 'Quarterly check-ins', category: 'Performance' },
]

export type HRInsight = {
  key: string
  label: string
  value: number
  icon: 'employees' | 'leave' | 'positions' | 'attendance' | 'birthday'
  tone: 'green' | 'amber' | 'blue' | 'red'
}

export const hrInsights: HRInsight[] = [
  { key: 'new-employees', label: 'New Employees This Month', value: kpiStats.find((stat) => stat.key === 'new')?.value ?? 0, icon: 'employees', tone: 'green' },
  { key: 'pending-leave', label: 'Pending Leave Requests', value: leaveOverview.pending, icon: 'leave', tone: 'amber' },
  { key: 'open-positions', label: 'Open Positions', value: kpiStats.find((stat) => stat.key === 'open')?.value ?? 0, icon: 'positions', tone: 'blue' },
  { key: 'on-leave', label: 'Employees Currently On Leave', value: attendanceToday.onLeave, icon: 'leave', tone: 'blue' },
  { key: 'attendance-issues', label: 'Attendance Issues', value: 3, icon: 'attendance', tone: 'red' },
  { key: 'upcoming-birthdays', label: 'Upcoming Birthdays This Week', value: 5, icon: 'birthday', tone: 'green' },
]

export const recentActivity = [
  { time: '10:30 AM', text: 'Jane Cooper joined Engineering' },
  { time: '09:45 AM', text: 'Leave request approved for John Doe' },
  { time: '09:15 AM', text: 'Attendance correction submitted for Aisha Khan' },
  { time: '08:50 AM', text: 'Shift updated for Michael Smith' },
]
