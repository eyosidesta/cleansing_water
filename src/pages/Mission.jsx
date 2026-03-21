import { motion } from 'framer-motion';
import { missionData } from '../data/teachings';
import './ContentPage.css';

const Mission = () => {
    return (
        <div className="content-page">
            <section className="page-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="page-label">Our Purpose</span>
                        <h1 className="page-title">Mission</h1>
                        <p className="page-subtitle">
                            Why we exist and what drives us forward.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <motion.div
                        className="mission-statement"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Our Mission</h2>
                        <p className="quote">{missionData.statement}</p>
                    </motion.div>

                    <motion.div
                        className="mission-statement"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2>Our Vision</h2>
                        <p className="quote">{missionData.vision}</p>
                    </motion.div>

                    <div className="intro-text">
                        <h2>Our Core Values</h2>
                        <p>
                            These principles guide everything we do at Cleansing Water Ministry.
                        </p>
                    </div>

                    <div className="values-grid">
                        {missionData.values.map((value, index) => (
                            <motion.div
                                key={index}
                                className="value-card glass-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Mission;
