import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

const Hero = ({
    title,
    subtitle,
    rotatingWords = [],
    showAnimatedGradient = true,
    children
}) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        if (rotatingWords.length === 0) return;

        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [rotatingWords.length]);

    return (
        <section className={`hero ${showAnimatedGradient ? 'animated-gradient' : ''}`}>
            <div className="hero-overlay"></div>
            <div className="hero-container">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    {subtitle && (
                        <motion.span
                            className="hero-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            {subtitle}
                        </motion.span>
                    )}

                    <h1 className="hero-title">
                        {title}
                        {rotatingWords.length > 0 && (
                            <span className="rotating-text-container">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={currentWordIndex}
                                        className="rotating-text"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {rotatingWords[currentWordIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                        )}
                    </h1>

                    {children && <div className="hero-actions">{children}</div>}
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="hero-decoration">
                <div className="glow-orb glow-orb-1"></div>
                <div className="glow-orb glow-orb-2"></div>
                <div className="glow-orb glow-orb-3"></div>
            </div>
        </section>
    );
};

export default Hero;
