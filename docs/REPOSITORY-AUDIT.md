# Repository Architecture Audit

**Audit date:** 2026-10-05  
**Baseline:** The checklist supplied in the audit request. No separate Enterprise HRM specification document was present in this checkout.  
**Scope:** Root config and docs, `src/`, Storybook, routes, shared services/hooks/schemas, module workflows, tests, and CI.

## Implemented and repaired

- All 11 required architecture/design/security/testing documents exist. Root `AGENTS.md` and `.cursorrules` now provide repository constraints.
- Semantic Tailwind aliases were added for the requested slate/white/mint/forest palette without changing the existing CSS theme.
- Storybook has a React/Vite setup, global preview styling, stories for all 32 UI components, pagination, and the generic data table.
- The generic data table now uses the installed TanStack React Table v9 APIs for column/global filtering, pagination, and selection. It includes a CSV export with formula-injection escaping and a loading skeleton.
- Required hooks now include `useTableState`; `useToast` delegates to Sonner. `<Can permission="…">` complements permission and protected-route guards.
- The Axios API client normalizes success/error responses, attaches an optional access token, and emits a 401 event. The auth provider clears the session on unauthorized responses and at expiry.
- Zod schemas now cover auth, employee, leave, attendance, designation, and payroll. Plain-text form values are sanitized before persistence where the prototype accepts free-form text.
- Vitest, React Testing Library, and MSW lifecycle setup are configured. Tests cover debounce, table state, data table search/selection, and auth/employee/leave schema behavior.
- Payroll now exposes a demo bulk-process action and printable payslip preview. Settings includes a client-only role-permission matrix and explicitly labeled sample audit feed.
- Attendance has a persisted demo clock timer, date calendar, correction request flow, and record details. Employee add/edit is a two-step validated form. Shifts and departments support editing from their tables.
- Demo route permission lists cover the app’s current HR modules. The stale second router was reduced to a compatibility re-export of the live route tree.

## Remaining prototype gaps / risks

- **Backend/security:** Permissions are enforced in the browser only. Production access checks, login, audit records, time tracking, payroll runs, and leave/attendance writes need server enforcement and durable API services. Browser storage is not a secure session store.
- **Tables:** TanStack features are implemented in the reusable `DataTable`, but the feature pages mostly retain their established module-specific table markup and do not all consume the generic component yet.
- **Employee UI:** The profile is a route-based details page, not a drawer.
- **Attendance/shifts:** Clock events and corrections are local mock records. The schedule is a shift-hours visualization, not a staffed weekly roster.
- **Leave:** Balance amounts are illustrative demo values. The request form is a route/page rather than a modal.
- **Designations:** The hierarchy is a selectable level list rather than a true tree/flow chart; the department matrix is driven by currently defined mock roles.
- **Payroll/settings:** Bulk processing only changes local demo status; payslip printing is not a verified payroll statement. The role matrix is component-state only, and the audit log entries are static sample data, not a compliance log.
- **Validation coverage:** The test suite is an initial focused baseline. It does not yet cover every hook/schema, route authorization, service behavior, and responsive view.
- **ESLint compatibility:** The installed `@typescript-eslint` parser does not support the repository’s TypeScript 7.0 compiler. ESLint currently runs on JavaScript files; Oxlint and `tsc` cover the TypeScript source until compatible ESLint tooling is available.
- **Git hooks:** Husky and lint-staged are configured, but this workspace has no `.git` directory, so the local pre-commit hook cannot be activated here. It will be set up by the `prepare` script in a Git checkout.

## Verification

The post-change run passed `npm run lint`, `npm run typecheck`, `npm run test` (6 files, 9 tests), and `npm run build`. Storybook configuration and stories are present, but `npm run build:storybook` did not complete: Storybook tried to create `/home/navgurukul/.storybook/settings.json` outside this workspace and failed. The project-wide Prettier check also reports pre-existing formatting differences across 158 files, including untouched files; changed files were formatted individually where applicable. Production builds retain a large-main-chunk warning (656.82 kB minified).
