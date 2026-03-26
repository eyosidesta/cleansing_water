import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import { fetchPodcastById, fetchSeries, updatePodcast, uploadPodcastCoverImage } from '../lib/api';
import './FormPage.css';
import './AdminPodcastCreate.css';

const DEFAULT_SPEAKER_NAME = 'Cleansing Water Ministry';
const YOUTUBE_ID_REGEX =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

const extractYoutubeVideoId = (url) => {
  const match = url.match(YOUTUBE_ID_REGEX);
  return match ? match[1] : '';
};

const AdminPodcastEdit = () => {
  const { podcastId } = useParams();
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
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

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
    const load = async () => {
      try {
        const [podcast, series] = await Promise.all([
          fetchPodcastById(podcastId),
          fetchSeries(),
        ]);
        if (!isMounted) return;
        setSeriesList(series);
        setFormData({
          youtubeUrl: podcast.youtubeUrl ?? '',
          coverImageUrl: podcast.coverImageUrl ?? '',
          title: podcast.title ?? '',
          description: podcast.description ?? '',
          publishedAt: podcast.publishedAt ? String(podcast.publishedAt).slice(0, 10) : '',
          speakerName: podcast.speakerName ?? '',
          seriesId: podcast.seriesId ? String(podcast.seriesId) : '',
        });
      } catch (_error) {
        if (isMounted) setError('Unable to load podcast details.');
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [podcastId]);

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSubmitMessage('');
    try {
      await updatePodcast(podcastId, {
        youtubeUrl: formData.youtubeUrl.trim(),
        coverImageUrl: formData.coverImageUrl.trim() || null,
        title: formData.title.trim(),
        description: formData.description.trim(),
        publishedAt: formData.publishedAt,
        speakerName: formData.speakerName.trim() || DEFAULT_SPEAKER_NAME,
        seriesId: formData.seriesId ? Number(formData.seriesId) : null,
      });
      setSubmitMessage('Podcast updated successfully.');
    } catch (submitError) {
      setError(submitError.message || 'Unable to update podcast.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-podcast-grid">
      <div className="form-card glass-card">
        <div className="flex items-center justify-between mb-6">
          <h2>Edit Podcast</h2>
          <Button variant="ghost" onClick={() => navigate('/admin/podcasts')}>
            Back to list
          </Button>
        </div>
        {error && <p className="form-note">{error}</p>}
        {submitMessage && <p className="form-note">{submitMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="youtubeUrl">YouTube URL</label>
            <input id="youtubeUrl" name="youtubeUrl" type="url" value={formData.youtubeUrl} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="coverUpload">Cover Image Upload</label>
            <input id="coverUpload" name="coverUpload" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleUploadImage} />
            {isUploadingImage && <p className="upload-hint">Uploading image...</p>}
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" rows={5} value={formData.description} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="publishedAt">Recording/Publish Date</label>
              <input id="publishedAt" name="publishedAt" type="date" value={formData.publishedAt} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="speakerName">Speaker Name</label>
              <input id="speakerName" name="speakerName" type="text" value={formData.speakerName} onChange={handleChange} placeholder={DEFAULT_SPEAKER_NAME} />
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
          <Button type="submit" variant="primary" size="lg" fullWidth loading={isSubmitting}>
            Save Changes
          </Button>
        </form>
      </div>
      <div className="glass-card preview-panel">
        <h3>Preview</h3>
        {embedUrl ? (
          <div className="preview-video">
            <iframe src={embedUrl} title="Podcast video preview" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        ) : (
          <div className="preview-placeholder">No valid YouTube link detected yet.</div>
        )}
        <h4>Cover Image Preview</h4>
        {effectiveCoverImage ? (
          <img className="preview-cover-image" src={effectiveCoverImage} alt="Podcast cover preview" />
        ) : (
          <div className="preview-placeholder">Cover image preview unavailable.</div>
        )}
      </div>
    </div>
  );
};

export default AdminPodcastEdit;
