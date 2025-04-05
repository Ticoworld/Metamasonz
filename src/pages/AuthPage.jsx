import { useState } from 'react';
import { Lock, Mail, User, Eye, EyeOff, ArrowRight, Key } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    inviteCode: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      inviteCode: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Client-side validation
      const errors = [];
      if (!isLogin) {
        if (formData.password !== formData.confirmPassword) {
          errors.push('Passwords do not match');
        }
        if (!formData.inviteCode) {
          errors.push('Invite code is required');
        }
      }
  
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }
  
      // Prepare request data
      const endpoint = isLogin ? '/login' : '/register';
      const payload = {
        email: formData.email.toLowerCase(),
        password: formData.password,
        ...(!isLogin && {
          name: formData.name.trim(),
          inviteCode: formData.inviteCode
        })
      };
  
      // Send authentication request
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth${endpoint}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        let errorMessage = data.message || 'Authentication failed';
        
        // Handle specific error cases
        if (errorMessage.toLowerCase().includes('password')) {
          errorMessage = 'Incorrect password. Please try again';
        } else if (errorMessage.toLowerCase().includes('email')) {
          errorMessage = 'No account found with this email';
        } else if (errorMessage.toLowerCase().includes('locked')) {
          errorMessage = 'Account temporarily locked. Please try again later';
        }
  
        throw new Error(errorMessage);
      }
  
      // Store token and redirect
      
      if (data.success) {
        toast.success(isLogin 
          ? 'Successfully logged in!'
          : 'Account created successfully!');
        navigate('/admin');
      }
  
      toast.success(isLogin 
        ? 'Successfully logged in!'
        : 'Account created successfully!');
        
      navigate('/admin');
  
    } catch (error) {
      // Handle specific error messages
      const errorMessages = error.message.split(', ');
      errorMessages.forEach(msg => {
        if (msg.includes('password')) {
          toast.error(msg, { icon: '🔒' });
        } else if (msg.includes('email')) {
          toast.error(msg, { icon: '✉️' });
        } else {
          toast.error(msg);
        }
      });
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-10">
              <motion.div
                className={`absolute top-0 w-1/2 h-full bg-cyan-500 rounded-lg ${isLogin ? 'left-0' : 'left-1/2'}`}
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
              <div className="relative flex h-full">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`w-1/2 flex items-center justify-center font-medium ${isLogin ? 'text-white' : 'text-gray-500'}`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`w-1/2 flex items-center justify-center font-medium ${!isLogin ? 'text-white' : 'text-gray-500'}`}
                >
                  Register
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </motion.div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                minLength={8}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            {!isLogin && (
              <>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                    minLength={8}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="inviteCode"
                    value={formData.inviteCode}
                    onChange={handleChange}
                    placeholder="Invite Code (Required)"
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </motion.div>
              </>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${loading ? 'bg-cyan-400' : 'bg-cyan-600 hover:bg-cyan-700'}`}
              >
                {loading ? (
                  'Processing...'
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Register with Invite'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={toggleAuthMode}
              className="text-cyan-600 hover:text-cyan-800 font-medium"
            >
              {isLogin 
                ? "Need an account? Register with invite" 
                : "Already have an account? Login"}
            </button>
          </div>

          {!isLogin && (
            <div className="mt-4 text-sm text-gray-500 text-center">
              <p>Registration requires a valid invite code.</p>
              <p>Contact your administrator to get one.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;