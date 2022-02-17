import React, { useState } from 'react';
import { CreateTaskForm } from '../../organisms';
import SMainRegister from './styles';

export default function CreateTask() {
  const [error, setError] = useState('');

  return (
    <SMainRegister>
      <CreateTaskForm setRegisterError={ setError } />
      { error && (
        <p data-testid="common_register__element-invalid_register">{ error }</p>
      ) }
    </SMainRegister>
  );
}
