import React from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import * as pages from '../pages';
import GlobalRoute from './GlobalRoute';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function Routes() {
  return (
    <RouterRoutes>
      {/* Public Routes */}
      <Route exact path="/login" element={ <PublicRoute /> }>
        <Route exact path="/login" element={ <pages.Login /> } />
      </Route>
      <Route exact path="/register" element={ <PublicRoute /> }>
        <Route exact path="/register" element={ <pages.Register /> } />
      </Route>

      {/* Private Routes */}
      <Route exact path="/user/tasks" element={ <PrivateRoute /> }>
        <Route exact path="/user/tasks" element={ <pages.Tasks /> } />
      </Route>
      <Route path="*" element={ <GlobalRoute /> } />
    </RouterRoutes>
  );
}

export default Routes;
