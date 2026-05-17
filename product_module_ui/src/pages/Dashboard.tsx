import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dashboardAPI } from '../lib/api';
import type { DashboardStatistics, RecentProduct, CategoryWiseData } from '../types';

const Dashboard = () => {
    const [products] = useState<any[]>([]);
    const [statistics, setStatistics] = useState<DashboardStatistics>({
        totalproducts: 0,
        totalstock: 0,
        inventoryvalue: 0,
        activeproducts: 0
    });
    const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([]);
    const [categoryData, setCategoryData] = useState<CategoryWiseData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Format currency
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    // Fetch all dashboard data from APIs
    const fetchDashboardData = async () => {
        setLoading(true);
        
        try {
            // Fetch all three endpoints in parallel
            const [statsResponse, recentResponse, categoryResponse] = await Promise.all([
                dashboardAPI.getAllStatistics(),
                dashboardAPI.getRecentProducts(),
                dashboardAPI.getCategoryWiseData()
            ]);

            // Process Statistics
            if (statsResponse.success && statsResponse.data) {
                console.log("statsResponse:- ",statsResponse.data);
                setStatistics(statsResponse.data);
            }

            // Process Recent Products
            if (recentResponse.success && recentResponse.data) {
                setRecentProducts(recentResponse.data);
            }

            // Process Category Wise Data
            if (categoryResponse.success && categoryResponse.data) {
                console.log("category data :- ", categoryResponse.data);
                setCategoryData(categoryResponse.data);
            }

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Stats for cards - using API data
    const stats = {
        totalProducts: statistics.totalproducts,
        totalStock: statistics.totalstock,
        totalValue: statistics.inventoryvalue,
        activeProducts: statistics.activeproducts,
    };

    const statCards = [
        { title: 'Total Products', value: stats.totalProducts, icon: '📦', color: 'bg-blue-500', bgColor: 'bg-blue-50' },
        { title: 'Total Stock', value: stats.totalStock, icon: '📊', color: 'bg-green-500', bgColor: 'bg-green-50' },
        { title: 'Inventory Value', value: formatCurrency(stats.totalValue), icon: '💰', color: 'bg-purple-500', bgColor: 'bg-purple-50' },
        { title: 'Active Products', value: stats.activeProducts, icon: '✅', color: 'bg-yellow-500', bgColor: 'bg-yellow-50' },
    ];

    // Use recent products from API
    const displayRecentProducts = recentProducts.length > 0 ? recentProducts : products.slice(-5).reverse();

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600">Loading dashboard data...</p>
                    </div>
                </div>
            ) : (
                <>
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

                            {displayRecentProducts.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No products added yet</p>
                            ) : (
                                <div className="space-y-3">
                                    {displayRecentProducts.map((product) => (
                                        <div
                                            key={product.productid || product.id}
                                            className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div>
                                                <p className="font-medium">{product.product_name || product.productName}</p>
                                                <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">{formatCurrency(product.unit_price || product.unitPrice)}</p>
                                                <p className="text-sm text-gray-500">Stock: {product.stock_quantity || product.stockQuantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Category Breakdown */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold mb-4">Category Breakdown</h2>
                            {categoryData.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No category data available</p>
                            ) : (
                                <div className="space-y-3">
                                    {categoryData.map((item) => (
                                        <div key={item.category} className="flex justify-between items-center">
                                            <span className="text-gray-700">{item.category_name}</span>
                                            <div className="flex items-center space-x-3">
                                                <span className="text-sm text-gray-500">{item.product_count} products</span>
                                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-600 rounded-full h-2"
                                                        style={{ width: `${(item.product_count / stats.totalProducts) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </>
            )}
        </div>
    );
};

export default Dashboard;