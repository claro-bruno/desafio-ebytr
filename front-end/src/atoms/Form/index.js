import React from 'react';
import PropTypes from 'prop-types';
import SForm from './styles';

export default function Form({ children }) {
  return (
    <SForm onSubmit={ (e) => e.preventDefault() }>
      { children }
    </SForm>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
};
