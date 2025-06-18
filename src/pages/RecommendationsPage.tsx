import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, Star, Clock, DollarSign, Lightbulb } from 'lucide-react';
import { useActivity } from '../contexts/ActivityContext';
import { earningMethods, filterMethods } from '../data/earningMethods';
import { EarningMethod, UserInput } from '../types';
import MethodCard from '../components/MethodCard';
import LoadingSpinner from '../components/LoadingSpinner';

const RecommendationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { addPageVisit, incrementRecommendationsViewed } = useActivity();
  const [recommendations, setRecommendations] = useState<EarningMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<EarningMethod | null>(null);
  const [userInput, setUserInput] = useState<UserInput | null>(null);
  const [sortBy, setSortBy] = useState<'earning' | 'investment' | 'difficulty'>('earning');

  useEffect(() => {
    addPageVisit('Recommendations Page');
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    setIsLoading(true);
    
    // Get user input from localStorage
    const savedInput = localStorage.getItem('earningbee_input');
    if (!savedInput) {
      navigate('/input');
      return;
    }

    const input: UserInput = JSON.parse(savedInput);
    setUserInput(input);

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Filter methods based on user input
    const filtered = filterMethods(
      earningMethods,
      input.investment,
      input.monthlyGoal,
      input.preference
    );

    setRecommendations(filtered);
    setIsLoading(false);
  };

  const handleMethodView = (method: EarningMethod) => {
    setSelectedMethod(method);
    incrementRecommendationsViewed();
  };

  const getSortedRecommendations = () => {
    const sorted = [...recommendations];
    
    switch (sortBy) {
      case 'earning':
        return sorted.sort((a, b) => b.maxEarning - a.maxEarning);
      case 'investment':
        return sorted.sort((a, b) => a.minInvestment - b.minInvestment);
      case 'difficulty':
        const difficultyOrder = { 'beginner': 0, 'intermediate': 1, 'advanced': 2 };
        return sorted.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
      default:
        return sorted;
    }
  };

  const getMatchScore = (method: EarningMethod) => {
    if (!userInput) return 0;
    
    let score = 0;
    
    // Investment match (higher score for closer match)
    const investmentMatch = Math.max(0, 100 - Math.abs(method.minInvestment - userInput.investment) / userInput.investment * 100);
    score += investmentMatch * 0.3;
    
    // Earning potential match
    const earningMatch = Math.min(100, (method.maxEarning / userInput.monthlyGoal) * 100);
    score += earningMatch * 0.5;
    
    // Preference match
    if (userInput.preference === 'both' || method.category === userInput.preference) {
      score += 20;
    }
    
    return Math.min(100, Math.max(0, score));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bee-50 via-white to-bee-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <div className="relative mx-auto w-20 h-20 bg-gradient-to-br from-bee-400 to-bee-600 rounded-full flex items-center justify-center animate-buzz">
              <div className="w-12 h-12 bg-black rounded-full relative">
                <div className="absolute inset-0 bg-bee-400 rounded-full">
                  <div className="absolute top-1 left-0 right-0 h-1 bg-black rounded-full"></div>
                  <div className="absolute top-3 left-0 right-0 h-1 bg-black rounded-full"></div>
                  <div className="absolute top-5 left-0 right-0 h-1 bg-black rounded-full"></div>
                </div>
                <div className="absolute -top-1 -left-2 w-4 h-5 bg-white opacity-80 rounded-full animate-buzz"></div>
                <div className="absolute -top-1 -right-2 w-4 h-5 bg-white opacity-80 rounded-full animate-buzz" style={{ animationDelay: '0.1s' }}></div>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            BeeBot is finding your perfect matches...
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Analyzing 50+ earning methods based on your preferences
          </p>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bee-50 via-white to-bee-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/input')}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Your Personalized Recommendations
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {recommendations.length} perfect matches found for your goals
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-bee-400 text-gray-800 dark:text-white"
            >
              <option value="earning">Sort by Earning Potential</option>
              <option value="investment">Sort by Investment Required</option>
              <option value="difficulty">Sort by Difficulty</option>
            </select>
          </div>
        </motion.div>

        {/* User Input Summary */}
        {userInput && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Based on Your Preferences:
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-bee-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Investment</p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    ${userInput.investment.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Goal</p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    ${userInput.monthlyGoal.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Filter className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Preference</p>
                  <p className="font-semibold text-gray-800 dark:text-white capitalize">
                    {userInput.preference}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recommendations Grid */}
        {recommendations.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {getSortedRecommendations().map((method, index) => (
              <div key={method.id} className="relative">
                <MethodCard
                  method={method}
                  index={index}
                  onView={() => handleMethodView(method)}
                />
                
                {/* Match Score Badge */}
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-bee-400 to-bee-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {Math.round(getMatchScore(method))}% Match
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Lightbulb className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              No Perfect Matches Found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              Try adjusting your investment amount or monthly goal to see more opportunities.
            </p>
            <button
              onClick={() => navigate('/input')}
              className="px-6 py-3 bg-gradient-to-r from-bee-400 to-bee-600 text-white rounded-lg hover:from-bee-500 hover:to-bee-700 transition-all"
            >
              Adjust Preferences
            </button>
          </motion.div>
        )}

        {/* Premium Upgrade CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Want More Earning Ideas?</h3>
          <p className="text-lg mb-6 opacity-90">
            Upgrade to Premium for access to exclusive high-earning methods, detailed guides, and personalized coaching.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <span className="text-3xl font-bold">$25</span>
            <span className="text-lg opacity-75">one-time payment</span>
          </div>
          <button className="mt-6 px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg">
            Upgrade to Premium
          </button>
        </motion.div>
      </div>

      {/* Method Detail Modal */}
      <AnimatePresence>
        {selectedMethod && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMethod(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {selectedMethod.name}
                </h2>
                <button
                  onClick={() => setSelectedMethod(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>

              <img
                src={selectedMethod.image}
                alt={selectedMethod.name}
                className="w-full h-48 object-cover rounded-lg mb-6"
              />

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedMethod.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      Investment Range
                    </h3>
                    <p className="text-2xl font-bold text-bee-600 dark:text-bee-400">
                      ${selectedMethod.minInvestment} - ${selectedMethod.maxInvestment}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      Earning Potential
                    </h3>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ${selectedMethod.minEarning} - ${selectedMethod.maxEarning}/month
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Requirements
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMethod.requirements.map((req, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-bee-100 dark:bg-bee-900 text-bee-800 dark:text-bee-200 rounded-full text-sm"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {selectedMethod.timeToStart}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedMethod.difficulty === 'beginner' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : selectedMethod.difficulty === 'intermediate'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {selectedMethod.difficulty}
                  </span>
                </div>

                <div className="flex space-x-4 pt-4">
                  <a
                    href={selectedMethod.learningLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
                  >
                    Start Learning
                  </a>
                  <a
                    href={selectedMethod.platformLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg text-center font-medium hover:bg-green-700 transition-colors"
                  >
                    Visit Platform
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecommendationsPage;