import { transparentize } from 'polished';
import styled from 'styled-components';

const labelTransform = 'scale(.75) translateY(-.5rem)';

export const SInput = styled.input`
  border: none;
  outline: 0;
  padding: .550rem 0 0;
  width: 100%;
`;

export const SFloatingLabel = styled.label`
  background-color: transparent;
  font-size: 15px;
  margin-top: .3rem;
  opacity: ${({ value }) => (value ? '0.5' : '0.7')};
  position: absolute;
  transform-origin: top left;
  transform: ${({ value }) => value && labelTransform};
  transition: opacity 200ms, transform 200ms;
`;

const SInputContainer = styled.div`
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ isValid, theme }) => (
    transparentize('0.1', isValid ? theme.colors.secondary : '#FC4343')
  )};
  border-radius: 5px;
  line-height: 1.3rem;
  padding: .2rem .5rem .2rem .7rem;
  position: relative;
  transition: box-shadow 250ms;
  width: 100%;

  :focus-within {
    box-shadow: 0 0 0 0.20rem ${({ isValid, theme }) => (
    transparentize('0.7', isValid ? theme.colors.secondary : '#FC4343')
  )};

    ${SFloatingLabel} {
      opacity: 0.5;
      transform: ${labelTransform};
    }
  }
`;

export default SInputContainer;
