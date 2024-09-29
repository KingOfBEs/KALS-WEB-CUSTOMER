import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes.tsx';
import theme from './theme';



createRoot( document.getElementById( 'root' )! ).render(
  <StrictMode>
    <ThemeProvider theme={ theme }>
      <CssBaseline />
      <RouterProvider router={ router } />
    </ThemeProvider>
  </StrictMode>,
)
