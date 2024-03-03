import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './Nav';
import { Provider, useSelector } from 'react-redux'; // Import Provider
import configureStore from 'redux-mock-store'; // Import configureStore

// Mocked useSelector function
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn()
}));

describe('Nav component', () => {
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
    useSelector.mockReturnValue(mockProductsInCart);
  });

  test('renders navigation links', () => {
    render(
      <Provider store={configureStore()({})}> {/* Provide a mock store */}
        <Router>
          <Nav />
        </Router>
      </Provider>
    );

    // Check if navigation links are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Clothes')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Furniture')).toBeInTheDocument();
    expect(screen.getByText('Shoes')).toBeInTheDocument();
    expect(screen.getByText('Miscellaneous')).toBeInTheDocument();
  });
});

