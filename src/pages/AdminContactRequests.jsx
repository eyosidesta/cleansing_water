import { useEffect, useState } from 'react';
import {
  fetchContactRequests,
  updateContactRequestStatus,
} from '../lib/api';

const STATUS_OPTIONS = ['NEW', 'IN_REVIEW', 'FOLLOW_UP', 'ACCEPTED', 'DECLINED'];

const AdminContactRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const loadRequests = async () => {
    try {
      const items = await fetchContactRequests();
      setRequests(items);
      setError('');
    } catch (_error) {
      setError('Unable to load contact requests.');
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleStatusChange = async (requestId, status) => {
    setSavingId(requestId);
    try {
      await updateContactRequestStatus(requestId, { status });
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
        <h2>Contact Requests</h2>
      </div>
      {error && <p className="text-muted mb-4">{error}</p>}
      <div className="glass-card admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.name}</td>
                <td>{request.email}</td>
                <td>{request.subject}</td>
                <td>{new Date(request.createdAt).toLocaleDateString()}</td>
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
              <h3>Contact Request Details</h3>
              <button type="button" onClick={() => setSelectedRequest(null)} aria-label="Close modal">×</button>
            </div>
            <div className="admin-modal-body">
              <p><strong>Name:</strong> {selectedRequest.name}</p>
              <p><strong>Email:</strong> {selectedRequest.email}</p>
              <p><strong>Subject:</strong> {selectedRequest.subject}</p>
              <p><strong>Date:</strong> {new Date(selectedRequest.createdAt).toLocaleString()}</p>
              <p><strong>Message:</strong></p>
              <p className="admin-detail-pre">{selectedRequest.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactRequests;
