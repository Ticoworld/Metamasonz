// src/api/auth.js
export const verifyToken = async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Token verification failed');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Token verification error:', error);
      throw error;
    }
  };
  
  export const logout = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (token) {
        await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } finally {
      localStorage.removeItem('adminToken');
    }
  }; 