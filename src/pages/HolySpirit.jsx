import { motion } from 'framer-motion';
import { teachings } from '../data/teachings';
import './TeachingPage.css';

const HolySpirit = () => {
    const { title, subtitle, sections } = teachings.holySpirit;

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
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            className="content-section"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <h2>{section.title}</h2>
                            <p>{section.content}</p>
                        </motion.div>
                    ))}

                    <div className="scripture-box glass-card">
                        <h3>Key Scriptures</h3>
                        <ul>
                            <li>"But you shall receive power when the Holy Spirit has come upon you; and you shall be witnesses to Me..." — Acts 1:8</li>
                            <li>"But the Helper, the Holy Spirit, whom the Father will send in My name, He will teach you all things..." — John 14:26</li>
                            <li>"Do you not know that you are the temple of God and that the Spirit of God dwells in you?" — 1 Corinthians 3:16</li>
                            <li>"But the fruit of the Spirit is love, joy, peace, longsuffering, kindness, goodness, faithfulness, gentleness, self-control." — Galatians 5:22-23</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HolySpirit;
