import { motion } from 'framer-motion';
import { aboutData } from '../data/teachings';
import justinProfileImage from '../assets/justin-profile.png';
import './ContentPage.css';

const AboutUs = () => {
    return (
        <div className="content-page">
            <section className="page-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="page-label">Get to Know Us</span>
                        <h1 className="page-title">About Us</h1>
                        <p className="page-subtitle">
                            Learn about our ministry and the people behind it.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="about-grid">
                        <motion.div
                            className="about-content"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2>{aboutData.ministry.title}</h2>
                            <p>{aboutData.ministry.description}</p>
                            <p>{aboutData.ministry.story}</p>
                        </motion.div>
                        <motion.div
                            className="about-image glass-card"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src={justinProfileImage}
                                alt="Justin Slemp speaking on a podcast"
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        className="leader-section"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="leader-image">
                            <img src={justinProfileImage} alt={aboutData.leader.name} />
                        </div>
                        <h3>{aboutData.leader.name}</h3>
                        <p className="leader-role">{aboutData.leader.role}</p>
                        <p className="leader-bio">{aboutData.leader.bio}</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
