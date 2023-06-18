import './application.css'

import { Page } from '@/pages'
import { ErrorBoundary } from '@/shared/lib/error-boundary'

const MESSAGE = 'Произошла ошибка, перезагрузите страницу'

export function App() {
  return (
    <ErrorBoundary fallback={<div>{MESSAGE}</div>}>
      <Page />
    </ErrorBoundary>
  )
}
