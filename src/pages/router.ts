import { createRouter } from '@/shared/lib/router/build-routes'

export const paths = {
  startupScreen: () => '/',
  stepFormsScreen: () => '/step-forms'
}

export const router = createRouter(paths)
