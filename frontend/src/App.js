import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { AdminOnlyRoute, LearnerOnlyRoute } from './components/AdminRoute';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Translate from './pages/Translate';
import Quiz from './pages/Quiz';
import AdminDashboard from './pages/AdminDashboard';
import LearnerDashboard from './pages/LearnerDashboard';
import About from './pages/About';
import Settings from './pages/Settings';
import HelpCenter from './pages/HelpCenter';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Feedback from './pages/Feedback';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              {/* Public pages - accessible to all */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              
              {/* Admin-only pages */}
              <Route 
                path="/admin" 
                element={
                  <AdminOnlyRoute>
                    <AdminDashboard />
                  </AdminOnlyRoute>
                } 
              />
              
              {/* Learner-only pages - admins get redirected to /admin */}
              <Route 
                path="/chat" 
                element={
                  <LearnerOnlyRoute>
                    <Chat />
                  </LearnerOnlyRoute>
                } 
              />
              <Route 
                path="/translate" 
                element={
                  <LearnerOnlyRoute>
                    <Translate />
                  </LearnerOnlyRoute>
                } 
              />
              <Route 
                path="/quiz" 
                element={
                  <LearnerOnlyRoute>
                    <Quiz />
                  </LearnerOnlyRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <LearnerOnlyRoute>
                    <LearnerDashboard />
                  </LearnerOnlyRoute>
                } 
              />
              
              {/* Settings and feedback - accessible to both admin and learners */}
              <Route path="/settings" element={<Settings />} />
              <Route path="/feedback" element={<Feedback />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
