import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { testimonies as mockTestimonies } from '../data/teachings';
import { fetchTestimonies } from '../lib/api';
import './ContentPage.css';

const Testimony = () => {
  const [testimonies, setTestimonies] = useState(
    mockTestimonies.map((item) => ({
      id: item.id,
      title: item.title,
      summary: item.excerpt,
      authorName: item.name,
      coverImageUrl: item.thumbnailUrl,
      date: null,
      galleryImageUrls: [],
    })),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const formatDate = (dateValue) => {
    if (!dateValue) return null;
    const parsed = new Date(dateValue);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    let isMounted = true;
    const loadTestimonies = async () => {
      try {
        const items = await fetchTestimonies();
        if (!isMounted) return;
        setTestimonies(items);
        setError('');
      } catch (_error) {
        if (!isMounted) return;
        setError('Unable to load testimonies from backend. Showing local content.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadTestimonies();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="content-page">
      <section className="page-hero testimony-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="page-label">Stories of Grace</span>
            <h1 className="page-title">Testimonies</h1>
            <p className="page-subtitle">
              Hear what God has done in the lives of His people.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="testimony-description-band">
        <div className="container container-sm">
          <h2>Published Testimonies</h2>
          <p>
            This page shares testimonies that our ministry team has prayerfully reviewed and
            published to strengthen faith, encourage the church, and point people to Jesus Christ.
            Open any testimony to read the full story and view attached photos.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {error && <div className="no-results"><p>{error}</p></div>}

          {isLoading ? (
            <div className="no-results"><p>Loading testimonies...</p></div>
          ) : (
            <div className="testimonies-grid">
              {testimonies.map((testimony, index) => (
                <motion.div
                  key={testimony.id}
                  className="testimony-card glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/testimonies/${testimony.id}`} className="testimony-image">
                    {testimony.coverImageUrl ? (
                      <img src={testimony.coverImageUrl} alt={testimony.title} />
                    ) : (
                      <div className="testimony-image-fallback">
                        <span>{testimony.title}</span>
                      </div>
                    )}
                  </Link>
                  <div className="testimony-content">
                    <h3>
                      <Link to={`/testimonies/${testimony.id}`}>{testimony.title}</Link>
                    </h3>
                    <p className="testimony-name">{testimony.authorName || 'Cleansing Water Ministry'}</p>
                    <p className="testimony-date">{formatDate(testimony.date) || 'Date not provided'}</p>
                    <p className="testimony-excerpt">{testimony.summary}</p>
                    {Array.isArray(testimony.galleryImageUrls) && testimony.galleryImageUrls.length > 0 && (
                      <p className="testimony-media-count">
                        {testimony.galleryImageUrls.length} attached image{testimony.galleryImageUrls.length === 1 ? '' : 's'}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimony;
