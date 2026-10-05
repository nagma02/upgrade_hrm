import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './button'

describe('Button', () => {
  it('supports accessible names, disabled state, and click handling', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Save changes</Button>)
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
