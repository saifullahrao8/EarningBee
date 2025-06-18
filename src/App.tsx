import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ActivityProvider } from './contexts/ActivityContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingPage from './pages/LandingPage';
import EarningInputPage from './pages/EarningInputPage';
import RecommendationsPage from './pages/RecommendationsPage';
import ActivityPage from './pages/ActivityPage';
import AboutPage from './pages/AboutPage';
import BeeBot from './components/BeeBot';

// Page transition wrapper
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Protected route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Main app content
const AppContent: React.FC = () => {
  const location = useLocation();
  
  const handleBeeNavigation = (path: string) => {
    window.location.href = path;
  };

  const handleStartSearch = () => {
    window.location.href = '/input';
  };

  // Get current recommendations for BeeBot
  const getCurrentRecommendations = () => {
    const savedInput = localStorage.getItem('earningbee_input');
    if (savedInput && location.pathname === '/recommendations') {
      // Return mock recommendations for voice assistant
      return [
        { name: 'Freelance Writing', category: 'online', minEarning: 200, maxEarning: 4000 },
        { name: 'YouTube Channel', category: 'online', minEarning: 50, maxEarning: 10000 },
        { name: 'Local Tutoring', category: 'offline', minEarning: 200, maxEarning: 3000 }
      ];
    }
    return undefined;
  };

  return (
    <div className="relative">
      <PageTransition>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/input" 
            element={
              <ProtectedRoute>
                <EarningInputPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/recommendations" 
            element={
              <ProtectedRoute>
                <RecommendationsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/activity" 
            element={
              <ProtectedRoute>
                <ActivityPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageTransition>

      {/* BeeBot Voice Assistant */}
      <BeeBot
        onNavigate={handleBeeNavigation}
        onStartSearch={handleStartSearch}
        currentRecommendations={getCurrentRecommendations()}
      />
    </div>
  );
};

// Main App component
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ActivityProvider>
          <Router>
            <AppContent />
          </Router>
        </ActivityProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;