import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { loginAdmin } from '../lib/api';
import { getAdminToken, setAdminSession } from '../lib/auth';
import './FormPage.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const token = getAdminToken();
  if (token) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const session = await loginAdmin(formData);
      setAdminSession(session);
      navigate('/admin/dashboard');
    } catch (submitError) {
      setError(submitError.message || 'Unable to login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-page">
      <section className="page-hero">
        <div className="container">
          <span className="page-label">Admin</span>
          <h1 className="page-title">Admin Login</h1>
          <p className="page-subtitle">Sign in to manage ministry content.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="form-card glass-card form-centered">
            {error && (
              <div className="form-note" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth loading={isSubmitting}>
                Login
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminLogin;
