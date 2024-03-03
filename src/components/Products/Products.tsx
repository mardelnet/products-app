import React, { useEffect, useState } from 'react';
import styles from './Products.module.scss';
import { useDispatch } from 'react-redux'
import { showSelectedProduct, getSelectedProduct } from '../../utils/selectedProductSlice'
import { addProductToCart } from '../../utils/cartSlice'
import { isURL } from '../../utils/functions';
import { PRODUCTS_ENDPOINT, CATEGORIES_ENDPOINT } from '../../utils/constants';

/**
 * Represents the details of a product.
 */
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    name: string;
  };
  images: string[];
}

/**
 * Represents the props for the Products component.
 */
interface ProductsProps {
  category: number | null;
}

/**
 * A component to display a list of products.
 * @param category The category of the products to display.
 */
const Products: React.FC<ProductsProps> = ({ category }) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch()

  /**
   * Handles the click event to view details of a product.
   * @param productId The ID of the product.
   */
  const onClickViewDetails = (productId: number) => {
    dispatch(getSelectedProduct(productId))
    dispatch(showSelectedProduct(true))
  }

  /**
   * Handles the click event to add a product to the cart.
   * @param product The product to be added to the cart.
   */
  const onClickAddToCart = (product: Product) => {
    dispatch(addProductToCart(product));
  }

  useEffect(() => {
    /**
     * Fetches the products data from the API.
     */
    const fetchData = async () => {
      try {
        let apiUrl = `${PRODUCTS_ENDPOINT}?offset=0&limit=16`

        if( category ) {
          apiUrl = `${CATEGORIES_ENDPOINT}/${category}/products?offset=0&limit=8`;
        }

        const response = await fetch(apiUrl);
        const jsonData: Product[] = await response.json();
        setProducts(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles["products-container"]}>
          {products && products.map((product) => (
            isURL(product.images[0]) && (
              <div className={styles["product"]} key={product.id}>
                <img className={styles["product__image"]} src={product.images[0]} alt={product.title} />
                <h4 className={styles["product__title"]}>{product.title}</h4>
                <div className={styles["product__price"]}>$ {product.price}</div>
                <div className={styles["product__category"]}>{product.category.name}</div>
                <button
                  aria-label="View details"
                  onClick={() => onClickViewDetails(product.id)}
                  className={styles["product__button--details"]}
                >
                  View details
                </button>
                <button
                  aria-label="Add to Cart"
                  onClick={() => onClickAddToCart(product)}
                  className={styles["product__button--add-to-cart"]}
                >
                  Add to Cart
                </button>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
