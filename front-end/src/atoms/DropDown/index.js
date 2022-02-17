import React from 'react';
import PropTypes from 'prop-types';
import SDropDown from './style';

export default function DropDown({ options, testId, ...rest }) {
  return (
    <SDropDown
      data-testid={ testId }
      { ...rest }
    >
      {
        options.map(
          (option) => (
            <option key={ option.id } value={ option.id }>{ option.name }</option>
          ),
        )
      }
    </SDropDown>
  );
}

DropDown.defaultProps = {
  testId: '',
};

DropDown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  testId: PropTypes.string,
};
