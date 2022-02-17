import React, { useState } from 'react';
import { LoginForm } from '../../organisms';
import SMainLogin from './styles';

export default function LoginTemplate() {
  const [error, setError] = useState('');

  return (
    <SMainLogin>
      <LoginForm setLoginError={ setError } />
      { error && <p data-testid="common_login__element-invalid-email">{ error }</p> }
    </SMainLogin>
  );
}
