import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PodcastCard from '../components/ui/PodcastCard';
import { podcasts as mockPodcasts } from '../data/podcasts';
import { fetchPodcasts } from '../lib/api';
import podcastIntroMountains from '../assets/podcast-intro-mountains.png';
import './Podcasts.css';

const INTRO_EMBED_SRC =
    'https://www.youtube.com/embed/ouOem8gwBR4?autoplay=1&mute=1&controls=0&loop=1&playlist=ouOem8gwBR4&modestbranding=1&rel=0&playsinline=1&disablekb=1';

const Podcasts = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [podcasts, setPodcasts] = useState(mockPodcasts);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [viewMode, setViewMode] = useState('all');
    const [activeGroupKey, setActiveGroupKey] = useState('');
    const groupListRef = useRef(null);

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

    const groupedPodcasts = filteredPodcasts.reduce((groups, podcast) => {
        const groupName = podcast.series?.title || 'General';
        if (!groups[groupName]) groups[groupName] = [];
        groups[groupName].push(podcast);
        return groups;
    }, {});

    const podcastGroups = Object.entries(groupedPodcasts).map(([groupName, items]) => ({
        key: groupName,
        name: groupName,
        items,
        thumbnail: items[0]?.image || '',
    }));

    const activeGroup =
        podcastGroups.find(group => group.key === activeGroupKey) ||
        podcastGroups[0] ||
        null;

    useEffect(() => {
        if (viewMode !== 'group') return;
        if (!podcastGroups.length) return;
        if (activeGroupKey) return;
        setActiveGroupKey(podcastGroups[0].key);
    }, [viewMode, podcastGroups, activeGroupKey]);

    const handleSelectGroup = (groupKey) => {
        setActiveGroupKey(groupKey);
        window.requestAnimationFrame(() => {
            groupListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    };

    return (
        <div className="podcasts-page">
            <section className="podcast-video-intro" aria-labelledby="podcast-video-intro-heading">
                <div className="podcast-video-intro-bg" aria-hidden="true">
                    <img src={podcastIntroMountains} alt="" />
                </div>
                <div className="container podcast-video-intro-foreground">
                    <div className="podcast-video-intro-content">
                        <div className="podcast-video-copy">
                            <span className="page-label">Visual Introduction</span>
                            <h2 id="podcast-video-intro-heading" className="podcast-video-intro-title">Gospel Conversations That Build Faith</h2>
                            <p>
                                Watch this short introduction, then explore our full podcast teachings below.
                            </p>
                        </div>
                        <div className="podcast-video-circle">
                            <iframe
                                src={INTRO_EMBED_SRC}
                                title="Podcast visual introduction"
                                allow="autoplay; encrypted-media; picture-in-picture"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="page-hero podcasts-hero">
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

                    <div className="filter-tabs podcast-view-toggle" role="tablist" aria-label="Podcast view options">
                        <button
                            type="button"
                            className={`filter-tab ${viewMode === 'all' ? 'active' : ''}`}
                            onClick={() => setViewMode('all')}
                            role="tab"
                            aria-selected={viewMode === 'all'}
                        >
                            All Podcasts
                        </button>
                        <button
                            type="button"
                            className={`filter-tab ${viewMode === 'group' ? 'active' : ''}`}
                            onClick={() => {
                                setViewMode('group');
                                if (podcastGroups.length && !activeGroupKey) {
                                    setActiveGroupKey(podcastGroups[0].key);
                                }
                            }}
                            role="tab"
                            aria-selected={viewMode === 'group'}
                        >
                            View by Group
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="no-results">
                            <p>Loading podcasts...</p>
                        </div>
                    ) : (
                        viewMode === 'all' ? (
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
                        ) : (
                            <div className="podcast-groups-section">
                                <div className="podcast-group-grid">
                                    {podcastGroups.map((group) => (
                                        <button
                                            key={group.key}
                                            type="button"
                                            className={`podcast-group-card ${activeGroup?.key === group.key ? 'is-active' : ''}`}
                                            onClick={() => handleSelectGroup(group.key)}
                                        >
                                            <div className="podcast-group-image-wrap">
                                                {group.thumbnail ? (
                                                    <img src={group.thumbnail} alt={`${group.name} group thumbnail`} className="podcast-group-image" />
                                                ) : (
                                                    <div className="podcast-group-image podcast-group-image-fallback">Group</div>
                                                )}
                                            </div>
                                            <div className="podcast-group-body">
                                                <h3>{group.name}</h3>
                                                <p>{group.items.length} podcast{group.items.length === 1 ? '' : 's'}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {activeGroup && (
                                    <div className="podcast-group-list" ref={groupListRef}>
                                        <h3 className="podcast-group-list-title">{activeGroup.name}</h3>
                                        <div className="podcasts-grid">
                                            {activeGroup.items.map((podcast, index) => (
                                                <motion.div
                                                    key={podcast.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                >
                                                    <PodcastCard {...podcast} />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
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
