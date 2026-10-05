import { DatePicker } from './date-picker'

export function DateRangePicker() {
  return (
    <div className="date-range-picker">
      <DatePicker aria-label="Start date" />
      <DatePicker aria-label="End date" />
    </div>
  )
}