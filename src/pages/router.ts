import { createRouter } from '@/shared/lib/router/build-routes'

export const paths = {
  startupScreen: () => '/',
  stepFormsScreen: () => '/create'
}

export const router = createRouter(paths)
