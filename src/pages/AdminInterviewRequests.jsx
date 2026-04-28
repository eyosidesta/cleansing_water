import { useEffect, useState } from 'react';
import {
  fetchInterviewRequests,
  updateInterviewRequestStatus,
} from '../lib/api';

const STATUS_OPTIONS = ['NEW', 'IN_REVIEW', 'FOLLOW_UP', 'ACCEPTED', 'DECLINED'];

const AdminInterviewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const loadRequests = async () => {
    try {
      const items = await fetchInterviewRequests();
      setRequests(items);
      setError('');
    } catch (_error) {
      setError('Unable to load interview requests.');
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleStatusChange = async (requestId, status) => {
    setSavingId(requestId);
    try {
      await updateInterviewRequestStatus(requestId, { status });
      await loadRequests();
    } catch (statusError) {
      setError(statusError.message || 'Unable to update status.');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2>Interview Requests</h2>
      </div>
      {error && <p className="text-muted mb-4">{error}</p>}
      <div className="glass-card admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Contact</th>
              <th>Organization</th>
              <th>Requested Date</th>
              <th>Media Type</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>
                  {request.firstName} {request.lastName}
                  <br />
                  <span className="text-muted">{request.email}</span>
                </td>
                <td>{request.organizationName}</td>
                <td>{new Date(request.requestedDate).toLocaleDateString()}</td>
                <td>{request.mediaType}</td>
                <td>
                  <select
                    className={`admin-status-select ${request.status}`}
                    value={request.status}
                    disabled={savingId === request.id}
                    onChange={(event) => handleStatusChange(request.id, event.target.value)}
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button className="admin-icon-btn" type="button" onClick={() => setSelectedRequest(request)} aria-label="View details">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedRequest && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedRequest(null)}>
          <div className="admin-modal glass-card" onClick={(event) => event.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Interview Request Details</h3>
              <button type="button" onClick={() => setSelectedRequest(null)} aria-label="Close modal">×</button>
            </div>
            <div className="admin-modal-body">
              <p><strong>Organization:</strong> {selectedRequest.organizationName}</p>
              <p><strong>Website:</strong> {selectedRequest.organizationWebsite || 'Not provided'}</p>
              <p><strong>Name:</strong> {selectedRequest.firstName} {selectedRequest.lastName}</p>
              <p><strong>Email:</strong> {selectedRequest.email}</p>
              <p><strong>Phone:</strong> {selectedRequest.phone}</p>
              <p><strong>Interviewer Name:</strong> {selectedRequest.interviewerName}</p>
              <p><strong>Purpose:</strong> {selectedRequest.purpose}</p>
              <p><strong>Duration:</strong> {selectedRequest.duration}</p>
              <p><strong>Media Type:</strong> {selectedRequest.mediaType}</p>
              <p><strong>Interview Type:</strong> {selectedRequest.interviewType}</p>
              <p><strong>Requested Date:</strong> {new Date(selectedRequest.requestedDate).toLocaleDateString()}</p>
              <p><strong>Alternate Date:</strong> {selectedRequest.alternateDate ? new Date(selectedRequest.alternateDate).toLocaleDateString() : 'Not provided'}</p>
              <p><strong>Primary Topic:</strong> {selectedRequest.primaryTopic || 'Not provided'}</p>
              <p><strong>Additional Information:</strong> {selectedRequest.additionalInformation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInterviewRequests;
