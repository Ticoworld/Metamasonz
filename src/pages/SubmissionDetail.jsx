import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { CheckCircle, XCircle, Clock, User } from 'lucide-react';

const SubmissionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/submissions/${id}`,
          { credentials: 'include' }
        );

        if (res.status === 401) navigate('/login');
        const data = await res.json();

        if (data.success) {
          setSubmission(data.data);
          setStatus(data.data.status || 'pending');
        } else {
          throw new Error(data.message || 'Failed to fetch submission');
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [id, navigate]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/submissions/${id}/status`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        }
      );

      if (res.ok) {
        const data = await res.json();
        toast.success('Status updated');
        setStatus(data.data.status);
        setSubmission(data.data);
      } else {
        throw new Error('Failed to update status');
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (!submission) return <div className="text-center p-8">Submission not found</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-cyan-500 hover:text-cyan-600"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold mb-6">{submission.projectName}</h1>

        {/* Status Selector */}
        <div className="mb-8 flex items-center gap-4">
          <span className="font-semibold">Status:</span>
          <select
            value={status}
            onChange={(e) => handleStatusUpdate(e.target.value)}
            className={`px-3 py-1 rounded-full text-sm ${
              status === 'approved' ? 'bg-green-100 text-green-800' :
              status === 'rejected' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}
            disabled={submission.statusLocked}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Project Details */}
        <div className="space-y-6 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600 whitespace-pre-wrap">
              {submission.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <p>Email: {submission.email || 'N/A'}</p>
              <p>Founder TG: {submission.socials?.founderTg || 'N/A'}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Social Links</h3>
              <p>X: {submission.socials?.x || 'N/A'}</p>
              <p>Telegram: {submission.socials?.telegram || 'N/A'}</p>
              <p>Discord: {submission.socials?.discord || 'N/A'}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Submission Details</h3>
            <p>Code: {submission.submissionCode}</p>
            <p>Submitted: {new Date(submission.submittedAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Approval History */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Approval History</h2>
          <div className="space-y-3">
            {submission.statusHistory?.map((entry, index) => (
              <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {entry.status === 'approved' ? (
                    <CheckCircle className="text-green-500 h-6 w-6" />
                  ) : entry.status === 'rejected' ? (
                    <XCircle className="text-red-500 h-6 w-6" />
                  ) : (
                    <Clock className="text-yellow-500 h-6 w-6" />
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {entry.changedBy?.name || 'System Action'}
                        <span className="ml-2 text-sm text-gray-500">
                          ({entry.changedBy?.role || 'system'})
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Changed status to {entry.status}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(entry.changedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Approver/Rejector Info */}
        {submission.approvedBy && (
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <div className="flex items-center">
              <User className="h-5 w-5 text-green-600 mr-2" />
              <span className="font-medium">
                Approved by: {submission.approvedBy.name} ({submission.approvedBy.role})
              </span>
            </div>
          </div>
        )}

        {submission.rejectedBy && (
          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <div className="flex items-center">
              <User className="h-5 w-5 text-red-600 mr-2" />
              <span className="font-medium">
                Rejected by: {submission.rejectedBy.name} ({submission.rejectedBy.role})
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionDetail;