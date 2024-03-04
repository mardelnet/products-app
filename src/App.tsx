import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Products from "./components/Products/Products";

/**
 * Main component of the application.
 * Renders different routes based on the URL path.
 */
function App() {
  /**
   * Wrapper component for the Products component.
   * Manages the category prop and provides it to the Products component.
   * @param {Object} props - Props for the ProductsWrapper component.
   * @param {number | null} props.category - The category ID for filtering products.
   * @returns {JSX.Element} - JSX element representing the Products component with the specified category.
   */
  function ProductsWrapper({ category }: { category: number | null }) {
    const location = useLocation();
    return <Products key={location.pathname} category={category} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductsWrapper category={null} data-testid="products" />} />
          <Route path="clothes" element={<ProductsWrapper category={1} />} />
          <Route path="electronics" element={<ProductsWrapper category={2} />} />
          <Route path="furniture" element={<ProductsWrapper category={3} />} />
          <Route path="shoes" element={<ProductsWrapper category={4} />} />
          <Route path="miscellaneous" element={<ProductsWrapper category={5} />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
