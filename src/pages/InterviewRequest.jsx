import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { submitInterviewRequest } from '../lib/api';
import justinProfileImage from '../assets/justin-profile.png';
import './FormPage.css';

const InterviewRequest = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    organizationName: '',
    organizationWebsite: '',
    phone: '',
    interviewerName: '',
    purpose: '',
    duration: '',
    mediaType: '',
    interviewType: '',
    requestedDate: '',
    alternateDate: '',
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
      await submitInterviewRequest(formData);
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError.message || 'Unable to submit interview request.');
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
                We appreciate your media interest. Share your interview details and our team will respond as soon as possible.
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
                  <p>Thank you. We will review your interview request and respond soon.</p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && <p className="form-note">{error}</p>}
                <h3 className="mb-4">About You</h3>
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

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="organizationName">Your Organization</label>
                    <input id="organizationName" name="organizationName" type="text" value={formData.organizationName} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="organizationWebsite">Organization Website</label>
                    <input id="organizationWebsite" name="organizationWebsite" type="url" value={formData.organizationWebsite} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                </div>

                <h3 className="mb-4">Interview Details</h3>
                <div className="form-group">
                  <label htmlFor="interviewerName">Interviewer's Name</label>
                  <input id="interviewerName" name="interviewerName" type="text" value={formData.interviewerName} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="purpose">Purpose of Interview</label>
                  <textarea id="purpose" name="purpose" rows={3} value={formData.purpose} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="duration">Interview Duration</label>
                  <input id="duration" name="duration" type="text" value={formData.duration} onChange={handleChange} required placeholder="e.g., 45 minutes" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="mediaType">Interview Media Type</label>
                    <select id="mediaType" name="mediaType" value={formData.mediaType} onChange={handleChange} required>
                      <option value="">Select media type...</option>
                      <option value="TELEVISION">Television</option>
                      <option value="RADIO">Radio</option>
                      <option value="PRINT">Print</option>
                      <option value="PODCAST">Podcast</option>
                      <option value="ONLINE_VIDEO">Online Video</option>
                      <option value="ONLINE_ARTICLE">Online Article</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="interviewType">Interview Type</label>
                    <select id="interviewType" name="interviewType" value={formData.interviewType} onChange={handleChange} required>
                      <option value="">Select interview type...</option>
                      <option value="LIVE">Live</option>
                      <option value="RECORDED">Recorded</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="requestedDate">Requested Date</label>
                    <input id="requestedDate" name="requestedDate" type="date" value={formData.requestedDate} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="alternateDate">Alternate Date (Optional)</label>
                    <input id="alternateDate" name="alternateDate" type="date" value={formData.alternateDate} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="primaryTopic">Primary Topic Requested</label>
                  <input id="primaryTopic" name="primaryTopic" type="text" value={formData.primaryTopic} onChange={handleChange} placeholder="Gospel, discipleship, prayer, evangelism, etc." />
                </div>

                <div className="form-group">
                  <label htmlFor="additionalInformation">Additional Information</label>
                  <textarea id="additionalInformation" name="additionalInformation" rows={4} value={formData.additionalInformation} onChange={handleChange} required />
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

export default InterviewRequest;
