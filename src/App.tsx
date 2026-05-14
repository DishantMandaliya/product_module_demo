import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route
              path="/products"
              element={<ProductsPage />}
            />

            <Route
              path="/products/add"
              element={<AddProductPage />}
            />

            <Route
              path="/products/edit/:id"
              element={<EditProductPage />}
            />

            <Route
              path="/products/:id"
              element={<ProductDetailPage />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;