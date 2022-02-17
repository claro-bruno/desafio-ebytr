import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import SInputContainer, { SFloatingLabel, SInput } from './styles';

const Input = forwardRef(({
  children,
  id,
  type,
  value,
  isValid,
  onChange,
  ...rest
}, ref) => (
  <SInputContainer isValid={ isValid }>
    <SFloatingLabel value={ value } htmlFor={ id }>{ children }</SFloatingLabel>
    <SInput
      ref={ ref }
      id={ id }
      type={ type }
      value={ value }
      onChange={ onChange }
      data-testid={ id }
      autoComplete="off"
      { ...rest }
    />
  </SInputContainer>
));

Input.defaultProps = {
  type: 'text',
};

Input.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  isValid: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
