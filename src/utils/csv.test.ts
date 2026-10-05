import { describe, expect, it } from 'vitest'
import { buildCsv } from './csv'

describe('buildCsv', () => {
  it('quotes cells and neutralizes spreadsheet formulas', () => {
    expect(buildCsv(['Name', 'Note'], [['=1+1', 'said "hello"']])).toBe(
      '"Name","Note"\r\n"\'=1+1","said ""hello"""',
    )
  })
})
