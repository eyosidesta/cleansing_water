import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchPodcastById } from '../lib/api';
import { podcasts as mockPodcasts } from '../data/podcasts';
import './ContentPage.css';

const YOUTUBE_ID_REGEX =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

const extractYoutubeVideoId = (url) => {
  const match = url?.match(YOUTUBE_ID_REGEX);
  return match ? match[1] : '';
};

const PodcastDetail = () => {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadPodcast = async () => {
      try {
        const numericId = Number(podcastId);
        if (!Number.isNaN(numericId)) {
          const item = await fetchPodcastById(numericId);
          if (!isMounted) return;
          setPodcast(item);
          setError('');
          return;
        }
      } catch (_apiError) {
        // Continue to local fallback for old mock slugs.
      }

      const fallback = mockPodcasts.find(
        (item) => String(item.id) === String(podcastId) || item.slug === podcastId,
      );
      if (!isMounted) return;
      if (fallback) {
        setPodcast({
          ...fallback,
          embedUrl: fallback.youtubeUrl
            ? `https://www.youtube.com/embed/${extractYoutubeVideoId(fallback.youtubeUrl)}`
            : '',
        });
        setError('');
      } else {
        setError('Podcast not found.');
      }
    };

    loadPodcast().finally(() => {
      if (isMounted) setIsLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, [podcastId]);

  const embedUrl = useMemo(() => {
    if (!podcast) return '';
    if (podcast.embedUrl) return podcast.embedUrl;
    if (podcast.youtubeUrl) {
      const id = extractYoutubeVideoId(podcast.youtubeUrl);
      return id ? `https://www.youtube.com/embed/${id}` : '';
    }
    return '';
  }, [podcast]);

  if (isLoading) {
    return (
      <div className="content-page">
        <section className="section">
          <div className="container">
            <p>Loading podcast...</p>
          </div>
        </section>
      </div>
    );
  }

  if (error || !podcast) {
    return (
      <div className="content-page">
        <section className="section">
          <div className="container">
            <p>{error || 'Podcast not found.'}</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="content-page">
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="page-label">{podcast.series?.title || 'Podcast'}</span>
            <h1 className="page-title">{podcast.title}</h1>
            <p className="page-subtitle">
              {podcast.speaker || 'Cleansing Water Ministry'}
              {podcast.date ? ` • ${new Date(podcast.date).toLocaleDateString()}` : ''}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container container-sm">
          <div className="content-section">
            {embedUrl ? (
              <div className="preview-video" style={{ marginBottom: '1.25rem' }}>
                <iframe
                  src={embedUrl}
                  title={podcast.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <p>This podcast does not have a valid YouTube video configured yet.</p>
            )}
            <p>{podcast.description}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PodcastDetail;
