import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './application/application'

const attachNode = document.querySelector('#root')

if (attachNode) {
  ReactDOM.createRoot(attachNode).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
