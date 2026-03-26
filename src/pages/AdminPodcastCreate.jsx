import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import {
  createPodcast,
  createSeries,
  fetchSeries,
  uploadPodcastCoverImage,
} from '../lib/api';
import './FormPage.css';
import './AdminPodcastCreate.css';

const DEFAULT_SPEAKER_NAME = 'Cleansing Water Ministry';
const YOUTUBE_ID_REGEX =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

const extractYoutubeVideoId = (url) => {
  const match = url.match(YOUTUBE_ID_REGEX);
  return match ? match[1] : '';
};

const AdminPodcastCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    youtubeUrl: '',
    coverImageUrl: '',
    title: '',
    description: '',
    publishedAt: '',
    speakerName: '',
    seriesId: '',
  });
  const [seriesList, setSeriesList] = useState([]);
  const [creatingInlineSeries, setCreatingInlineSeries] = useState(false);
  const [seriesFormData, setSeriesFormData] = useState({
    title: '',
    description: '',
  });
  const [isSavingSeries, setIsSavingSeries] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [error, setError] = useState('');

  const youtubeVideoId = useMemo(
    () => extractYoutubeVideoId(formData.youtubeUrl.trim()),
    [formData.youtubeUrl],
  );
  const embedUrl = youtubeVideoId ? `https://www.youtube.com/embed/${youtubeVideoId}` : '';
  const fallbackThumbnailUrl = youtubeVideoId
    ? `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`
    : '';
  const effectiveCoverImage = formData.coverImageUrl.trim() || fallbackThumbnailUrl;

  useEffect(() => {
    let isMounted = true;
    const loadSeries = async () => {
      try {
        const series = await fetchSeries();
        if (isMounted) setSeriesList(series);
      } catch (_error) {
        if (isMounted) setSeriesList([]);
      }
    };

    loadSeries();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSeriesInputChange = (event) => {
    setSeriesFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const resetForm = () => {
    setFormData({
      youtubeUrl: '',
      coverImageUrl: '',
      title: '',
      description: '',
      publishedAt: '',
      speakerName: '',
      seriesId: '',
    });
  };

  const handleUploadImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setError('');
    try {
      const uploaded = await uploadPodcastCoverImage(file);
      setFormData((prev) => ({ ...prev, coverImageUrl: uploaded.url }));
    } catch (uploadError) {
      setError(uploadError.message || 'Unable to upload image.');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleCreateInlineSeries = async () => {
    setIsSavingSeries(true);
    setError('');
    try {
      const created = await createSeries({
        title: seriesFormData.title.trim(),
        description: seriesFormData.description.trim(),
      });
      setSeriesList((prev) => [created, ...prev]);
      setFormData((prev) => ({ ...prev, seriesId: String(created.id) }));
      setSeriesFormData({ title: '', description: '' });
      setCreatingInlineSeries(false);
    } catch (seriesError) {
      setError(seriesError.message || 'Unable to create series.');
    } finally {
      setIsSavingSeries(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSubmitMessage('');

    try {
      const payload = {
        youtubeUrl: formData.youtubeUrl.trim(),
        coverImageUrl: formData.coverImageUrl.trim() || null,
        title: formData.title.trim(),
        description: formData.description.trim(),
        publishedAt: formData.publishedAt,
        speakerName: formData.speakerName.trim() || DEFAULT_SPEAKER_NAME,
        seriesId: formData.seriesId ? Number(formData.seriesId) : null,
      };

      await createPodcast(payload);
      setSubmitMessage('Podcast created successfully.');
      resetForm();
    } catch (submitError) {
      setError(submitError.message || 'Unable to create podcast.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-podcast-grid">
      <div className="form-card glass-card">
        <div className="flex items-center justify-between mb-6">
          <h2>Create Podcast</h2>
          <Button variant="ghost" onClick={() => navigate('/admin/podcasts')}>
            Back to list
          </Button>
        </div>
            {error && (
              <div className="form-note" role="alert">
                {error}
              </div>
            )}
            {submitMessage && <div className="form-note">{submitMessage}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="youtubeUrl">YouTube URL</label>
                <input
                  id="youtubeUrl"
                  name="youtubeUrl"
                  type="url"
                  value={formData.youtubeUrl}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="coverUpload">Cover Image Upload (Optional)</label>
                <input
                  id="coverUpload"
                  name="coverUpload"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleUploadImage}
                />
                {isUploadingImage && <p className="upload-hint">Uploading image...</p>}
                {formData.coverImageUrl && (
                  <p className="upload-hint">Image uploaded successfully.</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="publishedAt">Recording/Publish Date</label>
                  <input
                    id="publishedAt"
                    name="publishedAt"
                    type="date"
                    value={formData.publishedAt}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="speakerName">Speaker Name</label>
                  <input
                    id="speakerName"
                    name="speakerName"
                    type="text"
                    value={formData.speakerName}
                    onChange={handleChange}
                    placeholder={DEFAULT_SPEAKER_NAME}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="seriesId">Series (Optional)</label>
                <select id="seriesId" name="seriesId" value={formData.seriesId} onChange={handleChange}>
                  <option value="">No series</option>
                  {seriesList.map((series) => (
                    <option key={series.id} value={series.id}>
                      {series.title}
                    </option>
                  ))}
                </select>
              </div>

              {!creatingInlineSeries ? (
                <Button type="button" variant="ghost" onClick={() => setCreatingInlineSeries(true)}>
                  + Create New Series Inline
                </Button>
              ) : (
                <div className="inline-series-card">
                  <h4>Create New Series</h4>
                  <div className="form-group">
                    <label htmlFor="seriesTitle">Series Title</label>
                    <input
                      id="seriesTitle"
                      name="title"
                      type="text"
                      value={seriesFormData.title}
                      onChange={handleSeriesInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="seriesDescription">Series Description</label>
                    <textarea
                      id="seriesDescription"
                      name="description"
                      rows={4}
                      value={seriesFormData.description}
                      onChange={handleSeriesInputChange}
                      required
                    />
                  </div>
                  <div className="inline-series-actions">
                    <Button
                      type="button"
                      variant="primary"
                      loading={isSavingSeries}
                      onClick={handleCreateInlineSeries}
                    >
                      Save Series
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setCreatingInlineSeries(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <Button type="submit" variant="primary" size="lg" fullWidth loading={isSubmitting}>
                Create Podcast
              </Button>
            </form>
      </div>

      <div className="glass-card preview-panel">
            <h3>Live Preview</h3>
            <p className="preview-help">
              Paste a YouTube link to confirm the right video appears below.
            </p>
            {embedUrl ? (
              <div className="preview-video">
                <iframe
                  src={embedUrl}
                  title="Podcast video preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="preview-placeholder">No valid YouTube link detected yet.</div>
            )}

            <h4>Cover Image Preview</h4>
            {effectiveCoverImage ? (
              <img className="preview-cover-image" src={effectiveCoverImage} alt="Podcast cover preview" />
            ) : (
              <div className="preview-placeholder">
                Add a valid YouTube URL to generate thumbnail, or provide a cover image URL.
              </div>
            )}
      </div>
    </div>
  );
};

export default AdminPodcastCreate;
