import { render } from '@testing-library/react'

import { Started } from '../page'

test('should be render fields without errors messages', () => {
  render(<Started />)
})
