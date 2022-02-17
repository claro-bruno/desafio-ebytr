import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

export const AuthContextMock = createContext();
export const useAuthMock = () => useContext(AuthContextMock);

export const currentUser = {
  name: 'Beatriz Albuquerque',
  role: 'user',
};

export const login = jest.fn().mockImplementation(() => {});
export const register = jest.fn().mockImplementation(() => {});

const contextValueMock = {
  login,
  register,
  currentUser,
};

export default function AuthProviderMock({ children }) {
  return (
    <AuthContextMock.Provider value={ contextValueMock }>
      { children }
    </AuthContextMock.Provider>
  );
}

AuthProviderMock.propTypes = {
  children: PropTypes.node.isRequired,
};
