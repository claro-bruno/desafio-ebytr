import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import routesAndRoles from '../utils/routesAndRoles';

export default function GlobalRoute() {
  const { currentUser } = useAuth();
  if (currentUser) {
    const loggedRedirect = routesAndRoles[currentUser.role][0];
    return <Navigate to={ loggedRedirect } />;
  }

  return <Navigate to="/login" />;
}
