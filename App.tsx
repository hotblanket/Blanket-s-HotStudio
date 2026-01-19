
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/sections/Hero';
import { FeaturedProjects } from './components/sections/FeaturedProjects';
import { Services } from './components/sections/Services';
import { Process } from './components/sections/Process';
import { About } from './components/sections/About';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';
import { UserLogin } from './components/auth/UserLogin';
import { CommissionPage } from './components/pages/CommissionPage';
import { PartnerInquiryPage } from './components/pages/PartnerInquiryPage';
import { getProjects, getSiteSettings, getCurrentUser } from './supabaseService';
import { Project, SiteSettings } from './types';

const Home: React.FC<{ projects: Project[]; settings: SiteSettings }> = ({ projects, settings }) => (
  <div className="min-h-screen bg-black text-white">
    <Navbar siteName={settings.site_name} />
    <main>
      <div id="home"><Hero settings={settings} /></div>
      <div id="projects"><FeaturedProjects projects={projects} /></div>
      <div id="services"><Services /></div>
      <div id="process"><Process /></div>
      <div id="about"><About /></div>
      <div id="reviews"><ReviewsSection /></div>
    </main>
    <Footer siteName={settings.site_name} />
  </div>
);

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = getCurrentUser();
  const location = useLocation();
  if (!user) return <Navigate to={`/login?returnTo=${location.pathname}`} replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const [p, s] = await Promise.all([getProjects(), getSiteSettings()]);
      setProjects(p);
      setSettings(s);
      setLoading(false);
    };
    init();
  }, []);

  if (loading || !settings) return <div className="h-screen bg-black flex items-center justify-center text-brand font-black">LOADING...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home projects={projects} settings={settings} />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/commission" element={<ProtectedRoute><CommissionPage /></ProtectedRoute>} />
        <Route path="/partner-inquiry" element={<ProtectedRoute><PartnerInquiryPage /></ProtectedRoute>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard projects={projects} settings={settings} />} />
      </Routes>
    </Router>
  );
};

export default App;
