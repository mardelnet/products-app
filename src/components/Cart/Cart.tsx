import React from 'react';
import styles from "./Cart.module.scss";
import { useSelector } from 'react-redux'

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  images: string[];
}

const Cart = () => {
  // @ts-ignore
  const getChosenProduct = useSelector(state => state.cart.productsInCart)
  
  return (
    <div className={styles['cart-container']}>
      {getChosenProduct && getChosenProduct.map((product: Product) => (
        <div className={styles["product"]} key={product.id}>
          <img className={styles["product__image"]} src={product.images[0]} alt={product.title} />
          <div className={styles["product__price"]}>
            <div>{product.title}</div>
            $ {product.price} x {product.quantity} units
          </div>
          <button>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;