import { useEffect, useState } from 'react';
import {
  fetchSpeakerRequests,
  updateSpeakerRequestStatus,
} from '../lib/api';
import Button from '../components/ui/Button';

const STATUS_OPTIONS = ['NEW', 'IN_REVIEW', 'FOLLOW_UP', 'ACCEPTED', 'DECLINED'];

const AdminSpeakerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const loadRequests = async () => {
    try {
      const items = await fetchSpeakerRequests();
      setRequests(items);
      setError('');
    } catch (_error) {
      setError('Unable to load speaker requests.');
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleStatusChange = async (requestId, status) => {
    setSavingId(requestId);
    try {
      await updateSpeakerRequestStatus(requestId, { status });
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
        <h2>Speaker Requests</h2>
      </div>
      {error && <p className="text-muted mb-4">{error}</p>}
      <div className="glass-card admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Contact</th>
              <th>Organization</th>
              <th>Event Date</th>
              <th>Location</th>
              <th>Duration</th>
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
                <td>{new Date(request.eventDate).toLocaleDateString()}</td>
                <td>{request.locationCity}, {request.locationCountry}</td>
                <td>{request.speakingDuration}</td>
                <td>
                  <select
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
                  <Button type="button" variant="ghost" onClick={() => setSelectedRequest(request)}>
                    View
                  </Button>
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
              <h3>Speaker Request Details</h3>
              <button type="button" onClick={() => setSelectedRequest(null)}>Close</button>
            </div>
            <div className="admin-modal-body">
              <p><strong>Organization:</strong> {selectedRequest.organizationName}</p>
              <p><strong>Website:</strong> {selectedRequest.organizationWebsite || 'Not provided'}</p>
              <p><strong>Name:</strong> {selectedRequest.firstName} {selectedRequest.lastName}</p>
              <p><strong>Email:</strong> {selectedRequest.email}</p>
              <p><strong>Phone:</strong> {selectedRequest.phone}</p>
              <p><strong>Event Date:</strong> {new Date(selectedRequest.eventDate).toLocaleDateString()}</p>
              <p><strong>Alternate Date:</strong> {selectedRequest.alternateDate ? new Date(selectedRequest.alternateDate).toLocaleDateString() : 'Not provided'}</p>
              <p><strong>Venue:</strong> {selectedRequest.venueName}</p>
              <p>
                <strong>Address:</strong> {selectedRequest.locationAddress}, {selectedRequest.locationCity}, {selectedRequest.locationState}, {selectedRequest.locationPostalCode}, {selectedRequest.locationCountry}
              </p>
              <p><strong>Requested Duration:</strong> {selectedRequest.speakingDuration}</p>
              <p><strong>Primary Topic:</strong> {selectedRequest.primaryTopic || 'Not provided'}</p>
              <p><strong>Event Description:</strong> {selectedRequest.eventDescription}</p>
              <p><strong>Additional Information:</strong> {selectedRequest.additionalInformation || 'Not provided'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSpeakerRequests;
