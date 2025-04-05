import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include' // Necessary for cookies
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Navigate to login and force full page reload
      window.location.href = '/login';
      
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/admin" className="text-cyan-600 font-bold text-xl">
              Admin Panel
            </Link>
            <nav className="flex space-x-4">
              <Link
                to="/admin"
                className="text-gray-600 hover:text-cyan-600 px-3 py-2 rounded-md"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/invites"
                className="text-gray-600 hover:text-cyan-600 px-3 py-2 rounded-md"
              >
                Invites
              </Link>
              <Link
                to="/admin/users"
                className="text-gray-600 hover:text-cyan-600 px-3 py-2 rounded-md"
              >
                Users
              </Link>
            </nav>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:text-red-700 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;