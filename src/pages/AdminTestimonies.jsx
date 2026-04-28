import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { deleteTestimony, fetchTestimonies } from '../lib/api';

const AdminTestimonies = () => {
  const [testimonies, setTestimonies] = useState([]);
  const [error, setError] = useState('');
  const [selectedTestimony, setSelectedTestimony] = useState(null);

  const loadTestimonies = async () => {
    try {
      const items = await fetchTestimonies();
      setTestimonies(items);
      setError('');
    } catch (_error) {
      setError('Unable to load testimonies.');
    }
  };

  useEffect(() => {
    loadTestimonies();
  }, []);

  const handleDelete = async (testimonyId) => {
    const confirmed = window.confirm('Delete this testimony permanently?');
    if (!confirmed) return;
    try {
      await deleteTestimony(testimonyId);
      await loadTestimonies();
    } catch (deleteError) {
      setError(deleteError.message || 'Unable to delete testimony.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2>Testimonies</h2>
        <Button to="/admin/testimonies/new" variant="primary">
          + New Testimony
        </Button>
      </div>
      {error && <p className="text-muted mb-4">{error}</p>}
      <div className="glass-card admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>View</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonies.map((testimony) => (
              <tr key={testimony.id}>
                <td>{testimony.title}</td>
                <td>{testimony.authorName || 'Cleansing Water Ministry'}</td>
                <td>{testimony.date ? new Date(testimony.date).toLocaleDateString() : 'Not set'}</td>
                <td>
                  <button className="admin-icon-btn" type="button" onClick={() => setSelectedTestimony(testimony)} aria-label="View testimony">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </td>
                <td>
                  <div className="admin-actions">
                    <Link to={`/admin/testimonies/${testimony.id}/edit`}>Edit</Link>
                    <button type="button" onClick={() => handleDelete(testimony.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTestimony && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedTestimony(null)}>
          <div className="admin-modal glass-card" onClick={(event) => event.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Testimony Details</h3>
              <button type="button" onClick={() => setSelectedTestimony(null)} aria-label="Close modal">×</button>
            </div>
            <div className="admin-modal-body">
              <p><strong>Title:</strong> {selectedTestimony.title}</p>
              <p><strong>Author:</strong> {selectedTestimony.authorName || 'Cleansing Water Ministry'}</p>
              <p><strong>Date:</strong> {selectedTestimony.date ? new Date(selectedTestimony.date).toLocaleDateString() : 'Not set'}</p>
              <p><strong>Summary:</strong></p>
              <p className="admin-detail-pre">{selectedTestimony.summary}</p>
              <p><strong>Content:</strong></p>
              <p className="admin-detail-pre">{selectedTestimony.contentRaw}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonies;
