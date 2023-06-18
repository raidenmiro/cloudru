import { useEffect, useRef, useState } from 'react'

import s from './index.module.css'

export interface AvatarProps {
  alt?: string
  fallback?: string
  src?: string
}

enum LoadingStatus {
  Error = 'error',
  Idle = 'Idle',
  Pending = 'pending'
}

export const Avatar = ({ alt, fallback, src = '' }: AvatarProps) => {
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.Idle)
  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    }
    return () => {
      mounted.current = false
    }
  }, [])

  useEffect(() => {
    if (mounted.current) {
      const img = new Image()
      img.src = src

      img.addEventListener('load', () => {
        setStatus(LoadingStatus.Pending)
      })

      img.addEventListener('error', () => {
        setStatus(LoadingStatus.Error)
      })
    }
  }, [src])

  const prefix = fallback?.slice(0, 2).toUpperCase()

  return (
    <span className={s.avatar}>
      {status === LoadingStatus.Error ? (
        <span className={s.is_fallback}>{prefix}</span>
      ) : (
        <img alt={alt} src={src} />
      )}
    </span>
  )
}
Avatar.displayName = 'View.Avatar'
