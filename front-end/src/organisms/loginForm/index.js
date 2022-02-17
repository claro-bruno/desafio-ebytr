import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Form } from '../../atoms';
import { useAuth } from '../../contexts/AuthContext';
import useInput from '../../hooks/useInput';
import { passwordValidation, emailValidation } from '../../validations';

export default function LoginForm({ setLoginError }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const emailInput = useRef(null);

  const [
    email,
    changeEmail,
    emailIsValid,
    setIsValidEmail,
  ] = useInput(emailValidation);
  const [
    password,
    changePassword,
    passwordIsValid,
    setIsValidPassword,
  ] = useInput(passwordValidation);

  useEffect(() => {
    emailInput.current.focus();
  }, []);

  const handleBlur = () => {
    if (!email) setIsValidEmail(true);
    if (!password) setIsValidPassword(true);
  };

  const handleSubmit = () => {
    login({ email, password }, setLoginError);
  };

  return (
    <Form>
      <Input
        ref={ emailInput }
        id="common_login__input-email"
        type="email"
        value={ email }
        isValid={ emailIsValid }
        onChange={ changeEmail }
        onBlur={ handleBlur }
      >
        { emailIsValid ? 'E-mail' : 'Digite um email válido' }
      </Input>
      <Input
        id="common_login__input-password"
        type="password"
        value={ password }
        isValid={ passwordIsValid }
        onChange={ changePassword }
        onBlur={ handleBlur }
      >
        { passwordIsValid ? 'Senha' : 'A senha deve possuir ao menos 6 caractéres' }
      </Input>
      <Button
        id="common_login__button-login"
        type="submit"
        styleType="primary"
        disabled={
          !passwordIsValid
          || !emailIsValid
          || !password.trim()
          || !email.trim()
        }
        onClick={ handleSubmit }
      >
        Entrar
      </Button>
      <Button
        id="common_login__button-register"
        type="button"
        styleType="secondary"
        onClick={ () => navigate('/register') }
      >
        Registrar-se
      </Button>
    </Form>
  );
}

LoginForm.propTypes = {
  setLoginError: PropTypes.func.isRequired,
};
