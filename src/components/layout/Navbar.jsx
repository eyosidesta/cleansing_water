import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isTeachingsOpen, setIsTeachingsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsTeachingsOpen(false);
    }, [location]);

    const teachingLinks = [
        { path: '/who-is-jesus', label: 'Who is Jesus' },
        { path: '/what-is-church', label: 'What is Church' },
        { path: '/holy-spirit', label: 'Holy Spirit' },
        { path: '/prayer', label: 'Prayer' },
        { path: '/evangelism', label: 'Evangelism' },
    ];

    const mainLinks = [
        { path: '/podcasts', label: 'Podcasts' },
        { path: '/articles', label: 'Articles' },
        { path: '/testimony', label: 'Testimony' },
        { path: '/mission', label: 'Mission' },
        { path: '/about', label: 'About Us' },
        { path: '/contact', label: 'Contact' },
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <span className="logo-text">Cleansing Water</span>
                    <span className="logo-ministry">Ministry</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="navbar-links">
                    <NavLink to="/" className="nav-link">Home</NavLink>

                    {/* Teachings Dropdown */}
                    <div
                        className="nav-dropdown"
                        onMouseEnter={() => setIsTeachingsOpen(true)}
                        onMouseLeave={() => setIsTeachingsOpen(false)}
                    >
                        <button className="nav-link dropdown-trigger">
                            Teachings
                            <svg className={`dropdown-arrow ${isTeachingsOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 12 12">
                                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </button>
                        <AnimatePresence>
                            {isTeachingsOpen && (
                                <motion.div
                                    className="dropdown-menu"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {teachingLinks.map((link) => (
                                        <NavLink key={link.path} to={link.path} className="dropdown-link">
                                            {link.label}
                                        </NavLink>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {mainLinks.map((link) => (
                        <NavLink key={link.path} to={link.path} className="nav-link">
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="navbar-cta">
                    <Link to="/speaker-request" className="btn btn-ghost">Speaker Request</Link>
                    <Link to="/interview-request" className="btn btn-primary">Interview</Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mobile-menu-content">
                            <NavLink to="/" className="mobile-nav-link">Home</NavLink>

                            <div className="mobile-dropdown">
                                <button
                                    className="mobile-nav-link mobile-dropdown-trigger"
                                    onClick={() => setIsTeachingsOpen(!isTeachingsOpen)}
                                >
                                    Teachings
                                    <svg className={`dropdown-arrow ${isTeachingsOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 12 12">
                                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" fill="none" />
                                    </svg>
                                </button>
                                <AnimatePresence>
                                    {isTeachingsOpen && (
                                        <motion.div
                                            className="mobile-dropdown-menu"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                        >
                                            {teachingLinks.map((link) => (
                                                <NavLink key={link.path} to={link.path} className="mobile-dropdown-link">
                                                    {link.label}
                                                </NavLink>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {mainLinks.map((link) => (
                                <NavLink key={link.path} to={link.path} className="mobile-nav-link">
                                    {link.label}
                                </NavLink>
                            ))}

                            <div className="mobile-cta">
                                <Link to="/speaker-request" className="btn btn-ghost btn-full">Speaker Request</Link>
                                <Link to="/interview-request" className="btn btn-primary btn-full">Interview Request</Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
