import React from "react";
import { Outlet } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import Nav from "../components/Nav/Nav";
import { useSelector } from 'react-redux'

/**
 * Represents the layout of the application.
 */
const Layout = () => {
  // @ts-ignore
  const showModal = useSelector(state => state.chosenProduct.showModal)

  return (
    <>
      <Nav />
      <div className="main-container"><Outlet /></div>
      {showModal && (<ProductDetails category={null}></ProductDetails>)}
    </>
  );
};

export default Layout;
