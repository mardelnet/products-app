import React, { useState, useEffect } from 'react';
import Products from '../components/Products/Products';

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

const Home: React.FC = () => {
  const [data, setData] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=16');
        const jsonData: Product[] = await response.json();
        setData(jsonData);
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
        <Products products={data}></Products>
      )}
    </div>
  );
};

export default Home;