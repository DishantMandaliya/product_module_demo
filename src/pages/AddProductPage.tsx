import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Product, ProductFormData } from '../types';
import ProductForm from '../components/products/ProductForm';

const AddProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useLocalStorage<Product[]>('products', []);

  const handleSubmit = (productData: ProductFormData) => {
    const newProduct: Product = {
      id: uuidv4(),
      ...productData,
      createdAt: new Date().toISOString(),
    };
    setProducts([...products, newProduct]);
    navigate('/products');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Product</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddProductPage;