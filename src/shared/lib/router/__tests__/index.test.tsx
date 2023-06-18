import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { createRouter, useRouter } from '../build-routes'

let router: ReturnType<typeof createRouter>

beforeEach(() => {
  router = createRouter({
    about: () => '/about',
    home: () => '/',
    products: () => '/products'
  })
})

const EntryPoint = () => {
  const route = useRouter(router)

  switch (route) {
    case 'about':
      return <button onClick={() => router.go('/products')}>about page</button>
    case 'products':
      return <button onClick={() => router.go('/')}>products page</button>
    default:
      return <button onClick={() => router.go('/about')}>home page</button>
  }
}

test('should be render home page', () => {
  const { getByText } = render(<EntryPoint />)

  const page = getByText('home page')
  expect(page).toBeDefined()
})

test('should be render about page', () => {
  const { getByText } = render(<EntryPoint />)

  act(() => {
    router.go('/about')
  })

  const page = getByText('about page')
  expect(page).toBeDefined()
})

test('should be navigate to products page', () => {
  const { getByText } = render(<EntryPoint />)

  act(() => {
    router.go('/about')
  })

  const button = getByText('about page')
  fireEvent.click(button)

  const page = getByText('products page')
  expect(page).toBeDefined()
})
