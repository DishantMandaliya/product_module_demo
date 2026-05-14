import { useParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Product, ProductFormData } from '../types';
import ProductForm from '../components/products/ProductForm';

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useLocalStorage<Product[]>('products', []);

  const product = products.find((p) => p.id === id);

  const handleSubmit = (updatedData: ProductFormData) => {
    const updatedProducts = products.map((p) =>
      p.id === id ? { ...p, ...updatedData, updatedAt: new Date().toISOString() } : p
    );
    setProducts(updatedProducts);
    navigate('/products');
  };

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Product not found</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Product</h1>
      <ProductForm initialData={product} onSubmit={handleSubmit} isEdit={true} />
    </div>
  );
};

export default EditProductPage;