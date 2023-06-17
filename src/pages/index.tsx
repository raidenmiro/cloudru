import { useRouter } from '@/shared/lib/router/build-routes'

import { StepFormScreen } from './multi-step-form/page'
import { router } from './router'
import { StartupScreen } from './startup-screen/page'

export const Page = () => {
  const route = useRouter(router)

  if (route === 'stepFormsScreen') {
    return <StepFormScreen />
  }

  return <StartupScreen />
}
