import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import './App.css';
import Products from "./components/Products/Products";

function App() {
  function ProductsWrapper({ category }: { category: number | null }) {
    const location = useLocation();
    return <Products key={location.pathname} category={category} />;
  }

  return (
    <div className="main-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ProductsWrapper category={null} />} />
            <Route path="clothes" element={<ProductsWrapper category={1} />} />
            <Route path="electronics" element={<ProductsWrapper category={2} />} />
            <Route path="furniture" element={<ProductsWrapper category={3} />} />
            <Route path="shoes" element={<ProductsWrapper category={4} />} />
            <Route path="miscellaneous" element={<ProductsWrapper category={5} />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
