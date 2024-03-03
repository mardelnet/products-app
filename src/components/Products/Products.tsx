import React, { useEffect, useState } from 'react';
import styles from './Products.module.scss';
import { useDispatch } from 'react-redux'
import { showSelectedProduct, getSelectedProduct } from '../../utils/selectedProductSlice'
import { addProductToCart } from '../../utils/cartSlice'
import { isURL } from '../../utils/functions';

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

const Products: React.FC<ProductsProps> = ({ category }) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch()

  const onClickViewDetails = (productId: number) => {
    dispatch(getSelectedProduct(productId))
    dispatch(showSelectedProduct(true))
  }

  const onClickAddToCart = (product: Product) => {
    dispatch(addProductToCart(product));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=16'

        if( category ) {
          apiUrl = `https://api.escuelajs.co/api/v1/categories/${category}/products?offset=0&limit=8`;
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