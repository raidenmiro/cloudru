import { act, render } from '@testing-library/react'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

import { Stepper } from '..'

let setter: Dispatch<SetStateAction<number>>

function StepPage() {
  const [page, setPage] = useState(1)

  setter = setPage

  return (
    <Stepper onPageChanged={setPage} page={page}>
      <Stepper.Step description="first">First step</Stepper.Step>
      <Stepper.Step description="second">Second step</Stepper.Step>
    </Stepper>
  )
}

afterEach(() => {
  setter(1)
})

describe('stepper', () => {
  test('should be rendered first step', () => {
    const { getByText } = render(<StepPage />)

    expect(getByText('First step')).toBeDefined()
  })

  test('should be rendered second step', () => {
    const { getByText, queryByText } = render(<StepPage />)

    act(() => {
      setter(2)
    })

    expect(queryByText('First step')).toBeNull()
    expect(getByText('Second step')).toBeDefined()
  })
})
