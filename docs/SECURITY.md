# Security

- Never trust client input.
- Client validation is not a security boundary.
- Never expose secrets.
- Never log passwords.
- Never log tokens.
- Never log authorization headers.
- Never render unsanitized HTML.
- Avoid `dangerouslySetInnerHTML`.
- Use sanitization if HTML rendering is ever required.
- Validate file type, file size, and URLs before use.
- Sanitize filenames where required.

The current frontend stores a demo session and prototype module records in browser storage for local navigation and mock workflows. These are not production credentials or a secure session mechanism. Production authentication must use a server-issued secure cookie and server-side authorization. The Axios interceptor reads an optional access token only for future API integration; the current demo session has no bearer token.
