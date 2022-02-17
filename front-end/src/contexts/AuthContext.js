import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import AuthService from '../services/AuthService';
import RequestError from '../helpers/RequestError';
import saveStorage from '../utils/saveStorage';
import getStorage from '../utils/getStorage';
import removeStorage from '../utils/removeStorage';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const authService = new AuthService();

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async ({ email, password }, setError) => {
    const response = await authService.login({ email, password });
    if (response instanceof RequestError) return setError(response.message);
    const { user } = response;
    setError('');
    setCurrentUser({ ...user });
    saveStorage('user', { ...user });
  };

  const register = async ({ name, email, password, role }, setError) => {
    const response = await authService.register({ name, email, password, role });
    if (response instanceof RequestError) return setError(response.message);
    login({ email, password }, setError);
  };

  const logout = () => {
    setCurrentUser(null);
    removeStorage('user');
  };

  const getSavedUser = useCallback(async () => {
    const { token = '' } = getStorage('user') || {};
    const response = await authService.loginWithToken(token);
    if (response instanceof RequestError) {
      setLoading(false);
      return removeStorage('user');
    }
    const { user } = response;
    saveStorage('user', { ...user, token });
    setCurrentUser({ ...user, token });
    setLoading(false);
  }, []);

  useEffect(() => {
    getSavedUser();
  }, [getSavedUser]);

  const contextValue = {
    currentUser,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={ contextValue }>
      { !loading && children }
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
