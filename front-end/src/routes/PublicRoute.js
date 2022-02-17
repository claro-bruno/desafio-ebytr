import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PublicRoute() {
  const { currentUser } = useAuth();

  const routes = {
    // administrator: '/admin/manage',
    user: '/user/tasks',
  };

  return (!currentUser
    ? <Outlet />
    : <Navigate to={ `${routes[currentUser.role] || routes.user}` } />
  );
}
