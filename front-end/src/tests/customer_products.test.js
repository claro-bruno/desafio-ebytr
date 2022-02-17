import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthProviderMock, { useAuthMock, currentUser } from './mocks/contexts/AuthContextMock';
import ProductsProviderMock, {
  useProductsMock,
  addItemToCart,
  removeItemFromCart,
} from './mocks/contexts/ProductsContextMock';
import * as AuthContext from '../contexts/AuthContext';
import * as ProductContext from '../contexts/ProductsContext';
import renderWithRouter from './renderWithRouter';
import { Products } from '../pages';
import productsMock from './mocks/Data/productsMock';

const productsHeaderButtonTestId = 'customer_products__element-navbar-link-products';
const ordersHeaderButtonTestId = 'customer_products__element-navbar-link-orders';
const headerUserNameTestId = 'customer_products__element-navbar-user-full-name';
const logoutHeaderButtonTestId = 'customer_products__element-navbar-link-logout';
const productCardTestId = 'product-card';
const productCardPriceTestId = 'customer_products__element-card-price-';
const productCardImageTestId = 'customer_products__img-card-bg-image-';
const productCardNameTestId = 'customer_products__element-card-title-';
const productCardRemoveTestId = 'customer_products__button-card-rm-item-';
const productCardInputTestId = 'customer_products__input-card-quantity-';
const productCardAddTestId = 'customer_products__button-card-add-item-'
const cartButtonTestId = 'customer_products__button-cart';
const cartTotalPriceTestId = 'customer_products__checkout-bottom-value';

beforeEach(() => {
  jest.spyOn(AuthContext, 'useAuth').mockImplementation(useAuthMock);
  jest.spyOn(ProductContext, 'useProducts').mockImplementation(useProductsMock);

  renderWithRouter(
    <AuthProviderMock>
      <ProductsProviderMock>
        <Products />
      </ProductsProviderMock>
    </AuthProviderMock>
  );
});

afterEach(() => {
  jest.clearAllMocks();
})

describe('Verifica se existe os elementos do header na página', () => {
  it('Um botão para produtos', async () => {
    const productsHeaderButton = await screen.findByTestId(productsHeaderButtonTestId);
    expect(productsHeaderButton).toBeDefined();
  });

  it('Um botão para pedidos', async () => {
    const ordersHeaderButton = await screen.findByTestId(ordersHeaderButtonTestId);
    expect(ordersHeaderButton).toBeDefined();
  });

  it('Um elemento com o nome do usuário atual', async () => {
    const headerUserName = await screen.findByTestId(headerUserNameTestId);

    expect(headerUserName).toBeDefined();
    expect(headerUserName.innerHTML).toBe(currentUser.name);
  });

  it('Um botão para sair', async () => {
    const logoutHeaderButton = await screen.findByTestId(logoutHeaderButtonTestId);
    expect(logoutHeaderButton).toBeDefined();
  })
});

describe('Verifica o botão de ver o carrinho', () => {
  it('Verifica se existe um botão para ver o carrinho', async () => {
    const cartButton = await screen.findByTestId(cartButtonTestId);
    expect(cartButton).toBeDefined();
  });

  it('Verifica se existe um elemento com o preço total do carrinho', async () => {
    const cartTotalPrice = await screen.findByTestId(cartTotalPriceTestId);
    expect(cartTotalPrice).toBeDefined();
  });
});

describe('Verifica se os cards de produto renderizam com a informação correta', () => {
  it('Verifica se existe um card pra cada produto', async () => {
    const productCards = await screen.findAllByTestId(productCardTestId);
    expect(productCards.length).toBe(productsMock.length);
  });

  it('Verifica se cada card de produto contém sua respectiva informação', async () => {
    const productCards = await screen.findAllByTestId(productCardTestId);

    for (let index = 0; index < productCards.length; index += 1) {
      const productCardPrice = await screen.findByTestId(`${productCardPriceTestId}${index + 1}`);
      const productCardImage = await screen.findByTestId(`${productCardImageTestId}${index + 1}`);
      const productCardName = await screen.findByTestId(`${productCardNameTestId}${index + 1}`);
      const productCardRemove = await screen.findByTestId(`${productCardRemoveTestId}${index + 1}`);
      const productCardAdd = await screen.findByTestId(`${productCardAddTestId}${index + 1}`);
      const productCardInput = await screen.findByTestId(`${productCardInputTestId}${index + 1}`);

      expect(productCardPrice.innerHTML).toBe(`R$${productsMock[index].price.replace(/\./, ',')}`);
      expect(productCardImage.src).toBe(productsMock[index].urlImage);
      expect(productCardName.innerHTML).toBe(productsMock[index].name);
      expect(productCardRemove).toBeDefined();
      expect(productCardAdd).toBeDefined();
      expect(productCardInput.value).toBe('0');
    }
  });

  it('Verifica se é possível adicionar itens ao carrinho', async () => {
    const productCardAdd = await screen.findByTestId(`${productCardAddTestId}${1}`);

    for (let index = 0; index < 3; index += 1) {
      userEvent.click(productCardAdd);
    }

    expect(addItemToCart).toHaveBeenCalledTimes(3);
  });

  it('Verifica se é possivel remover itens do carrinho', async () => {
    const productCardRemove = await screen.findByTestId(`${productCardRemoveTestId}${1}`);

    for (let index = 0; index < 3; index += 1) {
      userEvent.click(productCardRemove);
    }

    expect(removeItemFromCart).toHaveBeenCalledTimes(3);
  });
});