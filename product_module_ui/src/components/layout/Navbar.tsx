import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            ERP System
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/' ? 'bg-gray-800' : 'hover:bg-gray-700'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/products"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname.includes('/products') ? 'bg-gray-800' : 'hover:bg-gray-700'
              }`}
            >
              Products
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;