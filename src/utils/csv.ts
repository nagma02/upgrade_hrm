function csvCell(value: unknown) {
  let text = String(value ?? '')
  if (/^[\t\r ]*[=+\-@]/.test(text)) text = `'${text}`
  return `"${text.replaceAll('"', '""')}"`
}

export function buildCsv(headers: string[], rows: Array<Array<unknown>>) {
  return [headers.map(csvCell).join(','), ...rows.map((row) => row.map(csvCell).join(','))].join(
    '\r\n',
  )
}
