import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchTestimonyById } from '../lib/api';
import './ContentPage.css';

const TestimonyDetail = () => {
  const { testimonyId } = useParams();
  const [testimony, setTestimony] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadTestimony = async () => {
      try {
        const item = await fetchTestimonyById(testimonyId);
        if (!isMounted) return;
        setTestimony(item);
        setError('');
      } catch (_error) {
        if (!isMounted) return;
        setError('Unable to load this testimony right now.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadTestimony();
    return () => {
      isMounted = false;
    };
  }, [testimonyId]);

  const galleryImages = testimony?.galleryImageUrls ?? [];
  const galleryStack = galleryImages.slice(0, 4);

  const openGallery = (index) => {
    setActiveImageIndex(index);
  };

  const closeGallery = () => {
    setActiveImageIndex(null);
  };

  const showPreviousImage = () => {
    if (!galleryImages.length) return;
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const showNextImage = () => {
    if (!galleryImages.length) return;
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  useEffect(() => {
    if (activeImageIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeGallery();
      if (event.key === 'ArrowLeft') showPreviousImage();
      if (event.key === 'ArrowRight') showNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, galleryImages.length]);

  if (isLoading) {
    return (
      <div className="content-page">
        <section className="section">
          <div className="container">
            <p>Loading testimony...</p>
          </div>
        </section>
      </div>
    );
  }

  if (error || !testimony) {
    return (
      <div className="content-page">
        <section className="section">
          <div className="container">
            <p>{error || 'Testimony not found.'}</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="content-page">
      <section className="page-hero testimony-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="page-label">Testimony</span>
            <h1 className="page-title">{testimony.title}</h1>
            <p className="page-subtitle">
              By {testimony.authorName || 'Cleansing Water Ministry'}
              {testimony.date ? ` • ${new Date(testimony.date).toLocaleDateString()}` : ''}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container container-sm">
          <div className="content-section">
            {testimony.coverImageUrl && (
              <img src={testimony.coverImageUrl} alt={testimony.title} className="testimony-detail-cover" />
            )}
            <h2 className="testimony-detail-title">{testimony.title}</h2>
            <p className="testimony-detail-author">
              By {testimony.authorName || 'Cleansing Water Ministry'}
              {testimony.date ? ` • ${new Date(testimony.date).toLocaleDateString()}` : ''}
            </p>
            {testimony.contentParagraphs.length > 0
              ? testimony.contentParagraphs.map((paragraph, index) => (
                  <p key={index} className="testimony-detail-paragraph">
                    {paragraph}
                  </p>
                ))
              : <p>{testimony.contentRaw}</p>}

            {testimony.galleryImageUrls.length > 0 && (
              <div className="testimony-detail-gallery">
                <h2>Gallery Preview</h2>
                <p className="testimony-detail-gallery-hint">Tap the stack to open and browse all photos.</p>
                <div className="testimony-image-stack-wrap">
                  <button
                    type="button"
                    className="testimony-image-stack"
                    onClick={() => openGallery(0)}
                    aria-label="Open testimony image gallery"
                  >
                    {galleryStack.map((url, index) => (
                      <img
                        key={`${url}-${index}`}
                        src={url}
                        alt={`${testimony.title} gallery image ${index + 1}`}
                        className="testimony-image-stack-layer"
                        style={{
                          '--stack-rotate': `${index % 2 === 0 ? -6 + index * 2 : 6 - index * 2}deg`,
                          '--stack-offset': `${index * 14}px`,
                          '--stack-z': `${galleryStack.length - index}`,
                        }}
                      />
                    ))}
                  </button>
                  <div className="testimony-gallery-count">
                    {galleryImages.length} image{galleryImages.length === 1 ? '' : 's'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {activeImageIndex !== null && (
        <div className="testimony-gallery-modal" role="dialog" aria-modal="true" aria-label="Testimony gallery">
          <button type="button" className="testimony-gallery-close" onClick={closeGallery} aria-label="Close gallery">
            ×
          </button>
          <button type="button" className="testimony-gallery-nav prev" onClick={showPreviousImage} aria-label="Previous image">
            ‹
          </button>
          <div className="testimony-gallery-modal-content">
            <img
              src={galleryImages[activeImageIndex]}
              alt={`${testimony.title} gallery image ${activeImageIndex + 1}`}
              className="testimony-gallery-modal-image"
            />
            <p className="testimony-gallery-modal-count">
              {activeImageIndex + 1} / {galleryImages.length}
            </p>
          </div>
          <button type="button" className="testimony-gallery-nav next" onClick={showNextImage} aria-label="Next image">
            ›
          </button>
          <button type="button" className="testimony-gallery-backdrop" onClick={closeGallery} aria-label="Close gallery" />
        </div>
      )}
    </div>
  );
};

export default TestimonyDetail;
