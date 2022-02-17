import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import productsMock from '../Data/productsMock';

const ProductsContextMock = createContext();
export const useProductsMock = () => useContext(ProductsContextMock);
export const addItemToCart = jest.fn();
export const removeItemFromCart = jest.fn();
const totalPrice = 0;

const contextValueMock = {
  products: productsMock,
  totalPrice,
  addItemToCart,
  removeItemFromCart,
};

export default function ProductsProviderMock({ children }) {
  return (
    <ProductsContextMock.Provider value={ contextValueMock }>
      { children }
    </ProductsContextMock.Provider>
  );
}

ProductsProviderMock.propTypes = {
  children: PropTypes.node.isRequired,
};
