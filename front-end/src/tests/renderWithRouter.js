import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import green from '../styles/themes/green';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();

  return (
    {
      ...render(
        <Router location={ history.location } navigator={ history }>
          <ThemeProvider theme={ green }>
            { component }
          </ThemeProvider>
        </Router>,
      ),
      history,
    }
  );
};

export default renderWithRouter;
