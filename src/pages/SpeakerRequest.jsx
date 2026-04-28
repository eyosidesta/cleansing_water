import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { submitSpeakerRequest } from '../lib/api';
import justinProfileImage from '../assets/justin-profile.png';
import './FormPage.css';

const SpeakerRequest = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationWebsite: '',
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    phone: '',
    eventDate: '',
    alternateDate: '',
    venueName: '',
    locationAddress: '',
    locationCity: '',
    locationState: '',
    locationPostalCode: '',
    locationCountry: '',
    speakingDuration: '',
    eventDescription: '',
    primaryTopic: '',
    additionalInformation: '',
    humanCheck: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await submitSpeakerRequest(formData);
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError.message || 'Unable to submit speaker request.');
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="request-layout">
            <motion.aside
              className="glass-card request-profile-card"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <img
                src={justinProfileImage}
                alt="Justin - CEO of Cleansing Waters Ministry"
                className="request-profile-image"
              />
              <h3 className="request-profile-title">Justin</h3>
              <p className="request-profile-subtitle">CEO of Cleansing Waters Ministry</p>
              <p className="text-muted">
                Thank you for inviting our ministry. Please fill out this form and our team will prayerfully review your request.
              </p>
            </motion.aside>

            <motion.div
              className="form-card glass-card request-form-card"
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
                  <p>Thank you. We will review your speaker request and follow up soon.</p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && <p className="form-note">{error}</p>}

                <h3 className="mb-4">Organization Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="organizationName">Organization / Church Name</label>
                    <input id="organizationName" name="organizationName" type="text" value={formData.organizationName} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="organizationWebsite">Organization Website (Optional)</label>
                    <input id="organizationWebsite" name="organizationWebsite" type="url" value={formData.organizationWebsite} onChange={handleChange} />
                  </div>
                </div>

                <h3 className="mb-4">Contact Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmEmail">Confirm Email</label>
                    <input id="confirmEmail" name="confirmEmail" type="email" value={formData.confirmEmail} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                </div>

                <h3 className="mb-4">Event Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="eventDate">Event Date</label>
                    <input id="eventDate" name="eventDate" type="date" value={formData.eventDate} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="alternateDate">Alternate Date (Optional)</label>
                    <input id="alternateDate" name="alternateDate" type="date" value={formData.alternateDate} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="venueName">Name of Venue / Church</label>
                  <input id="venueName" name="venueName" type="text" value={formData.venueName} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="locationAddress">Event Location (Street Address)</label>
                  <input id="locationAddress" name="locationAddress" type="text" value={formData.locationAddress} onChange={handleChange} required />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="locationCity">City</label>
                    <input id="locationCity" name="locationCity" type="text" value={formData.locationCity} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="locationState">State / Region</label>
                    <input id="locationState" name="locationState" type="text" value={formData.locationState} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="locationPostalCode">Postal Code</label>
                    <input id="locationPostalCode" name="locationPostalCode" type="text" value={formData.locationPostalCode} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="locationCountry">Country</label>
                    <input id="locationCountry" name="locationCountry" type="text" value={formData.locationCountry} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="speakingDuration">Requested Speaking Duration</label>
                  <input
                    id="speakingDuration"
                    name="speakingDuration"
                    type="text"
                    value={formData.speakingDuration}
                    onChange={handleChange}
                    placeholder="45 minutes"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="eventDescription">Event Description</label>
                  <textarea id="eventDescription" name="eventDescription" rows={4} value={formData.eventDescription} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="primaryTopic">Primary Spiritual Focus Topic Requested</label>
                  <input id="primaryTopic" name="primaryTopic" type="text" value={formData.primaryTopic} onChange={handleChange} placeholder="Gospel, discipleship, prayer, evangelism, etc." />
                </div>

                <div className="form-group">
                  <label htmlFor="additionalInformation">Additional Information (Optional)</label>
                  <textarea id="additionalInformation" name="additionalInformation" rows={4} value={formData.additionalInformation} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>
                    <input type="checkbox" name="humanCheck" checked={formData.humanCheck} onChange={handleChange} /> Are you a human?
                  </label>
                </div>

                <Button type="submit" variant="primary" size="lg" fullWidth loading={isSubmitting}>
                  Submit Request
                </Button>

                <p className="form-note">
                  If you have any issues submitting this form, please email your request to our@email.com.
                </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpeakerRequest;
