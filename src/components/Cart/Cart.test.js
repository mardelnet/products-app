import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Cart from './Cart';
import { removeProductFromCart } from '../../utils/cartSlice';

const mockStore = configureStore([]);

describe('Cart component', () => {
  let store;
  const totalPrice = 50; // Mock total price
  const mockProductsInCart = [
    {
      id: 1,
      title: 'Product 1',
      price: 10,
      quantity: 2,
      images: ['image1.jpg']
    },
    {
      id: 2,
      title: 'Product 2',
      price: 15,
      quantity: 1,
      images: ['image2.jpg']
    }
  ];

  beforeEach(() => {
    store = mockStore({
      cart: {
        productsInCart: mockProductsInCart
      }
    });
  });

  test('renders cart with products and total price', () => {
    render(
      <Provider store={store}>
        <Cart totalPrice={totalPrice} />
      </Provider>
    );

    // Check if products are rendered
    expect(screen.getAllByTestId('product')).toHaveLength(mockProductsInCart.length);

    // Check if total price is rendered
    expect(screen.getByText(`Total Price: $${totalPrice}`)).toBeInTheDocument();
  });

  test('dispatches removeProductFromCart action when remove button is clicked', () => {
    render(
      <Provider store={store}>
        <Cart totalPrice={totalPrice} />
      </Provider>
    );

    // Find remove buttons and click one of them
    const removeButton = screen.getAllByLabelText('Remove from Cart')[0];
    fireEvent.click(removeButton);

    // Check if removeProductFromCart action is dispatched with correct payload
    const expectedAction = removeProductFromCart(mockProductsInCart[0].id);
    expect(store.getActions()).toEqual([expectedAction]);
  });
});
