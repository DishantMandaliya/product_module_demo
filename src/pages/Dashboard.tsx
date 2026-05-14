import { Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Product, Stats } from '../types';
import { formatCurrency } from '../utils/validation';

const Dashboard = () => {
  const [products] = useLocalStorage<Product[]>('products', []);

  const stats: Stats = {
    totalProducts: products.length,
    totalStock: products.reduce((sum, p) => {
      const stock = Number(p.stockQuantity) || 0;
      return sum + stock;
    }, 0),
    totalValue: products.reduce((sum, p) => {
      const value = (Number(p.stockQuantity) || 0) * (Number(p.unitPrice) || 0);
      return sum + value;
    }, 0),
    activeProducts: products.filter(p => p.status === 'Active').length,
  };

  // Category breakdown
  const categoryCount = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statCards = [
    { title: 'Total Products', value: stats.totalProducts, icon: '📦', color: 'bg-blue-500', bgColor: 'bg-blue-50' },
    { title: 'Total Stock', value: stats.totalStock, icon: '📊', color: 'bg-green-500', bgColor: 'bg-green-50' },
    { title: 'Inventory Value', value: formatCurrency(stats.totalValue), icon: '💰', color: 'bg-purple-500', bgColor: 'bg-purple-50' },
    { title: 'Active Products', value: stats.activeProducts, icon: '✅', color: 'bg-yellow-500', bgColor: 'bg-yellow-50' },
  ];

  const recentProducts: Product[] = [...products].slice(-5).reverse();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} text-white p-3 rounded-full text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Products</h2>
            <Link to="/products" className="text-blue-600 hover:text-blue-800">
              View All →
            </Link>
          </div>

          {recentProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No products added yet</p>
          ) : (
            <div className="space-y-3">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="font-medium">{product.productName}</p>
                    <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(product.unitPrice)}</p>
                    <p className="text-sm text-gray-500">Stock: {product.stockQuantity}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Category Breakdown</h2>
          <div className="space-y-3">
            {Object.entries(categoryCount).map(([category, count]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-gray-700">{category}</span>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">{count} products</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 rounded-full h-2"
                      style={{ width: `${(count / stats.totalProducts) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {products.some(p => p.stockQuantity > 0 && p.stockQuantity < 20) && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <span className="font-medium">Low Stock Alert:</span> Some products are running low on stock!
                <Link to="/products" className="ml-2 underline">Check inventory</Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;