import styled from 'styled-components';
import { shade } from 'polished';

export const STasksTableContainer = styled.div`
  /* background-color: whitesmoke; */
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 10px;
  width: 80%;
`;

export const STasksTable = styled.table`
  border-collapse: separate;
  border-spacing: 0 12px;
  margin: 0 auto;
  width: 100%;
`;

export const STasksTableTh = styled.th``;

const customSecondaryColorType = 'darkPrimary';

const getTdBackgroundColor = ({ styleType, theme }) => {
  if (!styleType) {
    return shade('0.1%', theme.background);
  }

  if (styleType === customSecondaryColorType) {
    return shade('0.15%', theme.colors.secondary);
  }

  return theme.colors[styleType];
};

const getTdColor = ({ styleType }) => {
  if (!styleType || styleType === customSecondaryColorType) {
    return 'black';
  }

  return 'white';
};

const getAlignment = ({ align }) => {
  if (!align) {
    return 'left';
  }

  return align;
};

export const STaskTableRow = styled.tr`
  height: 20px;
`;

export const STaskTableRowTd = styled.td`
  background-color: ${getTdBackgroundColor};
  color: ${getTdColor};
  padding: 5px;
  text-align: ${getAlignment};
`;
