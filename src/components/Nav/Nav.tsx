import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.scss";
import Cart from "../Cart/Cart";
import { useSelector } from 'react-redux'

/**
 * A functional component representing the navigation bar.
 * Displays navigation links and a cart button.
 */
const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);

  /**
   * Toggles the visibility of the menu.
   */
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  /**
   * Toggles the visibility of the cart.
   */
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  /**
   * Represents a product in the cart.
   */
  interface Product {
    id: number;
    title: string;
    price: number;
    quantity: number;
    images: string[];
  }

  // Get the products from the Redux store
  const chosenProducts = useSelector((state: { cart: { productsInCart: Product[] } }) => state.cart.productsInCart);

  // Calculate the total price of all products in the cart
  const total = chosenProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0);

  return (
    <>
      <nav className={styles.nav}>
        <ul className={showMenu ? styles.show : ""}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/clothes">Clothes</Link>
          </li>
          <li>
            <Link to="/electronics">Electronics</Link>
          </li>
          <li>
            <Link to="/furniture">Furniture</Link>
          </li>
          <li>
            <Link to="/shoes">Shoes</Link>
          </li>
          <li>
            <Link to="/miscellaneous">Miscellaneous</Link>
          </li>
        </ul>
        <button
          className={`${styles["menu-label"]} ${styles["cart-button"]} ${showMenu ? styles.open : ""}`}
          onClick={toggleMenu}
        >
          CATEGORIES
        </button>
        <button
          className={`${styles["cart-button"]} ${showCart ? styles.open : ""}`}
          onClick={toggleCart}
        >
          CART: ${total}
        </button>
      </nav>
      {showCart && (<Cart totalPrice={total} />)}
    </>
  )
};

export default Nav;
