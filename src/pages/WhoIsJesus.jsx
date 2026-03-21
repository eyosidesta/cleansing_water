import { motion } from 'framer-motion';
import { teachings } from '../data/teachings';
import './TeachingPage.css';

const WhoIsJesus = () => {
    const { title, subtitle, sections } = teachings.whoIsJesus;

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
                            <li>"In the beginning was the Word, and the Word was with God, and the Word was God." — John 1:1</li>
                            <li>"For in Him dwells all the fullness of the Godhead bodily." — Colossians 2:9</li>
                            <li>"Jesus said to him, 'I am the way, the truth, and the life. No one comes to the Father except through Me.'" — John 14:6</li>
                            <li>"For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life." — John 3:16</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WhoIsJesus;
