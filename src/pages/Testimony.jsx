import { motion } from 'framer-motion';
import { testimonies } from '../data/teachings';
import './ContentPage.css';

const Testimony = () => {
    return (
        <div className="content-page">
            <section className="page-hero">
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

            <section className="section">
                <div className="container">
                    <div className="intro-text">
                        <h2>The Power of Testimony</h2>
                        <p>
                            "And they overcame him by the blood of the Lamb and by the word of their testimony"
                            (Revelation 12:11). Testimonies remind us of God's faithfulness and power. They
                            encourage believers and demonstrate the reality of the Gospel to those who have
                            yet to believe.
                        </p>
                    </div>

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
                                <div className="testimony-image">
                                    <img src={testimony.thumbnailUrl} alt={testimony.name} />
                                    <div className="play-overlay">
                                        <button className="play-btn">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="testimony-content">
                                    <h3>{testimony.title}</h3>
                                    <p className="testimony-name">{testimony.name}</p>
                                    <p className="testimony-excerpt">{testimony.excerpt}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="share-testimony glass-card">
                        <h3>Share Your Testimony</h3>
                        <p>
                            Has God done something amazing in your life? We would love to hear your story
                            and share how God is working through His people.
                        </p>
                        <a href="/contact" className="btn btn-primary">Contact Us</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Testimony;
