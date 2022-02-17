import { useState } from 'react';

export default (validation) => {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const change = ({ target: { value } }) => {
    setInputValue(value);
    setIsValid(validation(value));
  };

  return [inputValue, change, isValid, setIsValid];
};
