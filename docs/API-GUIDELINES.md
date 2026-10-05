# API Guidelines

- Use the centralized Axios API client for all network calls.
- Keep request/response shaping in the service layer.
- Represent success and error responses with shared types.
- Map transport errors to friendly UI messages.
- Keep retry and cache behavior in the data layer, not in the view layer.
- The client normalizes typed success and failure envelopes and dispatches an `hrm:unauthorized` event on HTTP 401 so the auth provider clears the demo session.
- Feature data currently uses typed local mock services. Do not add network calls to simulate a backend that is not configured.
- Add request/response contract tests when an API service is connected; do not store production bearer tokens in browser storage.
