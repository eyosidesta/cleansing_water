import { motion } from 'framer-motion';
import { teachings } from '../data/teachings';
import './TeachingPage.css';

const WhatIsChurch = () => {
    const { title, subtitle, topics } = teachings.whatIsChurch;

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
                <div className="container">
                    <div className="topics-grid">
                        {topics.map((topic, index) => (
                            <motion.div
                                key={index}
                                className="topic-card glass-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h3>{topic.title}</h3>
                                <p>{topic.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="container-sm">
                        <div className="content-section">
                            <h2>The Importance of the Local Church</h2>
                            <p>
                                While the universal Church includes all believers in Christ, the local church is
                                where Christians gather to worship, grow, and serve together. The New Testament
                                pattern shows believers meeting regularly for teaching, fellowship, breaking of
                                bread, and prayer (Acts 2:42).
                            </p>
                        </div>

                        <div className="scripture-box glass-card">
                            <h3>Key Scriptures</h3>
                            <ul>
                                <li>"And I also say to you that you are Peter, and on this rock I will build My church, and the gates of Hades shall not prevail against it." — Matthew 16:18</li>
                                <li>"Not forsaking the assembling of ourselves together, as is the manner of some, but exhorting one another, and so much the more as you see the Day approaching." — Hebrews 10:25</li>
                                <li>"For where two or three are gathered together in My name, I am there in the midst of them." — Matthew 18:20</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WhatIsChurch;
