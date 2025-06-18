import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Search, 
  Eye, 
  BarChart3, 
  Calendar,
  TrendingUp,
  Award,
  Target
} from 'lucide-react';
import { useActivity } from '../contexts/ActivityContext';

const ActivityPage: React.FC = () => {
  const navigate = useNavigate();
  const { activityData, resetActivity, addPageVisit } = useActivity();

  useEffect(() => {
    addPageVisit('Activity Page');
  }, []);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const getUniquePages = () => {
    return [...new Set(activityData.pagesVisited)];
  };

  const getEngagementLevel = () => {
    const totalTime = activityData.timeSpent;
    const searches = activityData.searchCount;
    const recommendations = activityData.recommendationsViewed;
    
    const score = (totalTime / 60) + (searches * 10) + (recommendations * 5);
    
    if (score >= 100) return { level: 'Expert', color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900' };
    if (score >= 50) return { level: 'Advanced', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900' };
    if (score >= 20) return { level: 'Intermediate', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900' };
    return { level: 'Beginner', color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900' };
  };

  const engagement = getEngagementLevel();

  const stats = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Time Spent',
      value: formatTime(activityData.timeSpent),
      description: 'Total time exploring opportunities',
      color: 'text-blue-600',
      bg: 'bg-blue-100 dark:bg-blue-900'
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Searches Performed',
      value: activityData.searchCount.toString(),
      description: 'Earning opportunity searches',
      color: 'text-green-600',
      bg: 'bg-green-100 dark:bg-green-900'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Recommendations Viewed',
      value: activityData.recommendationsViewed.toString(),
      description: 'Detailed method explorations',
      color: 'text-purple-600',
      bg: 'bg-purple-100 dark:bg-purple-900'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Pages Visited',
      value: getUniquePages().length.toString(),
      description: 'Different sections explored',
      color: 'text-orange-600',
      bg: 'bg-orange-100 dark:bg-orange-900'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bee-50 via-white to-bee-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Your Activity Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Track your earning exploration journey
              </p>
            </div>
          </div>

          <button
            onClick={resetActivity}
            className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
          >
            Reset Activity
          </button>
        </motion.div>

        {/* Engagement Level */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className={`${engagement.bg} rounded-xl p-6 border border-gray-200 dark:border-gray-700`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 ${engagement.bg} rounded-lg`}>
                  <Award className={`w-8 h-8 ${engagement.color}`} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {engagement.level} Explorer
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Your current engagement level
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Session started</p>
                <p className="font-semibold text-gray-800 dark:text-white">
                  {new Date(activityData.startTime).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
            >
              <div className={`${stat.bg} w-fit p-3 rounded-lg mb-4`}>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Analytics */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pages Visited */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Pages Explored
              </h3>
            </div>

            <div className="space-y-3">
              {getUniquePages().map((page, index) => {
                const visitCount = activityData.pagesVisited.filter(p => p === page).length;
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-800 dark:text-white font-medium">
                      {page}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                      {visitCount} visit{visitCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                );
              })}
              
              {getUniquePages().length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No pages visited yet
                </p>
              )}
            </div>
          </motion.div>

          {/* Progress & Goals */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Exploration Progress
              </h3>
            </div>

            <div className="space-y-6">
              {/* Time Goal */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Time Spent Goal (10 minutes)
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {Math.min(100, Math.round((activityData.timeSpent / 600) * 100))}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-bee-400 to-bee-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (activityData.timeSpent / 600) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Search Goal */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Search Goal (3 searches)
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {Math.min(100, Math.round((activityData.searchCount / 3) * 100))}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (activityData.searchCount / 3) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Recommendations Goal */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Recommendations Goal (5 viewed)
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {Math.min(100, Math.round((activityData.recommendationsViewed / 5) * 100))}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (activityData.recommendationsViewed / 5) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Achievements Unlocked
              </h4>
              <div className="flex flex-wrap gap-2">
                {activityData.timeSpent >= 60 && (
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                    🕐 First Minute
                  </span>
                )}
                {activityData.searchCount >= 1 && (
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                    🔍 First Search
                  </span>
                )}
                {activityData.recommendationsViewed >= 1 && (
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs font-medium">
                    👁️ First View
                  </span>
                )}
                {getUniquePages().length >= 3 && (
                  <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-xs font-medium">
                    🗺️ Explorer
                  </span>
                )}
                {activityData.timeSpent >= 600 && (
                  <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-xs font-medium">
                    ⏰ Time Master
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Session Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-bee-100 to-bee-200 dark:from-bee-900/30 dark:to-bee-800/30 rounded-2xl p-6 border border-bee-300 dark:border-bee-700"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="w-6 h-6 text-bee-600 dark:text-bee-400" />
            <h3 className="text-xl font-bold text-bee-800 dark:text-bee-200">
              Session Summary
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-bee-600 dark:text-bee-400 font-medium">Started:</span>
              <p className="text-bee-800 dark:text-bee-200">
                {new Date(activityData.startTime).toLocaleString()}
              </p>
            </div>
            <div>
              <span className="text-bee-600 dark:text-bee-400 font-medium">Total Engagement:</span>
              <p className="text-bee-800 dark:text-bee-200">
                {activityData.searchCount + activityData.recommendationsViewed} actions
              </p>
            </div>
            <div>
              <span className="text-bee-600 dark:text-bee-400 font-medium">Efficiency:</span>
              <p className="text-bee-800 dark:text-bee-200">
                {activityData.timeSpent > 0 ? 
                  Math.round((activityData.searchCount + activityData.recommendationsViewed) / (activityData.timeSpent / 60)) : 0
                } actions/min
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ActivityPage;