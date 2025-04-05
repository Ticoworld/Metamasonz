import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const InviteCodeManager = () => {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    role: 'moderator'
  });

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        setFetching(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/invite/invites`, {
          credentials: 'include'
        });
        const data = await res.json();
        if (data.success) setCodes(data.data);
      } catch (error) {
        toast.error('Failed to load invites');
      } finally {
        setFetching(false);
      }
    };
    
    fetchInvites();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateInviteCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!formData.email || !formData.role) {
      toast.error('Please fill all fields');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/invite/invites/generate`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          role: formData.role
        })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to generate code');
      }

      setCodes([data.data, ...codes]);
      toast.success('Invite code generated successfully');
      setFormData({ email: '', role: 'moderator' });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const revokeInvite = async (inviteId) => {
    if (!window.confirm('Are you sure you want to revoke this invite?')) return;
    
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/invite/invites/${inviteId}/revoke`, {
        method: 'POST',
        credentials: 'include'
      });
      
      if (!res.ok) {
        throw new Error('Failed to revoke invite');
      }

      setCodes(codes.filter(code => code._id !== inviteId));
      toast.success('Invite revoked successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // New function to handle resending an invite
  const resendInvite = async (inviteId) => {
    if (!window.confirm('Are you sure you want to resend this invite?')) return;
    
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/invite/invites/resend/${inviteId}`, {
        method: 'POST',
        credentials: 'include'
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to resend invite');
      }

      // Update the invite in the codes list with the new data
      setCodes(codes.map(code => code._id === inviteId ? data.data : code));
      toast.success('Invite resent successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatExpiration = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Generate New Invite</h2>
            <form onSubmit={generateInviteCode} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  name="email"
                  placeholder="Recipient email"
                  className="w-full p-2 border rounded-lg"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex-1">
                <select
                  name="role"
                  className="w-full p-2 border rounded-lg"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : 'Generate Code'}
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Active Invite Codes</h3>
            
            {fetching ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
              </div>
            ) : (
              <>
                {codes.map((code) => (
                  <div key={code._id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <div className="font-mono bg-gray-200 px-2 py-1 rounded mb-2 text-sm">
                          {code.code}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          <p>
                            <span className="font-medium">For:</span> {code.email} ({code.role})
                          </p>
                          <p>
                            <span className="font-medium">Invited by:</span> {code.createdBy?.name || 'System'} ({code.createdBy?.email || 'system'})
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-sm text-gray-600 text-right">
                          <p>Expires: {formatExpiration(code.expiresAt)}</p>
                          <p>Created: {new Date(code.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                          {code.status === 'sent' && (
                            <>
                              <button
                                onClick={() => resendInvite(code._id)}
                                disabled={loading}
                                className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-200 disabled:opacity-50"
                              >
                                Resend
                              </button>
                              <button
                                onClick={() => revokeInvite(code._id)}
                                disabled={loading}
                                className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 disabled:opacity-50"
                              >
                                Revoke
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {codes.length === 0 && !fetching && (
                  <div className="text-center text-gray-500 py-8">
                    No active invite codes
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteCodeManager;
