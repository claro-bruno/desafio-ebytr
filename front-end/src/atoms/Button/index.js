import React from 'react';
import PropTypes from 'prop-types';
import SButton from './styles';

function Button({ id, children, styleType, ...rest }) {
  return (
    <SButton id={ id } data-testid={ id } styleType={ styleType } { ...rest }>
      { children }
    </SButton>
  );
}

Button.defaultProps = {
  styleType: 'primary',
};

Button.propTypes = {
  id: PropTypes.string.isRequired,
  styleType: PropTypes.oneOf(['primary', 'secondary']),
  children: PropTypes.node.isRequired,
};

export default Button;
