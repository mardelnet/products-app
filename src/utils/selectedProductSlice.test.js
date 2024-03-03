import selectedProductReducer, { showSelectedProduct, getSelectedProduct } from './selectedProductSlice';

describe('selectedProductSlice reducer', () => {
  const initialState = {
    showModal: false,
    selectedProductId: 0,
  };

  test('should handle initial state', () => {
    expect(selectedProductReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle showing or hiding the modal', () => {
    const nextState = selectedProductReducer(initialState, showSelectedProduct(true));
    expect(nextState.showModal).toEqual(true);
  });

  test('should handle getting the selected product', () => {
    const nextState = selectedProductReducer(initialState, getSelectedProduct(1));
    expect(nextState.selectedProductId).toEqual(1);
  });
});
