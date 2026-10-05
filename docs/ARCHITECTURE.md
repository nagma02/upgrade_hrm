# Architecture

The project is organized around a feature-oriented React structure.

The current foundation separates concerns into:

- `app/` for providers, routing, and layout wiring
- `components/` for reusable UI and page sections
- `features/` for route-level screens and future module boundaries
- `services/` for API access and auth session helpers
- `hooks/` for reusable React behavior
- `types/`, `constants/`, and `utils/` for shared primitives

The app shell is intentionally generic so future HRM modules can plug in without rewriting the foundation.