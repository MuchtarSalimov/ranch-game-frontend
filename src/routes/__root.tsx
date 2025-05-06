import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'sonner';
import Header from '../components/Header'
import TanstackQueryLayout from '../integrations/tanstack-query/layout'
import type { QueryClient } from '@tanstack/react-query'
import UserProvider from '@/hooks/UserProvider';

interface MyRouterContext {
  queryClient: QueryClient,
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    return (
      <>
        <Toaster
          richColors={true}
          expand={true}
          position={'bottom-center'}
          toastOptions={{
            closeButton: true,
            duration: 3000,
            style: {
              fontSize: '1.3rem'
            }
          }
        }/>
          <UserProvider>
            <Header />
            <Outlet/>
          </UserProvider>
        <TanStackRouterDevtools />
        <TanstackQueryLayout />
      </>
    )
  }
})
