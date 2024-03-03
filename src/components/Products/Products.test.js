/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Products from './Products';
import { getSelectedProduct, showSelectedProduct } from '../../utils/selectedProductSlice';
import { addProductToCart } from '../../utils/cartSlice';
import { useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

describe('Products component', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 10,
      description: 'Test Description 1',
      category: { name: 'Test Category 1' },
      images: ['test-image-1.jpg']
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 20,
      description: 'Test Description 2',
      category: { name: 'Test Category 2' },
      images: ['test-image-2.jpg']
    }
  ];

  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(mockProducts)
    });
    useDispatch.mockReturnValue(mockDispatch);
  });

  test('renders loading message initially', () => {
    render(<Products category={null} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders products correctly after loading', async () => {
    render(<Products category={null} />);
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });
  });

  test('dispatches actions when "View details" button is clicked', async () => {
    render(<Products category={null} />);
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });

    // Find the "View details" button within the first product
    const viewDetailsButton = screen.getAllByRole('button', { name: 'View details' })[0];
    userEvent.click(viewDetailsButton);
    
    expect(mockDispatch).toHaveBeenCalledWith(getSelectedProduct(1));
    expect(mockDispatch).toHaveBeenCalledWith(showSelectedProduct(true));
  });

  test('dispatches action when "Add to Cart" button is clicked', async () => {
    render(<Products category={null} />);
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });

    // Find the "Add to Cart" button within the first product
    const addToCartButton = screen.getAllByRole('button', { name: 'Add to Cart' })[0];
    userEvent.click(addToCartButton);
    
    expect(mockDispatch).toHaveBeenCalledWith(addProductToCart(mockProducts[0]));
  });
});
