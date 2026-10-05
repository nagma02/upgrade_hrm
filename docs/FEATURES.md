# Feature Status

The application is a frontend HRM prototype. Several modules use local storage and typed mock data; this is not a production HRIS or a connected payroll backend.

## Implemented flows

- Authentication demo with email validation, remember-me session persistence, expiry, and route protection.
- Dashboard overview, employee directory/create/edit/details, CSV export, attendance list/calendar/clock widget/correction requests, leave application and approvals, shifts, department and designation management, and payroll review.
- Reusable role checks, status-aware forms, toast notifications, empty states, and responsive workspace shell.
- Designation level overview, employee distribution, department-by-designation matrix, payroll payslip preview/print, and demo settings for permissions and audit feed.

## Prototype limitations

- Authentication and authorization are client-side demo behavior. A production service must enforce permissions server-side and issue secure sessions.
- Most records are seeded mock data persisted to browser storage. Some analytics and leave balances are illustrative and marked in the UI.
- Clock events and correction requests are browser-local. No time clock, approval, audit, or payroll service is connected.
- Payroll bulk processing and printing provide a frontend workflow only; calculations, statutory deductions, and payments require a validated backend.
- Employee profile is currently a route-based page, not a drawer. Designation hierarchy is a selectable level list, not an organizational graph editor.
