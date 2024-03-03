import cartReducer, { addProductToCart, removeProductFromCart } from './cartSlice';

describe('cartSlice reducer', () => {
  const initialState = {
    productsInCart: [],
  };

  test('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle adding a product to the cart', () => {
    const product = {
      id: 1,
      title: 'Product 1',
      price: 10,
      images: ['image1.jpg'],
    };

    const nextState = cartReducer(initialState, addProductToCart(product));
    expect(nextState.productsInCart).toHaveLength(1);
    expect(nextState.productsInCart[0]).toEqual({ ...product, quantity: 1 });
  });

  test('should handle increasing quantity when adding an existing product to the cart', () => {
    const existingProduct = {
      id: 1,
      title: 'Product 1',
      price: 10,
      images: ['image1.jpg'],
      quantity: 1,
    };

    const state = {
      productsInCart: [existingProduct],
    };

    const nextState = cartReducer(state, addProductToCart(existingProduct));
    expect(nextState.productsInCart).toHaveLength(1);
    expect(nextState.productsInCart[0]).toEqual({ ...existingProduct, quantity: 2 });
  });

  test('should handle removing a product from the cart', () => {
    const productToRemove = {
      id: 1,
      title: 'Product 1',
      price: 10,
      images: ['image1.jpg'],
      quantity: 1,
    };

    const state = {
      productsInCart: [productToRemove],
    };

    const nextState = cartReducer(state, removeProductFromCart(1));
    expect(nextState.productsInCart).toHaveLength(0);
  });

  test('should not remove any product if the provided id does not match any product in the cart', () => {
    const product = {
      id: 1,
      title: 'Product 1',
      price: 10,
      images: ['image1.jpg'],
      quantity: 1,
    };

    const state = {
      productsInCart: [product],
    };

    const nextState = cartReducer(state, removeProductFromCart(2));
    expect(nextState.productsInCart).toHaveLength(1);
    expect(nextState.productsInCart[0]).toEqual(product);
  });
});
