import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PodcastCard from '../components/ui/PodcastCard';
import { podcasts as mockPodcasts } from '../data/podcasts';
import { fetchPodcasts } from '../lib/api';
import './Podcasts.css';

const Podcasts = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [podcasts, setPodcasts] = useState(mockPodcasts);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        const loadPodcasts = async () => {
            try {
                const apiPodcasts = await fetchPodcasts();
                if (!isMounted) return;
                setPodcasts(apiPodcasts);
                setError('');
            } catch (_error) {
                if (!isMounted) return;
                setError('Unable to load podcasts from backend. Showing local content.');
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadPodcasts();
        return () => {
            isMounted = false;
        };
    }, []);

    const filteredPodcasts = podcasts.filter(podcast =>
        podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        podcast.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="podcasts-page">
            <section className="page-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="page-label">Listen & Learn</span>
                        <h1 className="page-title">Podcasts</h1>
                        <p className="page-subtitle">
                            Listen to our teachings on the Gospel, prayer, the Holy Spirit, and more.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {error && (
                        <div className="no-results">
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="search-bar glass-card">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search podcasts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {isLoading ? (
                        <div className="no-results">
                            <p>Loading podcasts...</p>
                        </div>
                    ) : (
                        <div className="podcasts-grid">
                            {filteredPodcasts.map((podcast, index) => (
                                <motion.div
                                    key={podcast.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <PodcastCard {...podcast} />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {filteredPodcasts.length === 0 && (
                        <div className="no-results">
                            <p>No podcasts found matching "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Podcasts;
