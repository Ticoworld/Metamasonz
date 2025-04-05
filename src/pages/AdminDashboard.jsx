import { useEffect, useState } from "react";
import { Search, Trash2, Eye, RefreshCw, User } from "lucide-react"; // Added User import
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  // Fetch submissions using credentials so cookies are sent automatically
  const fetchSubmissions = async (searchQuery = "") => {
    try {
      const url = searchQuery
        ? `/api/v1/submissions/search?q=${encodeURIComponent(searchQuery)}`
        : "/api/v1/submissions";

      const res = await fetch(import.meta.env.VITE_API_URL + url, {
        credentials: "include",
      });

      if (res.status === 401) navigate("/login");
      const data = await res.json();

      if (data.success) {
        // Fix search results handling
        setSubmissions(data.data || []);
      } else {
        throw new Error(data.message || "Failed to fetch submissions");
      }
    } catch (err) {
      toast.error(err.message);
      setSubmissions([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleStatusUpdate = async (submissionId, newStatus, e) => {
    e.stopPropagation();
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/submissions/${submissionId}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        toast.success("Status updated");
        setSubmissions(
          submissions.map((sub) => (sub._id === submissionId ? data.data : sub))
        );
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Change the handleRowClick function
  const handleRowClick = (submissionId, e) => {
    if (e.target.closest("button, select")) return;
    navigate(`/admin/submissions/${submissionId}`); // Add /admin prefix
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      fetchSubmissions();
      return;
    }
    fetchSubmissions(searchTerm);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setSearchTerm("");
    fetchSubmissions();
  };

  const handleView = (submissionId) => {
    navigate(`/admin/submissions/${submissionId}`); // Add /admin prefix
  };

  const handleDelete = async (submissionId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/submissions/${submissionId}`,
        {
          method: "DELETE",
          credentials: "include", // Include cookies
        }
      );

      if (res.ok) {
        toast.success("Submission deleted");
        fetchSubmissions();
      } else {
        throw new Error("Failed to delete submission");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex gap-4 items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by code, name, or contact..."
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white shadow-sm border focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" />
          </div>
          <button
            onClick={handleSearch}
            className="bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Search
          </button>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-3 text-gray-500 hover:text-cyan-600 transition-colors"
          >
            <RefreshCw
              className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`}
            />
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">
            Loading submissions...
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center text-gray-500">
            {searchTerm
              ? "No matching submissions found"
              : "No submissions available"}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left">Code</th>
                  <th className="px-6 py-4 text-left">Project Name</th>
                  <th className="px-6 py-4 text-left">Contact</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Submitted</th>
                  <th className="px-6 py-4 text-left">Approved By</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {submissions.map((sub) => (
                  <tr
                    key={sub._id}
                    onClick={(e) => handleRowClick(sub._id, e)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 font-mono">
                      {sub.submissionCode}
                    </td>
                    <td className="px-6 py-4">{sub.projectName}</td>
                    <td className="px-6 py-4">
                      {sub.email ? (
                        <a
                          href={`mailto:${sub.email}`}
                          className="text-cyan-500 hover:underline"
                        >
                          {sub.email}
                        </a>
                      ) : (
                        <span>{sub.socials?.founderTg || "N/A"}</span>
                      )}
                    </td>
                    <td
                      className="px-6 py-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={sub.status || "pending"}
                        onChange={(e) =>
                          handleStatusUpdate(sub._id, e.target.value, e)
                        }
                        className={`px-2 py-1 rounded-full text-sm ${
                          sub.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : sub.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                        disabled={sub.statusLocked}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(sub.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {sub.approvedBy ? (
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{sub.approvedBy.name}</span>
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td
                      className="px-6 py-4 flex gap-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleView(sub._id)}
                        className="text-cyan-500 hover:text-cyan-600"
                        title="View details"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(sub._id)}
                        className="text-red-500 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
