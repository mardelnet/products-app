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
   * @param {string | null} props.category - The category ID for filtering products.
   * @returns {JSX.Element} - JSX element representing the Products component with the specified category.
   */
  function ProductsWrapper({ category }: { category: string | null }) {
    const location = useLocation();
    return <Products key={location.pathname} category={category} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductsWrapper category={null} data-testid="products" />} />
          <Route path="women" element={<ProductsWrapper category={"women's clothing"} />} />
          <Route path="men" element={<ProductsWrapper category={"men's clothing"} />} />
          <Route path="electronics" element={<ProductsWrapper category={'electronics'} />} />
          <Route path="jewelery" element={<ProductsWrapper category={'jewelery'} />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
