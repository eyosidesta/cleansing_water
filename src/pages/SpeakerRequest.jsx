import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import './FormPage.css';

const SpeakerRequest = () => {
    const [formData, setFormData] = useState({
        organizationName: '',
        contactName: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        eventLocation: '',
        expectedAttendance: '',
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
                        <span className="page-label">Book a Speaker</span>
                        <h1 className="page-title">Speaker Request</h1>
                        <p className="page-subtitle">
                            Invite us to speak at your church, conference, or event.
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
                                        <label htmlFor="organizationName">Organization/Church Name</label>
                                        <input
                                            type="text"
                                            id="organizationName"
                                            name="organizationName"
                                            value={formData.organizationName}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your organization"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="contactName">Contact Name</label>
                                        <input
                                            type="text"
                                            id="contactName"
                                            name="contactName"
                                            value={formData.contactName}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your name"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
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

                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="(555) 123-4567"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="eventType">Event Type</label>
                                    <select
                                        id="eventType"
                                        name="eventType"
                                        value={formData.eventType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select event type...</option>
                                        <option value="sunday-service">Sunday Service</option>
                                        <option value="conference">Conference</option>
                                        <option value="retreat">Retreat</option>
                                        <option value="youth-event">Youth Event</option>
                                        <option value="mens-womens">Men's/Women's Event</option>
                                        <option value="revival">Revival Meeting</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="eventDate">Event Date</label>
                                        <input
                                            type="date"
                                            id="eventDate"
                                            name="eventDate"
                                            value={formData.eventDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="expectedAttendance">Expected Attendance</label>
                                        <input
                                            type="text"
                                            id="expectedAttendance"
                                            name="expectedAttendance"
                                            value={formData.expectedAttendance}
                                            onChange={handleChange}
                                            placeholder="e.g., 100-200"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="eventLocation">Event Location</label>
                                    <input
                                        type="text"
                                        id="eventLocation"
                                        name="eventLocation"
                                        value={formData.eventLocation}
                                        onChange={handleChange}
                                        required
                                        placeholder="City, State or Full Address"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="topic">Requested Topic (Optional)</label>
                                    <input
                                        type="text"
                                        id="topic"
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleChange}
                                        placeholder="Any specific topic you'd like addressed"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="additionalInfo">Additional Information</label>
                                    <textarea
                                        id="additionalInfo"
                                        name="additionalInfo"
                                        value={formData.additionalInfo}
                                        onChange={handleChange}
                                        placeholder="Any other details we should know..."
                                        rows={4}
                                    />
                                </div>

                                <Button type="submit" variant="primary" size="lg" fullWidth loading={isSubmitting}>
                                    Submit Request
                                </Button>

                                <p className="form-note">
                                    We will review your request and respond within 3-5 business days.
                                    Please note that submitting this form does not guarantee availability.
                                </p>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default SpeakerRequest;
