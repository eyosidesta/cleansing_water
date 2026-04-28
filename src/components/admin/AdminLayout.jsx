import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { clearAdminSession, getAdminUser } from '../../lib/auth';
import './AdminLayout.css';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/podcasts', label: 'Podcasts' },
  { to: '/admin/articles', label: 'Articles' },
  { to: '/admin/testimonies', label: 'Testimonies' },
  { to: '/admin/contact-requests', label: 'Contact Requests' },
  { to: '/admin/speaker-requests', label: 'Speaker Requests' },
  { to: '/admin/interview-requests', label: 'Interview Requests' },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const adminUser = getAdminUser();

  const handleLogout = () => {
    clearAdminSession();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>Cleansing Water</h2>
          <p>Admin Panel</p>
        </div>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Ministry Management</h1>
            <p>{adminUser?.fullName || adminUser?.email || 'Admin'}</p>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            Logout
          </Button>
        </header>
        <section className="admin-content">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default AdminLayout;
