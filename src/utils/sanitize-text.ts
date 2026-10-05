import DOMPurify from 'dompurify'

/** Strip HTML from user-entered plain text before it is persisted or reused. */
export function sanitizeText(value: string) {
  return DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim()
}
