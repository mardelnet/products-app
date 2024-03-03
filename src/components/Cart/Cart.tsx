import React from 'react';
import styles from "./Cart.module.scss";
import { useSelector, useDispatch } from 'react-redux'
import { removeProductFromCart } from '../../utils/cartSlice'

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  images: string[];
}

interface CartProps {
  totalPrice: number;
}

const Cart: React.FC<CartProps> = ({ totalPrice }) => {
  const dispatch = useDispatch()

  // @ts-ignore
  const getChosenProduct = useSelector(state => state.cart.productsInCart)

  const onClickRemoveFromCart = (productId: number) => {
    dispatch(removeProductFromCart(productId));
  }
  
  return (
    <div className={styles['cart-container']}>
      <div className={styles['products-container']}>
        {getChosenProduct && getChosenProduct.map((product: Product) => (
          <div className={styles["product"]} key={product.id}>
            <img className={styles["product__image"]} src={product.images[0]} alt={product.title} />
            <div className={styles["product__price"]}>
              <div>{product.title}</div>
              $ {product.price} x {product.quantity} units
            </div>
            <button
              aria-label="Remove from Cart"
              onClick={() => onClickRemoveFromCart(product.id)}
              className={styles["product__button--add-to-cart"]}
              >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className={styles["total-price"]}>
        {totalPrice === 0 ? 'Your cart is empty' : `Total Price: $${totalPrice}`}
      </div>
    </div>
  );
};

export default Cart;