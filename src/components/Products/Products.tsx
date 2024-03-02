import React from 'react';
import styles from './Products.module.scss';

interface ProductsProps {
  products: Product[] | null;
}

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

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <div className={styles["products-container"]}>
      {products && products.map((product) => (
        <div className={styles["product"]} key={product.id}>
          <img className={styles["product__image"]} src={product.images[0]} alt={product.title} />
          <h4 className={styles["product__title"]}>{product.title}</h4>
          <div className={styles["product__price"]}>$ {product.price}</div>
          {/* <div className={styles["product__description"]}>{product.description}</div> */}
          <div className={styles["product__category"]}>{product.category.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Products;