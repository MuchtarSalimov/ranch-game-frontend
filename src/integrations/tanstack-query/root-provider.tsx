import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import time from '@/lib/time'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 2*time.HOUR,
      staleTime: time.HOUR,
      retry: false,
      refetchOnWindowFocus: false
    }
  }
})

export function getContext() {
  return {
    queryClient,
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
