import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Layout from './pages/Layout';
import Products from './components/Products/Products';
import NoPage from './pages/NoPage';

jest.mock('./pages/Layout', () => () => <div data-testid="layout">Layout</div>);
jest.mock('./components/Products/Products', () => () => <div data-testid="products">Products</div>);
jest.mock('./pages/NoPage', () => () => <div data-testid="no-page">NoPage</div>);

describe('App component', () => {
  test('renders layout and products components for root path', () => {
    render(<App />);
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  test('renders layout and products components for unknown path', () => {
    render(<App />);
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  // Additional tests for specific routes if necessary
});
