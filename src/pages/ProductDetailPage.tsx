import { useParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Product } from '../types';
import ProductDetails from '../components/products/ProductDetails';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [products] = useLocalStorage<Product[]>('products', []);
  const product = products.find((p) => p.id === id);

  return <ProductDetails product={product || null} />;
};

export default ProductDetailPage;