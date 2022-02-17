import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Form } from '../../atoms';
import { useAuth } from '../../contexts/AuthContext';
import useInput from '../../hooks/useInput';
import {
  nameValidation,
  passwordValidation,
  emailValidation,
} from '../../validations';

export default function RegisterForm({ setRegisterError }) {
  const { register } = useAuth();
  const nameInput = useRef(null);

  const [
    name,
    changeName,
    nameIsValid,
    setIsValidName,
  ] = useInput(nameValidation);
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
    nameInput.current.focus();
  }, []);

  const handleBlur = () => {
    if (!name) setIsValidName(true);
    if (!email) setIsValidEmail(true);
    if (!password) setIsValidPassword(true);
  };

  const handleSubmit = () => {
    setRegisterError('');
    register({ name, email, password }, setRegisterError);
  };

  return (
    <Form>
      <Input
        ref={ nameInput }
        id="common_register__input-name"
        value={ name }
        isValid={ nameIsValid }
        onChange={ changeName }
        onBlur={ handleBlur }
      >
        { nameIsValid ? 'Nome' : 'O nome deve possuir ao menos 12 caractéres' }
      </Input>
      <Input
        id="common_register__input-email"
        type="email"
        value={ email }
        isValid={ emailIsValid }
        onChange={ changeEmail }
        onBlur={ handleBlur }
      >
        { emailIsValid ? 'E-mail' : 'Digite um email válido' }
      </Input>
      <Input
        id="common_register__input-password"
        type="password"
        value={ password }
        isValid={ passwordIsValid }
        onChange={ changePassword }
        onBlur={ handleBlur }
      >
        { passwordIsValid ? 'Senha' : 'A senha deve possuir ao menos 6 caractéres' }
      </Input>
      <Button
        id="common_register__button-register"
        type="submit"
        styleType="primary"
        disabled={
          !nameIsValid
          || !passwordIsValid
          || !emailIsValid
          || !name.trim()
          || !password.trim()
          || !email.trim()
        }
        onClick={ handleSubmit }
      >
        Cadastrar
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  setRegisterError: PropTypes.func.isRequired,
};
