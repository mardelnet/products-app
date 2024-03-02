import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Clothes from "./pages/Clothes";
import NoPage from "./pages/NoPage";
import Electronics from "./pages/Electronics";
import Miscellaneous from "./pages/Miscellaneous";
import Furniture from "./pages/Furniture";
import Shoes from "./pages/Shoes";
import './App.css';

function App() {
  return (
    <div className="main-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="clothes" element={<Clothes />} />
            <Route path="electronics" element={<Electronics />} />
            <Route path="furniture" element={<Furniture />} />
            <Route path="shoes" element={<Shoes />} />
            <Route path="miscellaneous" element={<Miscellaneous />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
