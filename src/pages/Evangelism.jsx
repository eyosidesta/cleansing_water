import { motion } from 'framer-motion';
import { teachings } from '../data/teachings';
import './TeachingPage.css';

const Evangelism = () => {
    const { title, subtitle, content, methods } = teachings.evangelism;

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
                </div>

                <div className="container">
                    <div className="methods-grid">
                        {methods.map((method, index) => (
                            <motion.div
                                key={index}
                                className="method-card glass-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h3>{method.title}</h3>
                                <p>{method.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="container container-sm">
                    <div className="scripture-box glass-card">
                        <h3>Key Scriptures</h3>
                        <ul>
                            <li>"Go therefore and make disciples of all the nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit." — Matthew 28:19</li>
                            <li>"But sanctify the Lord God in your hearts, and always be ready to give a defense to everyone who asks you a reason for the hope that is in you." — 1 Peter 3:15</li>
                            <li>"How then shall they call on Him in whom they have not believed? And how shall they believe in Him of whom they have not heard?" — Romans 10:14</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Evangelism;
