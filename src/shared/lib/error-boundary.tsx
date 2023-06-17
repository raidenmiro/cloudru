/* eslint-disable @typescript-eslint/no-useless-constructor */

import type { ReactNode } from 'react'
import { Component } from 'react'

export class ErrorBoundary extends Component<{
  children: ReactNode
  fallback: ReactNode
}> {
  static getDerivedStateFromError() {
    return { hasError: true }
  }

  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
  }

  state = { hasError: false }

  componentDidCatch<E extends Error>(error: E, info: unknown) {
    console.error(error, info)
  }

  render() {
    const { hasError } = this.state
    const { children, fallback } = this.props

    if (hasError) {
      return fallback
    }

    return children
  }
}
