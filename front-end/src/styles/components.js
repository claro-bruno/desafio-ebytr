import styled from 'styled-components';
import saleStatusMessages from '../utils/saleStatusMessages';

export const SOrder = styled.div`
align-items: center;
background-color: white;
color: black;
display: flex;
font-size: 1.8rem;
height: 100%;
text-align: center;
min-width: 100%;
`;

const getStatusColor = ({ theme, styleType }) => {
  if (styleType === saleStatusMessages.pending) return theme.status.pending;
  if (styleType === saleStatusMessages.preparing) return theme.status.preparing;
  if (styleType === saleStatusMessages.inTransit) return theme.status.preparing;
  return theme.status.delivered;
};

export const SStatus = styled.div`
  align-items: center;
  background-color: ${getStatusColor};
  border-radius: 10px;
  color: black;
  display: flex;
  font-family: sans-serif;
  font-size: 1.8rem;
  font-weight: bold;
  justify-content: center;
  min-height: 100%;
  min-width: 100%;
  text-align: center;
`;

export const SDate = styled.div`
  align-items: center;
  background-color: white;
  color: black;
  font-size: 1.6rem;
  font-weight: bold;
  height: 45%;
  min-width: 100%;
  text-align: center;
`;

export const SPrice = styled.div`
  align-items: center;
  background-color: white;
  color: black;
  font-size: 1.6rem;
  font-weight: bold;
  height: 45%;
  min-width: 100%;
  text-align: center;
`;

export const SFullAddress = styled.div`
  align-items: center;
  background-color: white;
  color: black;
  font-family: sans-serif;
  font-size: 1rem;
  text-align: right;
`;
