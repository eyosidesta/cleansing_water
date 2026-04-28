import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import WhoIsJesus from './pages/WhoIsJesus';
import WhatIsChurch from './pages/WhatIsChurch';
import HolySpirit from './pages/HolySpirit';
import Prayer from './pages/Prayer';
import Evangelism from './pages/Evangelism';
import Podcasts from './pages/Podcasts';
import PodcastDetail from './pages/PodcastDetail';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Testimony from './pages/Testimony';
import Mission from './pages/Mission';
import AboutUs from './pages/AboutUs';
import StatementOfFaith from './pages/StatementOfFaith';
import Contact from './pages/Contact';
import SpeakerRequest from './pages/SpeakerRequest';
import InterviewRequest from './pages/InterviewRequest';
import AdminLogin from './pages/AdminLogin';
import AdminPodcastCreate from './pages/AdminPodcastCreate';
import AdminPodcastEdit from './pages/AdminPodcastEdit';
import AdminPodcasts from './pages/AdminPodcasts';
import AdminDashboard from './pages/AdminDashboard';
import AdminArticles from './pages/AdminArticles';
import AdminArticleCreate from './pages/AdminArticleCreate';
import AdminArticleEdit from './pages/AdminArticleEdit';
import AdminTestimonies from './pages/AdminTestimonies';
import AdminTestimonyCreate from './pages/AdminTestimonyCreate';
import AdminTestimonyEdit from './pages/AdminTestimonyEdit';
import AdminContactRequests from './pages/AdminContactRequests';
import AdminSpeakerRequests from './pages/AdminSpeakerRequests';
import AdminInterviewRequests from './pages/AdminInterviewRequests';
import TestimonyDetail from './pages/TestimonyDetail';
import RequireAdminAuth from './components/admin/RequireAdminAuth';
import AdminLayout from './components/admin/AdminLayout';
import './styles/index.css';

function AppRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="app">
      {!isAdminRoute && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Teaching Pages */}
          <Route path="/who-is-jesus" element={<WhoIsJesus />} />
          <Route path="/what-is-church" element={<WhatIsChurch />} />
          <Route path="/holy-spirit" element={<HolySpirit />} />
          <Route path="/prayer" element={<Prayer />} />
          <Route path="/evangelism" element={<Evangelism />} />
          {/* Content Pages */}
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/podcasts/:podcastId" element={<PodcastDetail />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:articleId" element={<ArticleDetail />} />
          <Route path="/testimony" element={<Testimony />} />
          <Route path="/testimonies/:testimonyId" element={<TestimonyDetail />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/statement-of-faith" element={<StatementOfFaith />} />
          {/* Forms */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/speaker-request" element={<SpeakerRequest />} />
          <Route path="/interview-request" element={<InterviewRequest />} />
          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={(
              <RequireAdminAuth>
                <AdminLayout />
              </RequireAdminAuth>
            )}
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="podcasts" element={<AdminPodcasts />} />
            <Route path="podcasts/new" element={<AdminPodcastCreate />} />
            <Route path="podcasts/:podcastId/edit" element={<AdminPodcastEdit />} />
            <Route path="articles" element={<AdminArticles />} />
            <Route path="articles/new" element={<AdminArticleCreate />} />
            <Route path="articles/:articleId/edit" element={<AdminArticleEdit />} />
            <Route path="testimonies" element={<AdminTestimonies />} />
            <Route path="testimonies/new" element={<AdminTestimonyCreate />} />
            <Route path="testimonies/:testimonyId/edit" element={<AdminTestimonyEdit />} />
            <Route path="contact-requests" element={<AdminContactRequests />} />
            <Route path="speaker-requests" element={<AdminSpeakerRequests />} />
            <Route path="interview-requests" element={<AdminInterviewRequests />} />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
