import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthProviderMock, { useAuthMock, register } from './mocks/contexts/AuthContextMock';
import * as AuthContext from '../contexts/AuthContext';
import renderWithRouter from './renderWithRouter';
import { Register } from '../pages';

const nameInputTestId = 'common_register__input-name';
const emailInputTestId = 'common_register__input-email';
const passwordInputTestId = 'common_register__input-password';
const registerButtonTestId = 'common_register__button-register';

beforeEach(() => {
  jest.spyOn(AuthContext, 'useAuth').mockImplementation(useAuthMock);

  renderWithRouter(
    <AuthProviderMock>
      <Register />
    </AuthProviderMock>
  );
})

afterEach(() => {
  jest.clearAllMocks();
})

describe('Verifa se existe todos os elementos na tela', () => {
  it('Um input para name', async () => {
    const nameInput = await screen.findByTestId(nameInputTestId);
    expect(nameInput).toBeDefined();
  });

  it('Um input para email', async () => {
    const emailInput = await screen.findByTestId(emailInputTestId);
    expect(emailInput).toBeDefined();
  });

  it('Um input para senha', async () => {
    const passwordInput = await screen.findByTestId(passwordInputTestId);
    expect(passwordInput).toBeDefined();
  });

  it('Um botão para cadastrar', async () => {
    const registerButton = await screen.findByTestId(registerButtonTestId);
    expect(registerButton).toBeDefined();
  });
});

describe('Verifica se o botão para cadastrar está desabilitado ao passar dados inválidos', () => {
  it('Nome inválido', async () => {
    const nameInput = await screen.findByTestId(nameInputTestId);
    const emailInput = await screen.findByTestId(emailInputTestId);
    const password = await screen.findByTestId(passwordInputTestId);
    const registerButton = await screen.findByTestId(registerButtonTestId);

    userEvent.type(nameInput, 'Guilherme');
    userEvent.type(emailInput, 'guilherme@gmail.com');
    userEvent.type(password, 'gui2587lherme547');

    expect(registerButton).toHaveAttribute('disabled');
  });

  it('Email inválido', async () => {
    const nameInput = await screen.findByTestId(nameInputTestId);
    const emailInput = await screen.findByTestId(emailInputTestId);
    const password = await screen.findByTestId(passwordInputTestId);
    const registerButton = await screen.findByTestId(registerButtonTestId);

    userEvent.type(nameInput, 'Guilherme Aguiar');
    userEvent.type(emailInput, 'guilherme.gmail.com');
    userEvent.type(password, 'gui2587lherme547');

    expect(registerButton).toHaveAttribute('disabled');
  });

  it('Senha inválido', async () => {
    const nameInput = await screen.findByTestId(nameInputTestId);
    const emailInput = await screen.findByTestId(emailInputTestId);
    const password = await screen.findByTestId(passwordInputTestId);
    const registerButton = await screen.findByTestId(registerButtonTestId);

    userEvent.type(nameInput, 'Guilherme Aguiar');
    userEvent.type(emailInput, 'guilherme@gmail.com');
    userEvent.type(password, '12345');

    expect(registerButton).toHaveAttribute('disabled');
  });
});

describe('Verifica se o botão de cadastrar é habilitado ao passar dados válidos e se é feito o registro', () => {
  it('Botão de cadastro é habilitado ao passar dados válidos', async () => {
    const nameInput = await screen.findByTestId(nameInputTestId);
    const emailInput = await screen.findByTestId(emailInputTestId);
    const password = await screen.findByTestId(passwordInputTestId);
    const registerButton = await screen.findByTestId(registerButtonTestId);

    userEvent.type(nameInput, 'Guilherme Aguiar');
    userEvent.type(emailInput, 'guilherme@gmail.com');
    userEvent.type(password, 'gui2587lherme547');

    expect(registerButton).not.toHaveAttribute('disabled');
  });

  it('É feito o cadastro ao clicar no boão de registrar', async () => {
    const nameInput = await screen.findByTestId(nameInputTestId);
    const emailInput = await screen.findByTestId(emailInputTestId);
    const password = await screen.findByTestId(passwordInputTestId);
    const registerButton = await screen.findByTestId(registerButtonTestId);

    userEvent.type(nameInput, 'Guilherme Aguiar');
    userEvent.type(emailInput, 'guilherme@gmail.com');
    userEvent.type(password, 'gui2587lherme547');
    userEvent.click(registerButton);

    expect(register).toHaveBeenCalledTimes(1);
  });
});