import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { DashboardIndex } from './components/DashboardIndex';
import { DashboardLayout } from './components/DashboardLayout';
import { Error404 } from './components/Error404';
import { Notarize } from './components/Notarize';
import { Reports } from './components/Reports';
import { Stakeholders } from './components/Stakeholders';
import { Verify } from './components/Verify';

const sbTheme = createTheme({
  palette: {
    mode: 'light',
    light: {
      main: '#fff',
      contrastText: '#1c1c1c',
    },
    dark: {
      main: '#202020',
      dark: '#000',
      contrastText: '#fff',
    },
    green: {
      main: '#59bb9a',
      contrastText: '#000',
    },
    darkGreen: {
      main: '#317962',
      contrastText: '#fff',
    },
    darkGreenShade: {
      main: '#3A9275',
      contrastText: '#fff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={sbTheme}>
      <CssBaseline />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<DashboardIndex />} />
            <Route path="notarize" element={<Notarize />} />
            <Route path="verify" element={<Verify />} />
            <Route path="stakeholders" element={<Stakeholders />} />
            <Route path="reports" element={<Reports />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
