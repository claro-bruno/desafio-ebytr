import React from 'react';
import PropTypes from 'prop-types';
import SHeaderCard from './style';

function HeaderCard({ children, styleType, testid, ...rest }) {
  return (
    <SHeaderCard
      styleType={ styleType }
      data-testid={ testid }
      { ...rest }
    >
      { children }
    </SHeaderCard>
  );
}

HeaderCard.defaultProps = {
  styleType: 'primary',
  testid: '',
};

HeaderCard.propTypes = {
  children: PropTypes.node.isRequired,
  styleType: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'quarternary']),
  testid: PropTypes.string,
};

export default HeaderCard;
