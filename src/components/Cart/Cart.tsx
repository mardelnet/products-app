import React from 'react';
import styles from "./Cart.module.scss";
import { useSelector, useDispatch } from 'react-redux';
import { removeProductFromCart } from '../../utils/cartSlice';
import { isURL } from '../../utils/functions';

/**
 * Interface for representing a product in the cart.
 */
interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

/**
 * Interface for the props of the Cart component.
 */
interface CartProps {
  /**
   * The total price of all products in the cart.
   */
  totalPrice: number;
}

/**
 * A functional component representing the cart.
 * Displays a list of products in the cart along with their details and provides an option to remove them.
 * Also shows the total price of all products in the cart.
 */
const Cart: React.FC<CartProps> = ({ totalPrice }) => {
  const dispatch = useDispatch();

  // Get the products from the Redux store
  // @ts-ignore
  const getChosenProduct = useSelector(state => state.cart.productsInCart);

  /**
   * Handler function to remove a product from the cart.
   * Dispatches an action to remove the product from the Redux store.
   * @param productId The ID of the product to be removed.
   */
  const onClickRemoveFromCart = (productId: number) => {
    dispatch(removeProductFromCart(productId));
  }
  
  return (
    <div className={styles['cart-container']}>
      <div className={styles['products-container']}>
        {getChosenProduct && getChosenProduct.map((product: Product) => (
          <div className={styles["product"]} data-testid="product" key={product.id}>
            <img 
                className={styles["product__image"]} 
                src={isURL(product.image) ? product.image : 'placeholder.png'} 
                alt={product.title} />
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
