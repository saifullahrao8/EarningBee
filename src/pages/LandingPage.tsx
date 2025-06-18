import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, TrendingUp, Shield, Users, ArrowRight, Moon, Sun } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useActivity } from '../contexts/ActivityContext';
import { useTheme } from '../contexts/ThemeContext';
import FaceScanner from '../components/FaceScanner';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { addPageVisit } = useActivity();
  const { theme, toggleTheme } = useTheme();
  const [showScanner, setShowScanner] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [privateKey, setPrivateKey] = useState('');

  useEffect(() => {
    addPageVisit('Landing Page');
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/input');
    } else {
      setShowScanner(true);
    }
  };

  const handleScanComplete = async (faceData: string) => {
    setIsLoggingIn(true);
    try {
      const key = await login(faceData);
      setPrivateKey(key);
      setShowScanner(false);
      
      // Show private key briefly, then navigate
      setTimeout(() => {
        navigate('/input');
      }, 3000);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleScanCancel = () => {
    setShowScanner(false);
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Recommendations",
      description: "Get personalized earning suggestions based on your investment capacity and goals"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "50+ Verified Methods",
      description: "Access our curated database of legitimate online and offline earning opportunities"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Blockchain-inspired authentication with face scan technology for maximum security"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Voice Assistant",
      description: "Meet BeeBot, your smart earning advisor that helps navigate and speak recommendations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bee-50 via-white to-bee-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-bee-400 to-bee-600 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-black rounded-full relative">
                  <div className="absolute inset-0 bg-bee-400 rounded-full">
                    <div className="absolute top-0.5 left-0 right-0 h-0.5 bg-black rounded-full"></div>
                    <div className="absolute top-2 left-0 right-0 h-0.5 bg-black rounded-full"></div>
                    <div className="absolute top-3.5 left-0 right-0 h-0.5 bg-black rounded-full"></div>
                  </div>
                  <div className="absolute -top-0.5 -left-1 w-2 h-2 bg-white opacity-80 rounded-full animate-buzz"></div>
                  <div className="absolute -top-0.5 -right-1 w-2 h-2 bg-white opacity-80 rounded-full animate-buzz" style={{ animationDelay: '0.1s' }}></div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-bee-600 to-bee-800 bg-clip-text text-transparent">
                EarningBee
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Smart Earning Advisor</p>
            </div>
          </motion.div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all"
            >
              {theme.mode === 'light' ? 
                <Moon className="w-5 h-5 text-gray-600" /> : 
                <Sun className="w-5 h-5 text-bee-500" />
              }
            </button>
            
            {isAuthenticated && (
              <button
                onClick={() => navigate('/input')}
                className="px-4 py-2 bg-gradient-to-r from-bee-400 to-bee-600 text-white rounded-lg hover:from-bee-500 hover:to-bee-700 transition-all"
              >
                Dashboard
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-white mb-6">
                Discover Your
                <span className="block bg-gradient-to-r from-bee-400 via-bee-500 to-bee-600 bg-clip-text text-transparent">
                  Perfect Earning
                </span>
                Opportunity
              </h2>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Unlock your earning potential with AI-powered recommendations tailored to your 
                investment capacity and financial goals. Get started with our smart advisor today.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="group relative px-8 py-4 bg-gradient-to-r from-bee-400 to-bee-600 text-white rounded-xl text-lg font-semibold hover:from-bee-500 hover:to-bee-700 transition-all shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center space-x-2">
                  <span>{isAuthenticated ? 'Go to Dashboard' : 'Get Started with Face Scan'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </motion.button>

              {privateKey && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-100 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-700"
                >
                  <p className="text-green-800 dark:text-green-200 font-medium mb-2">
                    Authentication Successful! 🎉
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                    Your Private Key (save this securely):
                  </p>
                  <code className="block p-2 bg-green-200 dark:bg-green-800 rounded text-green-800 dark:text-green-200 font-mono text-sm break-all">
                    {privateKey}
                  </code>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                    Redirecting to dashboard in 3 seconds...
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20"
          >
            <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
              Why Choose EarningBee?
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 group hover:border-bee-300 dark:hover:border-bee-600"
                >
                  <div className="text-bee-500 mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-r from-bee-400 to-bee-600 rounded-2xl p-8 md:p-12 text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Earning Smarter?
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of users who've discovered their perfect earning opportunities
              </p>
              <button
                onClick={handleGetStarted}
                className="px-8 py-4 bg-white text-bee-600 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                {isAuthenticated ? 'Access Dashboard' : 'Start Your Journey'}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-bee-200 dark:bg-bee-800 rounded-full opacity-60 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-bee-300 dark:bg-bee-700 rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-bee-400 dark:bg-bee-600 rounded-full opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Built with
            </span>
            <img 
              src="https://bolt.new/_app/immutable/assets/bolt-logo-dark.CyOFBf2C.png" 
              alt="Bolt.new" 
              className="h-4 opacity-60"
            />
            <a 
              href="https://bolt.new" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Bolt.new
            </a>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 EarningBee. Empowering smart earning decisions with AI.
          </p>
        </div>
      </footer>

      {/* Face Scanner Modal */}
      {showScanner && (
        <FaceScanner
          onScanComplete={handleScanComplete}
          onCancel={handleScanCancel}
        />
      )}
    </div>
  );
};

export default LandingPage;