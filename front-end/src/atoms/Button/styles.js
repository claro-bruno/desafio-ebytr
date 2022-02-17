import styled from 'styled-components';

const styleTypes = {
  primary: 'primary',
  secondary: 'secondary',
};

const getButtonColor = ({ theme, styleType }) => {
  if (styleType === styleTypes.secondary) {
    return theme.colors.secondary;
  }

  return theme.colors.primary;
};

const SButton = styled.button`
  background-color: ${getButtonColor};
  border: 2px solid ${getButtonColor};
  border-radius: 4px;
  color: white;
  cursor: pointer;
  padding: 8px;
  width: 100%;

  :hover {
    background-color: white;
    border: 2px solid ${getButtonColor};
    color: ${getButtonColor};
  }

  :disabled {
    opacity: 0.7;
  }
`;

export default SButton;
