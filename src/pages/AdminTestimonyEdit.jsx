import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import { fetchTestimonyById, updateTestimony, uploadTestimonyImage } from '../lib/api';
import './FormPage.css';
import './AdminPodcastCreate.css';

const DEFAULT_AUTHOR_NAME = 'Cleansing Water Ministry';

const AdminTestimonyEdit = () => {
  const { testimonyId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    contentRaw: '',
    authorName: '',
    coverImageUrl: '',
    galleryImageUrls: [],
    publishedAt: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    let isMounted = true;
    const loadTestimony = async () => {
      try {
        const testimony = await fetchTestimonyById(testimonyId);
        if (!isMounted) return;
        setFormData({
          title: testimony.title ?? '',
          summary: testimony.summary ?? '',
          contentRaw: testimony.contentRaw ?? '',
          authorName: testimony.authorName ?? '',
          coverImageUrl: testimony.coverImageUrl ?? '',
          galleryImageUrls: testimony.galleryImageUrls ?? [],
          publishedAt: testimony.date ? String(testimony.date).slice(0, 10) : '',
        });
      } catch (_error) {
        if (isMounted) setError('Unable to load testimony.');
      }
    };
    loadTestimony();
    return () => {
      isMounted = false;
    };
  }, [testimonyId]);

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleUploadCover = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setError('');
    try {
      const uploaded = await uploadTestimonyImage(file);
      setFormData((prev) => ({ ...prev, coverImageUrl: uploaded.url }));
    } catch (uploadError) {
      setError(uploadError.message || 'Unable to upload cover image.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadGallery = async (event) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;
    setIsUploading(true);
    setError('');
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const uploaded = await uploadTestimonyImage(file);
        uploadedUrls.push(uploaded.url);
      }
      setFormData((prev) => ({
        ...prev,
        galleryImageUrls: [...prev.galleryImageUrls, ...uploadedUrls],
      }));
    } catch (uploadError) {
      setError(uploadError.message || 'Unable to upload gallery images.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeGalleryImage = (url) => {
    setFormData((prev) => ({
      ...prev,
      galleryImageUrls: prev.galleryImageUrls.filter((item) => item !== url),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSubmitMessage('');
    try {
      await updateTestimony(testimonyId, {
        title: formData.title.trim(),
        summary: formData.summary.trim(),
        contentRaw: formData.contentRaw,
        authorName: formData.authorName.trim() || DEFAULT_AUTHOR_NAME,
        coverImageUrl: formData.coverImageUrl.trim() || null,
        galleryImageUrls: formData.galleryImageUrls,
        publishedAt: formData.publishedAt || null,
      });
      setSubmitMessage('Testimony updated successfully.');
    } catch (submitError) {
      setError(submitError.message || 'Unable to update testimony.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-card glass-card form-centered">
      <div className="flex items-center justify-between mb-6">
        <h2>Edit Testimony</h2>
        <Button variant="ghost" onClick={() => navigate('/admin/testimonies')}>
          Back to list
        </Button>
      </div>
      {error && <p className="form-note">{error}</p>}
      {submitMessage && <p className="form-note">{submitMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="summary">Summary</label>
          <textarea id="summary" name="summary" rows={3} value={formData.summary} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="contentRaw">Testimony Content</label>
          <textarea id="contentRaw" name="contentRaw" rows={10} value={formData.contentRaw} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="authorName">Author Name</label>
          <input id="authorName" name="authorName" type="text" value={formData.authorName} onChange={handleChange} placeholder={DEFAULT_AUTHOR_NAME} />
        </div>
        <div className="form-group">
          <label htmlFor="coverUpload">Cover Image Upload (Optional)</label>
          <input id="coverUpload" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleUploadCover} />
          {isUploading && <p className="upload-hint">Uploading image...</p>}
          {formData.coverImageUrl && <p className="upload-hint">Cover uploaded successfully.</p>}
        </div>
        <div className="form-group">
          <label htmlFor="galleryUpload">Gallery Images (Optional, multiple)</label>
          <input id="galleryUpload" type="file" accept="image/png,image/jpeg,image/webp" multiple onChange={handleUploadGallery} />
          {formData.galleryImageUrls.length > 0 && (
            <div className="inline-series-actions">
              {formData.galleryImageUrls.map((url) => (
                <button key={url} type="button" onClick={() => removeGalleryImage(url)}>
                  Remove image
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="publishedAt">Publish Date (Optional)</label>
          <input id="publishedAt" name="publishedAt" type="date" value={formData.publishedAt} onChange={handleChange} />
        </div>
        <Button type="submit" variant="primary" size="lg" fullWidth loading={isSubmitting}>
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default AdminTestimonyEdit;
