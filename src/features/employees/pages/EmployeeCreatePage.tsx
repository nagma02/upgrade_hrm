import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import PageContainer from '@/features/shared/PageContainer'
import PageHeader from '@/features/shared/PageHeader'
import { employees } from '../data/employeesData'
import { navigateTo } from '@/app/router/navigation'
import { useLocation } from '@/hooks/use-location'
import { employeeSchema, type EmployeeFormValues } from '@/schemas/employee.schema'
import { sanitizeText } from '@/utils/sanitize-text'

const steps: Array<{ title: string; fields: Array<keyof EmployeeFormValues> }> = [
  { title: 'Personal information', fields: ['firstName', 'lastName', 'email', 'phone'] },
  { title: 'Employment information', fields: ['id', 'dept', 'title', 'joinDate', 'location'] },
]

function loadEmployees(): EmployeeFormValues[] {
  try {
    return (
      JSON.parse(localStorage.getItem('hrm-employees') || 'null') ||
      (employees as unknown as EmployeeFormValues[])
    )
  } catch {
    return employees as unknown as EmployeeFormValues[]
  }
}

export default function EmployeeCreatePage() {
  const path = useLocation()
  const editId = path.split('/')[3]
  const editing = path.endsWith('/edit')
  const existing = loadEmployees().find((employee) => employee.id === editId)
  const [step, setStep] = useState(0)
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: editing && existing ? existing : undefined,
    mode: 'onTouched',
  })

  const onSubmit = handleSubmit((values) => {
    const list = loadEmployees()
    if (!editing && list.some((employee) => employee.id === values.id)) {
      toast.error('That employee ID is already in use')
      return
    }
    const safeValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [
        key,
        key === 'email' ? value.trim().toLowerCase() : sanitizeText(value),
      ]),
    ) as EmployeeFormValues
    const next = editing
      ? list.map((employee) => (employee.id === editId ? { ...employee, ...safeValues } : employee))
      : [{ ...safeValues, status: 'Active' }, ...list]
    localStorage.setItem('hrm-employees', JSON.stringify(next))
    toast.success(editing ? 'Employee updated successfully' : 'Employee created successfully')
    navigateTo(editing ? `/app/employees/${editId}` : '/app/employees')
  })

  const field = (
    name: keyof EmployeeFormValues,
    label: string,
    placeholder: string,
    type = 'text',
  ) => (
    <label className="employee-field" key={name}>
      {label}
      <input
        {...register(name)}
        placeholder={placeholder}
        type={type}
        aria-invalid={Boolean(errors[name])}
      />
      {errors[name] && <small role="alert">{errors[name]?.message}</small>}
    </label>
  )

  const advance = async () => {
    const valid = await trigger(steps[step].fields)
    if (valid) setStep((current) => Math.min(current + 1, steps.length - 1))
  }

  return (
    <PageContainer>
      <PageHeader
        title={editing ? 'Edit Employee' : 'Add Employee'}
        subtitle={editing ? 'Update employee information' : 'Add a teammate to your organization'}
      />
      <form onSubmit={onSubmit} className="employee-form" noValidate>
        <div className="employee-form-stepper" aria-label={`Step ${step + 1} of ${steps.length}`}>
          <span>
            Step {step + 1} of {steps.length}
          </span>
          <strong>{steps[step].title}</strong>
          <div>
            <i style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>
        </div>
        {step === 0 ? (
          <section className="card">
            <h3 className="section-title">Personal information</h3>
            <p className="form-hint">Basic contact details for this employee.</p>
            <div className="employee-form-grid">
              {field('firstName', 'First name', 'e.g. Alex')}
              {field('lastName', 'Last name', 'e.g. Morgan')}
              {field('email', 'Work email', 'alex@company.com', 'email')}
              {field('phone', 'Phone number', '+1 555 0100', 'tel')}
            </div>
          </section>
        ) : (
          <section className="card">
            <h3 className="section-title">Employment information</h3>
            <p className="form-hint">Role, team, and start date.</p>
            <div className="employee-form-grid">
              {field('id', 'Employee ID', 'e.g. E-1008')}
              {field('dept', 'Department', 'e.g. Engineering')}
              {field('title', 'Designation', 'e.g. Product designer')}
              {field('joinDate', 'Joining date', '', 'date')}
              {field('location', 'Work location', 'e.g. New York')}
            </div>
          </section>
        )}
        <div className="form-actions">
          <button
            type="button"
            className="button"
            disabled={isSubmitting}
            onClick={() => (step ? setStep(0) : navigateTo('/app/employees'))}
          >
            {step ? 'Back' : 'Cancel'}
          </button>
          {step < steps.length - 1 ? (
            <button type="button" className="button primary" onClick={() => void advance()}>
              Continue
            </button>
          ) : (
            <button className="button primary" disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Saving…' : editing ? 'Save changes' : 'Save employee'}
            </button>
          )}
        </div>
      </form>
    </PageContainer>
  )
}
