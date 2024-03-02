import React from "react";
import { Outlet } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import Nav from "../components/Nav/Nav";

const Layout = () => {
  return (
    <>
      <Nav />
      <div className="main-container"><Outlet /></div>
      <ProductDetails category={null}></ProductDetails>
    </>
  );
};

export default Layout;
