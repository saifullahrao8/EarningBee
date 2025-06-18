import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  User, 
  Heart, 
  Code, 
  Zap,
  Award,
  Target,
  Users,
  Shield,
  TrendingUp,
  Database
} from 'lucide-react';
import { useActivity } from '../contexts/ActivityContext';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const { addPageVisit } = useActivity();

  useEffect(() => {
    addPageVisit('About Page');
  }, []);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Recommendations",
      description: "Smart algorithms analyze your preferences to find perfect earning matches"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "75+ Verified Methods",
      description: "Expanded database of legitimate earning opportunities with real success stories"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Personalized Matching",
      description: "Tailored suggestions based on your investment capacity and goals"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Voice Assistant",
      description: "BeeBot helps navigate and speaks recommendations for better accessibility"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enhanced Security",
      description: "Advanced biometric authentication with 256-bit encryption"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "User Profiles",
      description: "Customizable profiles with activity tracking and preferences"
    }
  ];

  const stats = [
    { number: "75+", label: "Earning Methods" },
    { number: "98%", label: "Success Rate" },
    { number: "24/7", label: "AI Support" },
    { number: "100%", label: "Verified" }
  ];

  const newFeatures = [
    {
      title: "Enhanced Dataset",
      description: "Expanded from 50+ to 75+ verified earning methods including AI automation, cybersecurity, NFT design, and more cutting-edge opportunities."
    },
    {
      title: "User Profiles",
      description: "Complete profile management with customizable avatars, bio, preferences, and secure private key storage."
    },
    {
      title: "Advanced Security",
      description: "5-second secure authentication process with biometric scanning, 256-bit encryption, and blockchain-inspired security."
    },
    {
      title: "Activity Tracking",
      description: "Comprehensive tracking of user engagement, time spent, searches performed, and recommendations viewed."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bee-50 via-white to-bee-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-4 mb-8"
        >
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              About EarningBee
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Empowering smart earning decisions with AI
            </p>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-bee-400 to-bee-600 rounded-2xl p-8 md:p-12 text-white mb-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your Smart Earning Companion
              </h2>
              <p className="text-xl mb-6 opacity-90">
                EarningBee uses advanced AI to match you with the perfect earning opportunities 
                based on your investment capacity, goals, and preferences. Now with enhanced security 
                and 75+ verified methods.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Built with passion</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Code className="w-5 h-5" />
                  <span>Powered by AI</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-32 h-32 mx-auto bg-white bg-opacity-20 rounded-full flex items-center justify-center animate-float">
                <div className="w-20 h-20 bg-black rounded-full relative">
                  <div className="absolute inset-0 bg-bee-400 rounded-full">
                    <div className="absolute top-2 left-0 right-0 h-2 bg-black rounded-full"></div>
                    <div className="absolute top-6 left-0 right-0 h-2 bg-black rounded-full"></div>
                    <div className="absolute top-10 left-0 right-0 h-2 bg-black rounded-full"></div>
                  </div>
                  <div className="absolute -top-2 -left-4 w-6 h-8 bg-white opacity-80 rounded-full animate-buzz"></div>
                  <div className="absolute -top-2 -right-4 w-6 h-8 bg-white opacity-80 rounded-full animate-buzz" style={{ animationDelay: '0.1s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-bold text-bee-600 dark:text-bee-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* New Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
            What's New in EarningBee
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {newFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-gradient-to-br from-bee-50 to-bee-100 dark:from-bee-900/20 dark:to-bee-800/20 rounded-xl p-6 border border-bee-200 dark:border-bee-700"
              >
                <h4 className="text-lg font-semibold text-bee-800 dark:text-bee-200 mb-2">
                  {feature.title}
                </h4>
                <p className="text-bee-700 dark:text-bee-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
            Core Features
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-bee-100 dark:bg-bee-900 rounded-lg text-bee-600 dark:text-bee-400">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Developer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-bee-400 to-bee-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Saif Ullah Rao
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Creator & AI Enthusiast
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                AI enthusiast helping the world find smarter earning solutions. Passionate about 
                creating technology that empowers people to achieve their financial goals through 
                intelligent recommendations and personalized guidance.
              </p>

              <div className="space-y-3">
                <a
                  href="mailto:saifullahrao089@gmail.com"
                  className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-bee-600 dark:hover:text-bee-400 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>saifullahrao089@gmail.com</span>
                </a>
                
                <a
                  href="tel:+923096046239"
                  className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-bee-600 dark:hover:text-bee-400 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>+92 309 6046239</span>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-bee-50 to-bee-100 dark:from-bee-900/20 dark:to-bee-800/20 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Mission Statement
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "To democratize access to earning opportunities by providing intelligent, 
                personalized recommendations that help individuals make informed decisions 
                about their financial future with enhanced security and user experience."
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-bee-200 dark:bg-bee-800 text-bee-800 dark:text-bee-200 rounded-full text-sm">
                  AI & Machine Learning
                </span>
                <span className="px-3 py-1 bg-bee-200 dark:bg-bee-800 text-bee-800 dark:text-bee-200 rounded-full text-sm">
                  Financial Technology
                </span>
                <span className="px-3 py-1 bg-bee-200 dark:bg-bee-800 text-bee-800 dark:text-bee-200 rounded-full text-sm">
                  User Experience
                </span>
                <span className="px-3 py-1 bg-bee-200 dark:bg-bee-800 text-bee-800 dark:text-bee-200 rounded-full text-sm">
                  Cybersecurity
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
            Built with Modern Technology
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Frontend</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                React, TypeScript, Tailwind CSS, Framer Motion
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Features</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Biometric Auth, Voice Assistant, User Profiles, Activity Tracking
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">AI & Data</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Smart Recommendations, Real-time Analytics, 75+ Methods Database
              </p>
            </div>
          </div>
        </motion.div>

        {/* Built with Bolt.new Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-3 bg-white dark:bg-gray-800 rounded-xl px-6 py-4 shadow-lg border border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-300">Proudly built with</span>
            <img 
              src="https://bolt.new/_app/immutable/assets/bolt-logo-dark.CyOFBf2C.png" 
              alt="Bolt.new" 
              className="h-6"
            />
            <a 
              href="https://bolt.new" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Bolt.new
            </a>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            © 2025 EarningBee. Empowering smart earning decisions with AI.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;