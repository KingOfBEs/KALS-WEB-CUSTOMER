import
{
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Outlet } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ScrollToTop from './utils/scrollToTop'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './contexts/useAuth'

const queryClient = new QueryClient()

function App ()
{

  return (
    <UserProvider>
      <QueryClientProvider client={ queryClient }>
        <ToastContainer />
        <ScrollToTop />
        <Outlet />
        <ReactQueryDevtools initialIsOpen={ false } />
      </QueryClientProvider>
    </UserProvider>
  )
}

export default App
