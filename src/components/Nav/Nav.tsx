import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.scss";
import Cart from "../Cart/Cart";
import { useSelector } from 'react-redux'

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);

  interface Product {
    id: number;
    title: string;
    price: number;
    quantity: number;
    images: string[];
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const chosenProducts = useSelector((state: { cart: { productsInCart: Product[] } }) => state.cart.productsInCart);
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
