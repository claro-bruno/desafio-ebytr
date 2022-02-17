import React, { useState } from 'react';
import { RegisterForm } from '../../organisms';
import SMainRegister from './styles';

export default function RegisterTemplate() {
  const [error, setError] = useState('');

  return (
    <SMainRegister>
      <RegisterForm setRegisterError={ setError } />
      { error && (
        <p data-testid="common_register__element-invalid_register">{ error }</p>
      ) }
    </SMainRegister>
  );
}
