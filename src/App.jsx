import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import WhoIsJesus from './pages/WhoIsJesus';
import WhatIsChurch from './pages/WhatIsChurch';
import HolySpirit from './pages/HolySpirit';
import Prayer from './pages/Prayer';
import Evangelism from './pages/Evangelism';
import Podcasts from './pages/Podcasts';
import Articles from './pages/Articles';
import Testimony from './pages/Testimony';
import Mission from './pages/Mission';
import AboutUs from './pages/AboutUs';
import StatementOfFaith from './pages/StatementOfFaith';
import Contact from './pages/Contact';
import SpeakerRequest from './pages/SpeakerRequest';
import InterviewRequest from './pages/InterviewRequest';
import './styles/index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
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
            <Route path="/articles" element={<Articles />} />
            <Route path="/testimony" element={<Testimony />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/statement-of-faith" element={<StatementOfFaith />} />
            {/* Forms */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/speaker-request" element={<SpeakerRequest />} />
            <Route path="/interview-request" element={<InterviewRequest />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
