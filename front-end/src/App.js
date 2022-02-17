import React from 'react';
import { ThemeProvider } from 'styled-components';
import AuthProvider from './contexts/AuthContext';
import TasksProvider from './contexts/TasksContext';

import Routes from './routes';
import GlobalStyle from './styles/global';
import green from './styles/themes/green';

function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <ThemeProvider theme={ green }>
          <GlobalStyle />
          <Routes />
        </ThemeProvider>
      </TasksProvider>
    </AuthProvider>
  );
}

export default App;
