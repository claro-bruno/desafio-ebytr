import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthProviderMock, { useAuthMock, login } from './mocks/contexts/AuthContextMock';
import * as AuthContext from '../contexts/AuthContext';
import renderWithRouter from './renderWithRouter';
import { Login } from '../pages';

const emailInputTestId = 'common_login__input-email';
const passwordInputTestId = 'common_login__input-password';
const loginButtonTestId = 'common_login__button-login';
const registerButtonTestId = 'common_login__button-register';

beforeEach(() => {
  jest.spyOn(AuthContext, 'useAuth').mockImplementation(useAuthMock);

  renderWithRouter(
    <AuthProviderMock>
      <Login />
    </AuthProviderMock>
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Verifica se existe todos os elementos na tela', () => {
  it('Um input para email', async () => {
    const emailInput = await screen.findByTestId(emailInputTestId);
    expect(emailInput).toBeDefined();
  });

  it('Um input para senha', async () => {
    const passwordInput = await screen.findByTestId(passwordInputTestId);
    expect(passwordInput).toBeDefined();
  });

  it('Um botão para logar', async () => {
    const loginButton = await screen.findByTestId(loginButtonTestId);
    expect(loginButton).toBeDefined();
  });

  it('Um botão para registrar', async () => {
    const registerButton = await screen.findByTestId(registerButtonTestId);
    expect(registerButton).toBeDefined();
  });
});

describe('Verifica se o botão de logar está desabilitado ao passar dados inválidos', () => {
  it('Email inválido', async () => {
    const emailInput = await screen.findByTestId(emailInputTestId);
    const loginButton = await screen.findByTestId(loginButtonTestId);

    userEvent.type(emailInput, 'test.gmail.com');
    expect(loginButton).toHaveAttribute('disabled');
  });

  it('Senha inválido', async () => {
    const passwordInput = await screen.findByTestId(passwordInputTestId);
    const loginButton = await screen.findByTestId(loginButtonTestId);

    userEvent.type(passwordInput, '12345');
    expect(loginButton).toHaveAttribute('disabled');
  });
});

describe('Verifica se o botão de logar é habilitado ao passar dados válidos e se é feito o login', () => {
  it('Verifica se o botão de logar é habilitado', async () => {
    const emailInput = await screen.findByTestId(emailInputTestId);
    const passwordInput = await screen.findByTestId(passwordInputTestId);
    const loginButton = await screen.findByTestId(loginButtonTestId);

    userEvent.type(emailInput, 'rafaela21@gmail.com');
    userEvent.type(passwordInput, 'rafa21875632');

    expect(loginButton).not.toHaveAttribute('disabled');
  });

  it('Verifica se é feito o login ao clicar no botão de logar', async () => {
    const emailInput = await screen.findByTestId(emailInputTestId);
    const passwordInput = await screen.findByTestId(passwordInputTestId);
    const loginButton = await screen.findByTestId(loginButtonTestId);

    userEvent.type(emailInput, 'rafaela21@gmail.com');
    userEvent.type(passwordInput, 'rafa21875632');
    userEvent.click(loginButton);

    expect(login).toHaveBeenCalledTimes(1);
  })
});
