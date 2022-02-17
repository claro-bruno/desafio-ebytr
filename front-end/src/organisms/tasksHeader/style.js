import styled from 'styled-components';

const SHeaderContainer = styled.header`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: space-between;
  height: 4rem;
  width: 100%;
`;

export default SHeaderContainer;
