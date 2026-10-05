# Testing

Run the local validation commands from the repository root:

```sh
npm run lint
npm run typecheck
npm run test
npm run build:storybook
npm run build
```

Vitest runs in jsdom with React Testing Library and a shared MSW server lifecycle. Current coverage exercises debounce timing, table search/selection, table state reset, and core auth/employee/leave validation. Expand tests for route guards, all schemas, approval persistence, and service error handling as those flows evolve.

Storybook is configured for the shared UI components. Keep stories focused on accessible states and existing design tokens; do not test through visual snapshots alone.
