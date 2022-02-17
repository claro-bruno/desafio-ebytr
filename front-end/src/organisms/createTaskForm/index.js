import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Form } from '../../atoms';
import { useTasks } from '../../contexts/TasksContext';
import useInput from '../../hooks/useInput';

import {
  titleValidation,
  descriptionValidation,
} from '../../validations';

export default function CreateTaskForm({ setRegisterError }) {
  const { register, setModalIsOpen } = useTasks();
  const titleInput = useRef(null);
  const [
    title,
    changeTitle,
    titleIsValid,
    setIsValidTitle,
  ] = useInput(titleValidation);
  const [
    description,
    changeDescription,
    descriptionIsValid,
    setIsValidDescription,
  ] = useInput(descriptionValidation);

  useEffect(() => {
    titleInput.current.focus();
  }, []);

  const handleBlur = () => {
    if (!title) setIsValidTitle(true);
    if (!description) setIsValidDescription(true);
  };

  const handleSubmit = () => {
    setRegisterError('');
    register({ title, description });
    setModalIsOpen(false);
  };

  return (
    <Form>
      <Input
        ref={ titleInput }
        id="common_register__input-title"
        value={ title }
        isValid={ titleIsValid }
        onChange={ changeTitle }
        onBlur={ handleBlur }
      >
        { titleIsValid ? 'Titulo' : 'O nome deve possuir ao menos 5 caracteres' }
      </Input>
      <Input
        id="common_register__input-description"
        value={ description }
        isValid={ descriptionIsValid }
        onChange={ changeDescription }
        onBlur={ handleBlur }
      >
        { descriptionIsValid ? 'Descrição' : 'Digite a descrição' }
      </Input>
      <Button
        id="common_register__button-register"
        type="submit"
        styleType="primary"
        disabled={
          !titleIsValid
          || !descriptionIsValid
          || !title.trim()
          || !description.trim()
        }
        onClick={ handleSubmit }
      >
        Cadastrar
      </Button>
    </Form>
  );
}

CreateTaskForm.propTypes = {
  setRegisterError: PropTypes.func.isRequired,
};
