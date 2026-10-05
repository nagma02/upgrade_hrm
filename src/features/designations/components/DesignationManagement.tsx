import { ClipboardList, Download, Eye, Search } from 'lucide-react'
import ModuleDataTable from '@/features/shared/components/ModuleDataTable'
import type { ModuleRow } from '@/features/shared/data/moduleData'

type Props = {
  rows: ModuleRow[]
  total: number
  query: string
  filter: string
  onQueryChange: (value: string) => void
  onFilterChange: (value: string) => void
  onExport: () => void
  onAction: (row: ModuleRow, action: 'approve' | 'reject' | 'delete') => void
  onView: (row: ModuleRow) => void
  onEdit: (row: ModuleRow) => void
  onToggleStatus: (row: ModuleRow) => void
}

export default function DesignationManagement({ rows, total, query, filter, onQueryChange, onFilterChange, onExport, onAction, onView, onEdit, onToggleStatus }: Props) {
  return (
    <section className="panel data-panel designation-management" aria-labelledby="designation-management-title">
      <div className="panel-head">
        <div><span className="designation-section-kicker">ROLE CATALOG</span><h2 id="designation-management-title">Designation management</h2><span>{rows.length} of {total} designations</span></div>
        <div className="table-tools">
          <label className="table-search designation-search"><Search size={15} /><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search titles or departments" aria-label="Search designations" /></label>
          <select aria-label="Filter designations by status" value={filter} onChange={(event) => onFilterChange(event.target.value)}><option>All</option><option>Active</option><option>Inactive</option></select>
          <button className="icon-button" title="Export designations" aria-label="Export designations" onClick={onExport}><Download size={16} /></button>
        </div>
      </div>
      <div className="table-scroll"><ModuleDataTable module="designations" rows={rows} onAction={onAction} onView={onView} onEdit={onEdit} onToggleStatus={onToggleStatus} />
        {!rows.length && <div className="empty-state"><div className="empty-icon"><ClipboardList size={22} /></div><b>No designations found</b><span>Adjust the search or status filter, or create a designation.</span></div>}
      </div>
      <div className="table-footer"><span>Showing {rows.length} of {total} designations</span><span><Eye size={14} /> Open a role to view its details</span></div>
    </section>
  )
}
