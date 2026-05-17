import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
-
// Request interceptor to add auth token if needed
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.data?.message) {
            console.error('API Error:', error.response.data.message);
        }
        return Promise.reject(error);
    }
);


export const productAPI = {
    getAllProducts: async (limit: number = 20, offset: number = 0, searchValue: string = '') => {
        const response = await api.get('/product/getallproducts', {
            params: { limit, offset, searchvalue: searchValue }
        });
        return response.data;
    },

getProductById: async (productId: string) => {
    const response = await api.get(`/product/getproductsbyproductid/${productId}`);
    return response.data;
},

    // Add product with the exact format your backend expects
    addProduct: async (productData: any) => {
        // Ensure the data format matches your backend
        const formattedData = {
            product_name: productData.product_name,
            sku: productData.sku,
            category: productData.category,      // Should be number (1,2,3,4,5)
            stock_quantity: productData.stock_quantity,
            unit_price: productData.unit_price,
            status: productData.status,          // Should be number (1,2,3)
            Description: productData.Description || productData.description || ''
        };
        const response = await api.post('/product/addproduct', formattedData);
        return response.data;
    },

    deleteProduct: async (productId: string) => {
        const response = await api.delete(`/product/deleteproduct/${productId}`);
        return response.data;
    },

    updateProduct: async (productId: string, productData: any) => {
        const formattedData = {
            product_name: productData.product_name,
            sku: productData.sku,
            category: productData.category,
            stock_quantity: productData.stock_quantity,
            unit_price: productData.unit_price,
            status: productData.status,
            Description: productData.Description || productData.description || ''
        };
        const response = await api.put(`/product/updateproduct/${productId}`, formattedData);
        return response.data;
    },

    getAllCategories: async () => {
        const response = await api.get('/product/getallcategory');
        return response.data;
    },

    testApi: async () => {
        const response = await api.get('/product/testapi');
        return response.data;
    }
};



export const dashboardAPI = {
    // Get all statistics (total products, stock, value, etc.)
    getAllStatistics: async () => {
        const response = await api.get('/dashboard/getallstatistics');
        return response.data;
    },

    getRecentProducts: async () => {
        const response = await api.get('/dashboard/getrecentproducts');
        return response.data;
    },

    getCategoryWiseData: async () => {
        const response = await api.get('/dashboard/getcategorywisedata');
        return response.data;
    }
};

export default api;