import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.scss";
import Cart from "../Cart/Cart";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

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
          CART: $0.00
        </button>
      </nav>
      {showCart && (<Cart />)}
    </>
  )
};

export default Nav;
