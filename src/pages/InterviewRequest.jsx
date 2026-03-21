import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import './FormPage.css';

const InterviewRequest = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        mediaType: '',
        platform: '',
        audienceSize: '',
        proposedDate: '',
        topic: '',
        additionalInfo: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        setSubmitted(true);
    };

    return (
        <div className="form-page">
            <section className="page-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="page-label">Media Inquiry</span>
                        <h1 className="page-title">Interview Request</h1>
                        <p className="page-subtitle">
                            Request an interview for your podcast, show, or publication.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <motion.div
                        className="form-card glass-card form-centered"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {submitted ? (
                            <div className="form-success">
                                <div className="success-icon">
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="9 12 12 15 16 10" />
                                    </svg>
                                </div>
                                <h3>Request Submitted!</h3>
                                <p>Thank you for your interest. We'll review your request and get back to you soon.</p>
                                <Button onClick={() => setSubmitted(false)} variant="outline">
                                    Submit Another Request
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="organization">Organization/Media Outlet</label>
                                    <input
                                        type="text"
                                        id="organization"
                                        name="organization"
                                        value={formData.organization}
                                        onChange={handleChange}
                                        required
                                        placeholder="Name of your podcast, channel, or publication"
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="mediaType">Media Type</label>
                                        <select
                                            id="mediaType"
                                            name="mediaType"
                                            value={formData.mediaType}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select type...</option>
                                            <option value="podcast">Podcast</option>
                                            <option value="youtube">YouTube Channel</option>
                                            <option value="radio">Radio</option>
                                            <option value="tv">Television</option>
                                            <option value="blog">Blog/Website</option>
                                            <option value="print">Print Publication</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="audienceSize">Audience Size</label>
                                        <select
                                            id="audienceSize"
                                            name="audienceSize"
                                            value={formData.audienceSize}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select size...</option>
                                            <option value="small">Under 1,000</option>
                                            <option value="medium">1,000 - 10,000</option>
                                            <option value="large">10,000 - 100,000</option>
                                            <option value="xlarge">Over 100,000</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="platform">Platform/Website URL</label>
                                    <input
                                        type="url"
                                        id="platform"
                                        name="platform"
                                        value={formData.platform}
                                        onChange={handleChange}
                                        placeholder="https://yourplatform.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="proposedDate">Proposed Date/Timeframe</label>
                                    <input
                                        type="text"
                                        id="proposedDate"
                                        name="proposedDate"
                                        value={formData.proposedDate}
                                        onChange={handleChange}
                                        placeholder="e.g., Sometime in January, or specific date"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="topic">Proposed Topic/Discussion</label>
                                    <input
                                        type="text"
                                        id="topic"
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleChange}
                                        required
                                        placeholder="What would you like to discuss?"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="additionalInfo">Additional Information</label>
                                    <textarea
                                        id="additionalInfo"
                                        name="additionalInfo"
                                        value={formData.additionalInfo}
                                        onChange={handleChange}
                                        placeholder="Format, duration, any other details..."
                                        rows={4}
                                    />
                                </div>

                                <Button type="submit" variant="primary" size="lg" fullWidth loading={isSubmitting}>
                                    Submit Request
                                </Button>

                                <p className="form-note">
                                    We review all interview requests and will respond within 5 business days.
                                    Submission does not guarantee availability or acceptance.
                                </p>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default InterviewRequest;
