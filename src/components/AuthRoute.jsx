// components/AuthRoute.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/verify`, {
          method: 'GET',
          credentials: 'include'
        });

        if (!res.ok) {
          throw new Error('Not authenticated');
        }
      } catch (err) {
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  return children;
};

export default AuthRoute;