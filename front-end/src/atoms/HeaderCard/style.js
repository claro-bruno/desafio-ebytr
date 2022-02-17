import styled from 'styled-components';

const getBackgroundColor = ({ theme, styleType }) => theme.colors[styleType];
const getColor = ({ styleType }) => {
  if (styleType === 'secondary') {
    return 'black';
  }

  return 'white';
};

const getCursor = ({ isButton }) => {
  if (isButton) {
    return 'pointer';
  }

  return 'unset';
};

const SHeaderCard = styled.button`
  background-color: ${getBackgroundColor};
  border: none;
  color: ${getColor};
  font-size: 1.2rem;
  font-weight: 600;
  height: 4rem;
  width: 14rem;

  :hover {
    cursor: ${getCursor};
  }
`;

export default SHeaderCard;
