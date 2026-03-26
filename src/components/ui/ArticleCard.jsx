import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ArticleCard.css';

const ArticleCard = ({
    id,
    title,
    excerpt,
    date,
    category,
    slug,
    readTime
}) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return 'Date not set';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString('en-US', options);
    };

    return (
        <motion.article
            className="article-card"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
        >
            <div className="article-card-content">
                <div className="article-card-meta">
                    {category && <span className="article-category">{category}</span>}
                    <span className="article-date">{formatDate(date)}</span>
                    {readTime && <span className="article-read-time">{readTime} min read</span>}
                </div>

                <h3 className="article-card-title">
                    <Link to={`/articles/${slug || id}`}>{title}</Link>
                </h3>

                <p className="article-card-excerpt">{excerpt}</p>
            </div>

            <Link to={`/articles/${slug || id}`} className="article-read-link" aria-label={`Read ${title}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </Link>
        </motion.article>
    );
};

export default ArticleCard;
