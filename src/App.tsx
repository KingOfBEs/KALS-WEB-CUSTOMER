import
{
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Outlet } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ScrollToTop from './utils/scrollToTop'

const queryClient = new QueryClient()

function App ()
{

  return (
    <QueryClientProvider client={ queryClient }>
      <ScrollToTop />
      <Outlet />
      <ReactQueryDevtools initialIsOpen={ false } />
    </QueryClientProvider>
  )
}

export default App
