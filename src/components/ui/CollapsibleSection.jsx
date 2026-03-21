import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CollapsibleSection.css';

const CollapsibleSection = ({
    title,
    children,
    defaultOpen = false,
    icon
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={`collapsible-section ${isOpen ? 'is-open' : ''}`}>
            <button
                className="collapsible-header"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <div className="collapsible-header-content">
                    {icon && <span className="collapsible-icon">{icon}</span>}
                    <span className="collapsible-title">{title}</span>
                </div>
                <span className="collapsible-toggle">
                    <svg
                        className="toggle-icon"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <line x1="12" y1="5" x2="12" y2="19" className="vertical-line" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        className="collapsible-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className="collapsible-content-inner">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CollapsibleSection;
