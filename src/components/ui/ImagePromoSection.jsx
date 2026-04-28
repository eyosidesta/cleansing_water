import { motion } from 'framer-motion';
import Button from './Button';
import './ImagePromoSection.css';

const ImagePromoSection = ({
    title,
    description,
    buttonLabel,
    buttonLink,
    backgroundImage
}) => {
    return (
        <section className="section image-promo-section">
            <motion.div
                className="image-promo-card"
                style={{ '--image-promo-bg': `url(${backgroundImage})` }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className="image-promo-content">
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <Button to={buttonLink} variant="primary" size="lg">
                        {buttonLabel}
                    </Button>
                </div>
            </motion.div>
        </section>
    );
};

export default ImagePromoSection;
