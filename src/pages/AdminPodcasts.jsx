import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import {
  createSeries,
  deletePodcast,
  deleteSeries,
  fetchPodcasts,
  fetchSeries,
  updatePodcast,
  updateSeries,
} from '../lib/api';

const AdminPodcasts = () => {
  const [activeTab, setActiveTab] = useState('podcasts');
  const [podcasts, setPodcasts] = useState([]);
  const [series, setSeries] = useState([]);
  const [newSeries, setNewSeries] = useState({ title: '', description: '' });
  const [selectedSeriesId, setSelectedSeriesId] = useState(null);
  const [editingSeriesId, setEditingSeriesId] = useState(null);
  const [editSeriesForm, setEditSeriesForm] = useState({ title: '', description: '' });
  const [error, setError] = useState('');
  const [isSavingSeries, setIsSavingSeries] = useState(false);

  const loadPodcasts = async () => {
    try {
      const [podcastItems, seriesItems] = await Promise.all([fetchPodcasts(), fetchSeries()]);
      setPodcasts(podcastItems);
      setSeries(seriesItems);
      if (!selectedSeriesId && seriesItems.length > 0) {
        setSelectedSeriesId(seriesItems[0].id);
      } else if (selectedSeriesId && !seriesItems.some((item) => item.id === selectedSeriesId)) {
        setSelectedSeriesId(seriesItems[0]?.id ?? null);
      }
      setError('');
    } catch (_error) {
      setError('Unable to load podcasts.');
    }
  };

  const handleDeleteSeries = async (seriesId) => {
    const confirmed = window.confirm('Delete this series? Podcasts will remain and be ungrouped.');
    if (!confirmed) return;
    try {
      await deleteSeries(seriesId);
      if (selectedSeriesId === seriesId) {
        setSelectedSeriesId(null);
      }
      await loadPodcasts();
    } catch (deleteError) {
      setError(deleteError.message || 'Unable to delete series.');
    }
  };

  const handleCreateSeries = async (event) => {
    event.preventDefault();
    setIsSavingSeries(true);
    setError('');
    try {
      await createSeries({
        title: newSeries.title.trim(),
        description: newSeries.description.trim(),
      });
      setNewSeries({ title: '', description: '' });
      await loadPodcasts();
    } catch (seriesError) {
      setError(seriesError.message || 'Unable to create series.');
    } finally {
      setIsSavingSeries(false);
    }
  };

  useEffect(() => {
    loadPodcasts();
  }, []);

  const handleDelete = async (podcastId) => {
    const confirmed = window.confirm('Delete this podcast permanently?');
    if (!confirmed) return;
    try {
      await deletePodcast(podcastId);
      await loadPodcasts();
    } catch (deleteError) {
      setError(deleteError.message || 'Unable to delete podcast.');
    }
  };

  const handleStartEditSeries = (item) => {
    setEditingSeriesId(item.id);
    setEditSeriesForm({
      title: item.title,
      description: item.description,
    });
  };

  const handleSaveSeriesEdit = async () => {
    if (!editingSeriesId) return;
    try {
      await updateSeries(editingSeriesId, {
        title: editSeriesForm.title.trim(),
        description: editSeriesForm.description.trim(),
      });
      setEditingSeriesId(null);
      await loadPodcasts();
    } catch (seriesError) {
      setError(seriesError.message || 'Unable to update series.');
    }
  };

  const handleMovePodcastSeries = async (podcastId, nextSeriesId) => {
    try {
      await updatePodcast(podcastId, {
        seriesId: nextSeriesId ? Number(nextSeriesId) : null,
      });
      await loadPodcasts();
    } catch (updateError) {
      setError(updateError.message || 'Unable to update podcast series.');
    }
  };

  const selectedSeries = series.find((item) => item.id === selectedSeriesId) ?? null;
  const selectedSeriesPodcasts = podcasts.filter((item) => item.series?.id === selectedSeriesId);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2>Podcasts</h2>
        <Button to="/admin/podcasts/new" variant="primary">
          + New Podcast
        </Button>
      </div>
      <div className="admin-tab-row mb-6">
        <button
          type="button"
          className={`admin-tab-btn ${activeTab === 'podcasts' ? 'active' : ''}`}
          onClick={() => setActiveTab('podcasts')}
        >
          Podcasts
        </button>
        <button
          type="button"
          className={`admin-tab-btn ${activeTab === 'series' ? 'active' : ''}`}
          onClick={() => setActiveTab('series')}
        >
          Series
        </button>
      </div>
      {error && <p className="text-muted mb-4">{error}</p>}
      {activeTab === 'podcasts' ? (
        <div className="glass-card admin-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Series</th>
                <th>Speaker</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {podcasts.map((podcast) => (
                <tr key={podcast.id}>
                  <td>{podcast.title}</td>
                  <td>{new Date(podcast.date).toLocaleDateString()}</td>
                  <td>{podcast.series?.title ?? 'No series'}</td>
                  <td>{podcast.speaker}</td>
                  <td>
                    <div className="admin-actions">
                      <Link to={`/admin/podcasts/${podcast.id}/edit`}>Edit</Link>
                      <button type="button" onClick={() => handleDelete(podcast.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="admin-subsection">
          <form className="admin-inline-form glass-card admin-card" onSubmit={handleCreateSeries}>
            <div className="form-group">
              <label htmlFor="seriesTitle">Series Title</label>
              <input
                id="seriesTitle"
                type="text"
                value={newSeries.title}
                onChange={(event) => setNewSeries((prev) => ({ ...prev, title: event.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="seriesDescription">Series Description</label>
              <textarea
                id="seriesDescription"
                rows={3}
                value={newSeries.description}
                onChange={(event) => setNewSeries((prev) => ({ ...prev, description: event.target.value }))}
                required
              />
            </div>
            <Button type="submit" variant="primary" loading={isSavingSeries}>
              Create Series
            </Button>
          </form>

          <div className="glass-card admin-card">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Series</th>
                  <th>Podcasts</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {series.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <button type="button" onClick={() => setSelectedSeriesId(item.id)}>
                        {item.title}
                      </button>
                    </td>
                    <td>{item._count?.podcasts ?? 0}</td>
                    <td>{item.description}</td>
                    <td>
                      <div className="admin-actions">
                        <button type="button" onClick={() => handleStartEditSeries(item)}>Edit</button>
                        <button type="button" onClick={() => handleDeleteSeries(item.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editingSeriesId && (
            <div className="glass-card admin-card admin-subsection">
              <h3>Edit Series</h3>
              <div className="form-group">
                <label htmlFor="editSeriesTitle">Title</label>
                <input
                  id="editSeriesTitle"
                  type="text"
                  value={editSeriesForm.title}
                  onChange={(event) => setEditSeriesForm((prev) => ({ ...prev, title: event.target.value }))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editSeriesDescription">Description</label>
                <textarea
                  id="editSeriesDescription"
                  rows={4}
                  value={editSeriesForm.description}
                  onChange={(event) => setEditSeriesForm((prev) => ({ ...prev, description: event.target.value }))}
                />
              </div>
              <div className="admin-actions">
                <Button type="button" variant="primary" onClick={handleSaveSeriesEdit}>Save</Button>
                <Button type="button" variant="ghost" onClick={() => setEditingSeriesId(null)}>Cancel</Button>
              </div>
            </div>
          )}

          <div className="glass-card admin-card admin-subsection">
            <h3>
              {selectedSeries ? `Podcasts in "${selectedSeries.title}"` : 'Select a series to manage podcasts'}
            </h3>
            {selectedSeries ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Speaker</th>
                    <th>Move / Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSeriesPodcasts.map((podcast) => (
                    <tr key={podcast.id}>
                      <td>{podcast.title}</td>
                      <td>{new Date(podcast.date).toLocaleDateString()}</td>
                      <td>{podcast.speaker}</td>
                      <td>
                        <select
                          value={podcast.series?.id ?? ''}
                          onChange={(event) => handleMovePodcastSeries(podcast.id, event.target.value)}
                        >
                          <option value="">No series</option>
                          {series.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                  {selectedSeriesPodcasts.length === 0 && (
                    <tr>
                      <td colSpan={4}>No podcasts in this series yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <p className="text-muted">Choose a series above to view and manage its podcasts.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPodcasts;
