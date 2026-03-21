import { motion } from 'framer-motion';
import { statementOfFaith } from '../data/teachings';
import './ContentPage.css';

const StatementOfFaith = () => {
    return (
        <div className="content-page">
            <section className="page-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="page-label">What We Believe</span>
                        <h1 className="page-title">Statement of Faith</h1>
                        <p className="page-subtitle">
                            The core doctrines that guide our teaching and ministry.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="faith-statements">
                        {statementOfFaith.map((item, index) => (
                            <motion.div
                                key={index}
                                className="faith-item glass-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <h3>{item.title}</h3>
                                <p>{item.content}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StatementOfFaith;
