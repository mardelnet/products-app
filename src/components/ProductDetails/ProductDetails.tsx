import React, { useEffect, useState } from 'react';
import styles from './ProductDetails.module.scss';
import { useDispatch, useSelector } from 'react-redux'
import { saveProductId } from '../../features/counter/counterSlice'

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

interface ProductsProps {
  category: number | null;
}

const ProductDetails: React.FC<ProductsProps> = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch()

  // @ts-ignore
  const showModal = useSelector(state => state.counter.value)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products/15');
        const jsonData: Product = await response.json();
        setProduct(jsonData);
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
        product && showModal && (
          <div className={styles["products-container"]}>
            <div className={styles["product"]}>
              <div className={styles["product__column"]}>
                <button 
                  onClick={() => dispatch(saveProductId(false))}
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