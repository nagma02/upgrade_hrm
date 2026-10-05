# State Management

The current foundation separates state into:

- Local component state for UI-only behavior
- Auth/session state in a provider and browser storage
- API access through a dedicated service layer

Future data fetching can be layered in without changing the shell by keeping server state isolated from presentation state.