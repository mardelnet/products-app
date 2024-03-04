import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductDetails from './ProductDetails';

// Mock Redux state
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('ProductDetails component', () => {
  test('renders loading state initially', () => {
    render(<ProductDetails />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders product details after loading', async () => {
    const mockProduct = {
      id: 1,
      title: 'Test Product',
      price: 10,
      description: 'Test description',
      category: 'Test Category',
      image: 'test-image.jpg',
    };

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(mockProduct),
    });

    render(<ProductDetails />);

    // Wait for product details to load
    await screen.findByText('Test Product');

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('$ 10')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });
});
