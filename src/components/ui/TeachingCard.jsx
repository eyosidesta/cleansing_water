import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './TeachingCard.css';

const TeachingCard = ({
    title,
    description,
    icon,
    link,
    featured = false
}) => {
    const CardWrapper = link ? Link : 'div';
    const cardProps = link ? { to: link } : {};

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <CardWrapper className={`teaching-card glass-card ${featured ? 'featured' : ''}`} {...cardProps}>
                {icon && (
                    <div className="teaching-card-icon">
                        {icon}
                    </div>
                )}

                <h3 className="teaching-card-title">{title}</h3>

                {description && (
                    <p className="teaching-card-description">{description}</p>
                )}

                {link && (
                    <span className="teaching-card-link">
                        Learn More
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </span>
                )}
            </CardWrapper>
        </motion.div>
    );
};

export default TeachingCard;
