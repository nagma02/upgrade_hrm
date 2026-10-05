import { useEffect, useState } from 'react'
import { Clock3 } from 'lucide-react'
import { useAuth } from '@/app/providers/use-auth'
import { toast } from 'sonner'

function readClockIn(storageKey: string) {
  const timestamp = Number(localStorage.getItem(storageKey))
  return Number.isFinite(timestamp) && timestamp > 0 ? timestamp : null
}

function durationLabel(seconds: number) {
  const hours = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, '0')
  const minutes = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, '0')
  const remaining = (seconds % 60).toString().padStart(2, '0')
  return `${hours}:${minutes}:${remaining}`
}

export default function AttendanceClockWidget() {
  const { user } = useAuth()
  const storageKey = `hrm-attendance-clock-in:${user?.email ?? 'demo'}`
  const [clockIn, setClockIn] = useState<number | null>(() => readClockIn(storageKey))
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!clockIn) return
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [clockIn])

  const toggleClock = () => {
    if (clockIn) {
      localStorage.setItem(
        `hrm-attendance-last-shift-seconds:${user?.email ?? 'demo'}`,
        String(Math.max(0, Math.floor((Date.now() - clockIn) / 1000))),
      )
      localStorage.removeItem(storageKey)
      setClockIn(null)
      toast.success('You are clocked out. Your demo shift duration was saved.')
      return
    }
    const started = Date.now()
    localStorage.setItem(storageKey, String(started))
    setClockIn(started)
    setNow(started)
    toast.success('You are clocked in.')
  }

  return (
    <section className="card attendance-clock-widget" aria-label="Clock in and out">
      <div className="attendance-clock-icon">
        <Clock3 size={19} />
      </div>
      <div className="attendance-clock-copy">
        <span>TIME TRACKING</span>
        <strong>
          {clockIn ? durationLabel(Math.floor((now - clockIn) / 1000)) : 'Not clocked in'}
        </strong>
        <small>
          {clockIn
            ? `Since ${new Date(clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
            : `Ready for ${user?.name ?? 'your shift'}`}
        </small>
      </div>
      <button
        className={clockIn ? 'button attendance-clock-out' : 'button primary'}
        onClick={toggleClock}
      >
        {clockIn ? 'Clock out' : 'Clock in'}
      </button>
    </section>
  )
}
