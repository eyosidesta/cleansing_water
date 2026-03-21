import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './PodcastCard.css';

const PodcastCard = ({
    id,
    title,
    description,
    image,
    date,
    duration,
    speaker,
    slug
}) => {
    const formatDate = (dateStr) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString('en-US', options);
    };

    return (
        <motion.article
            className="podcast-card glass-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="podcast-card-image">
                <img src={image} alt={title} loading="lazy" />
                <div className="podcast-card-overlay">
                    <button className="play-button" aria-label="Play podcast">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </button>
                </div>
                {duration && <span className="podcast-duration">{duration}</span>}
            </div>

            <div className="podcast-card-content">
                <div className="podcast-card-meta">
                    <span className="podcast-date">{formatDate(date)}</span>
                    {speaker && <span className="podcast-speaker">{speaker}</span>}
                </div>

                <h3 className="podcast-card-title">
                    <Link to={`/podcasts/${slug || id}`}>{title}</Link>
                </h3>

                <p className="podcast-card-description">{description}</p>

                <div className="podcast-card-actions">
                    <Link to={`/podcasts/${slug || id}`} className="listen-link">
                        Listen Now
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <button className="share-button" aria-label="Share podcast">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.article>
    );
};

export default PodcastCard;
