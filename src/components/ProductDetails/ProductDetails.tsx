import React, { useEffect, useState } from 'react';
import styles from './ProductDetails.module.scss';
import { useDispatch, useSelector } from 'react-redux'
import { showSelectedProduct } from '../../utils/selectedProductSlice'
import { PRODUCTS_ENDPOINT } from '../../utils/constants';

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
 * Represents the props for the ProductDetails component.
 */
interface ProductsProps {
  category: number | null;
}

/**
 * A component to display the details of a product.
 * @param category The category of the product.
 */
const ProductDetails: React.FC<ProductsProps> = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch()

  // Get the chosen product ID from the Redux store
  // @ts-ignore
  const selectedProductId = useSelector(state => state.chosenProduct.selectedProductId)

  useEffect(() => {
    /**
     * Fetches the product details from the API.
     */
    const fetchData = async () => {
      try {
        const response = await fetch(`${PRODUCTS_ENDPOINT}/${selectedProductId}`);
        const jsonData: Product = await response.json();
        setProduct(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [selectedProductId]);
  
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        product && (
          <div className={styles["products-container"]}>
            <div className={styles["product"]}>
              <div className={styles["product__column"]}>
                <button 
                  onClick={() => dispatch(showSelectedProduct(false))}
                  className={styles["product__close"]}>
                    x
                </button>
                <img className={styles["product__image"]} src={product.images[0]} alt={product.title} />
              </div>
              <div className={styles["product__column"]}>
                <h4 className={styles["product__title"]}>{product.title}</h4>
                <div className={styles["product__description"]}>{product.description}</div>
                <div className={styles["product__price"]}>$ {product.price}</div>
                <div className={styles["product__category"]}>{product.category.name}</div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProductDetails;
