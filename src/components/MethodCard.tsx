import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, DollarSign, Clock, TrendingUp } from 'lucide-react';
import { EarningMethod } from '../types';

interface MethodCardProps {
  method: EarningMethod;
  index: number;
  onView: () => void;
}

const MethodCard: React.FC<MethodCardProps> = ({ method, index, onView }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    return category === 'online' 
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={method.image}
          alt={method.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(method.category)}`}>
            {method.category}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(method.difficulty)}`}>
            {method.difficulty}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-bee-600 dark:group-hover:text-bee-400 transition-colors">
          {method.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {method.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <DollarSign size={16} className="text-green-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Investment</span>
            </div>
            <p className="font-semibold text-gray-800 dark:text-white">
              ${method.minInvestment} - ${method.maxInvestment}
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <TrendingUp size={16} className="text-bee-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Monthly</span>
            </div>
            <p className="font-semibold text-gray-800 dark:text-white">
              ${method.minEarning} - ${method.maxEarning}
            </p>
          </div>
        </div>

        {/* Time to Start */}
        <div className="flex items-center space-x-2 mb-4">
          <Clock size={16} className="text-gray-500" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Time to start: {method.timeToStart}
          </span>
        </div>

        {/* Requirements */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Requirements:</p>
          <div className="flex flex-wrap gap-1">
            {method.requirements.slice(0, 3).map((req, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-bee-100 dark:bg-bee-900 text-bee-800 dark:text-bee-200 text-xs rounded-full"
              >
                {req}
              </span>
            ))}
            {method.requirements.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                +{method.requirements.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <a
            href={method.learningLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center justify-center space-x-1"
          >
            <BookOpen size={14} />
            <span>Learn</span>
          </a>
          
          <a
            href={method.platformLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-200 dark:hover:bg-green-800 transition-colors flex items-center justify-center space-x-1"
          >
            <ExternalLink size={14} />
            <span>Platform</span>
          </a>
          
          <button
            onClick={onView}
            className="px-4 py-2 bg-gradient-to-r from-bee-400 to-bee-600 text-white rounded-lg text-sm font-medium hover:from-bee-500 hover:to-bee-700 transition-all"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MethodCard;