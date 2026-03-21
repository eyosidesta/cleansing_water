import { motion } from 'framer-motion';
import { teachings } from '../data/teachings';
import './TeachingPage.css';

const Prayer = () => {
    const { title, subtitle, content, keyPoints } = teachings.prayer;

    return (
        <div className="teaching-page">
            <section className="teaching-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="teaching-label">Teachings</span>
                        <h1 className="teaching-title">{title}</h1>
                        <p className="teaching-subtitle">{subtitle}</p>
                    </motion.div>
                </div>
            </section>

            <section className="section teaching-content">
                <div className="container container-sm">
                    <motion.div
                        className="content-section"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p>{content}</p>
                    </motion.div>

                    <motion.ul
                        className="key-points"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        {keyPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </motion.ul>

                    <div className="scripture-box glass-card">
                        <h3>Key Scriptures</h3>
                        <ul>
                            <li>"Be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let your requests be made known to God." — Philippians 4:6</li>
                            <li>"Pray without ceasing." — 1 Thessalonians 5:17</li>
                            <li>"Ask, and it will be given to you; seek, and you will find; knock, and it will be opened to you." — Matthew 7:7</li>
                            <li>"The effective, fervent prayer of a righteous man avails much." — James 5:16</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Prayer;
