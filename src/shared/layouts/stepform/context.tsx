import type { ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'

interface StepFormContextProps {
  choiceStep(page: number): void
  nextPage(): void
  page: number
  prevPage(): void
}

export const StepFormContext = createContext<StepFormContextProps | null>(null)

export const useLayoutProps = () => {
  const context = useContext(StepFormContext)

  if (!context) {
    throw new Error('useLayoutProps must be used within a StepFormProvider')
  }

  return context
}

const MAX_PAGE_STEP = 3
const MIN_PAGE_STEP = 1

export const StepFormProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState(1)

  const nextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, MAX_PAGE_STEP))
  }, [])

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, MIN_PAGE_STEP))
  }, [])

  const choiceStep = useCallback((page: number) => {
    setPage(Math.min(MAX_PAGE_STEP, Math.max(MIN_PAGE_STEP, page)))
  }, [])

  const state = useMemo(() => {
    return {
      page,
      nextPage,
      prevPage,
      choiceStep
    }
  }, [choiceStep, nextPage, page, prevPage])

  return (
    <StepFormContext.Provider value={state}>
      {children}
    </StepFormContext.Provider>
  )
}
