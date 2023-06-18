import { act, fireEvent, render } from '@testing-library/react'

import { StepForm } from '@/shared/layouts/stepform'

import { AboutMe } from '..'

describe('About me page', () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')

  afterEach(() => {
    localStorage.clear()
    getItemSpy.mockClear()
    setItemSpy.mockClear()
  })

  test('should be render textarea', () => {
    const { getByRole } = render(
      <StepForm>
        <AboutMe />
      </StepForm>
    )

    const textarea = getByRole('textbox')
    expect(textarea).toBeDefined()
  })

  test('should be rendered with ready data', () => {
    localStorage.setItem(
      'aboutme',
      JSON.stringify({ aboutme: 'I am developer' })
    )

    const { getByRole } = render(
      <StepForm>
        <AboutMe />
      </StepForm>
    )

    const textarea = getByRole('textbox') as HTMLTextAreaElement
    expect(textarea.value).toBe('I am developer')
  })

  test('should show aria-invalid whenever length is too long', () => {
    const { getByRole } = render(
      <StepForm>
        <AboutMe />
      </StepForm>
    )

    const textarea = getByRole('textbox') as HTMLTextAreaElement
    const template = 'I want to join cloud.ru'.repeat(100)

    act(() => {
      fireEvent.input(textarea, {
        target: { value: template }
      })
    })

    expect(textarea.attributes.getNamedItem('aria-invalid')).not.toBeNull()
  })
})
