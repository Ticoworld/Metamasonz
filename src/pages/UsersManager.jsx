import { useEffect, useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UsersManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState({
    users: true,
    currentUser: true,
    actions: {} // Track loading state for individual actions
  });
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_URL + "/api/v1/auth/me",
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data.success) setCurrentUser(data.data);
      } catch (err) {
        toast.error("Failed to fetch current user");
      } finally {
        setLoading(prev => ({...prev, currentUser: false}));
      }
    };
    fetchCurrentUser();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(prev => ({...prev, users: true}));
      const res = await fetch(import.meta.env.VITE_API_URL + "/api/v1/users", {
        credentials: "include",
      });

      if (res.status === 401) navigate("/login");
      const data = await res.json();

      if (data.success) setUsers(data.data);
      else throw new Error(data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(prev => ({...prev, users: false}));
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      setLoading(prev => ({
        ...prev,
        actions: {...prev.actions, [userId]: 'delete'}
      }));

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/users/${userId}`,
        { method: "DELETE", credentials: "include" }
      );

      if (res.ok) {
        toast.success("User deleted");
        setUsers(users.filter((u) => u._id !== userId));
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(prev => ({
        ...prev,
        actions: {...prev.actions, [userId]: null}
      }));
    }
  };

  const handlePromote = async (userId, newRole) => {
    try {
      setLoading(prev => ({
        ...prev,
        actions: {...prev.actions, [userId]: 'promote'}
      }));

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/users/${userId}/role`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (res.ok) {
        toast.success("Role updated");
        setUsers(
          users.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      } else {
        throw new Error("Failed to update role");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(prev => ({
        ...prev,
        actions: {...prev.actions, [userId]: null}
      }));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading.currentUser || loading.users) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-left">Codes Generated</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    {loading.users ? "Loading users..." : "No users found"}
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4 capitalize">
                      {currentUser?.role === "superAdmin" ? (
                        <div className="flex items-center gap-2">
                          {loading.actions[user._id] === 'promote' ? (
                            <Loader2 className="animate-spin h-4 w-4" />
                          ) : (
                            <select
                              value={user.role}
                              onChange={(e) =>
                                handlePromote(user._id, e.target.value)
                              }
                              className="px-2 py-1 rounded border bg-white"
                              disabled={
                                user.isProtected || 
                                user._id === currentUser?._id ||
                                loading.actions[user._id]
                              }
                            >
                              <option value="superAdmin">SuperAdmin</option>
                              <option value="admin">Admin</option>
                              <option value="moderator">Moderator</option>
                            </select>
                          )}
                        </div>
                      ) : (
                        user.role
                      )}
                    </td>
                    <td className="px-6 py-4">{user.codesGenerated || 0}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {loading.actions[user._id] === 'delete' ? (
                          <Loader2 className="animate-spin h-4 w-4" />
                        ) : (
                          <button
                            onClick={() => handleDelete(user._id)}
                            className={`text-red-500 hover:text-red-600 ${
                              user.isProtected ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            title={user.isProtected ? "Protected admin" : "Delete"}
                            disabled={user.isProtected || loading.actions[user._id]}
                          >
                            <Trash2 size={20} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersManager;