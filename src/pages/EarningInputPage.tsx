import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Target, Globe, Monitor, ArrowRight, TrendingUp } from 'lucide-react';
import { useActivity } from '../contexts/ActivityContext';
import { UserInput } from '../types';

const EarningInputPage: React.FC = () => {
  const navigate = useNavigate();
  const { addPageVisit, incrementSearchCount } = useActivity();
  const [formData, setFormData] = useState<UserInput>({
    investment: 0,
    monthlyGoal: 0,
    preference: 'both'
  });
  const [errors, setErrors] = useState<Partial<UserInput>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    addPageVisit('Earning Input Page');
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<UserInput> = {};

    if (formData.investment < 0) {
      newErrors.investment = 0;
    }

    if (formData.monthlyGoal <= 0) {
      newErrors.monthlyGoal = 100;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Save form data to localStorage
    localStorage.setItem('earningbee_input', JSON.stringify(formData));
    
    // Track search
    incrementSearchCount();
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    navigate('/recommendations');
  };

  const handleInputChange = (field: keyof UserInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const investmentRanges = [
    { label: '$0 - No Investment', value: 0 },
    { label: '$1 - $100', value: 50 },
    { label: '$100 - $500', value: 300 },
    { label: '$500 - $1,000', value: 750 },
    { label: '$1,000 - $5,000', value: 3000 },
    { label: '$5,000+', value: 7500 }
  ];

  const goalRanges = [
    { label: '$100 - $500/month', value: 300 },
    { label: '$500 - $1,000/month', value: 750 },
    { label: '$1,000 - $2,500/month', value: 1750 },
    { label: '$2,500 - $5,000/month', value: 3750 },
    { label: '$5,000 - $10,000/month', value: 7500 },
    { label: '$10,000+/month', value: 15000 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bee-50 via-white to-bee-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Tell Us About Your
            <span className="block bg-gradient-to-r from-bee-400 to-bee-600 bg-clip-text text-transparent">
              Earning Goals
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Help us find the perfect earning opportunities tailored to your investment capacity and monthly targets
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Investment Section */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-bee-100 dark:bg-bee-900 rounded-lg">
                  <DollarSign className="w-6 h-6 text-bee-600 dark:text-bee-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Investment Capacity
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    How much can you invest to get started?
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {investmentRanges.map((range) => (
                  <motion.button
                    key={range.value}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleInputChange('investment', range.value)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      formData.investment === range.value
                        ? 'border-bee-400 bg-bee-50 dark:bg-bee-900/20 text-bee-700 dark:text-bee-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-bee-300 dark:hover:border-bee-500'
                    }`}
                  >
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {range.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Custom Investment Input */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Or enter custom amount:
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={formData.investment || ''}
                    onChange={(e) => handleInputChange('investment', parseInt(e.target.value) || 0)}
                    placeholder="Enter amount"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-bee-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Monthly Goal Section */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Monthly Earning Goal
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    What's your target monthly income?
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {goalRanges.map((range) => (
                  <motion.button
                    key={range.value}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleInputChange('monthlyGoal', range.value)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      formData.monthlyGoal === range.value
                        ? 'border-green-400 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {range.label}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Custom Goal Input */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Or enter custom monthly goal:
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    min="1"
                    step="10"
                    value={formData.monthlyGoal || ''}
                    onChange={(e) => handleInputChange('monthlyGoal', parseInt(e.target.value) || 0)}
                    placeholder="Enter monthly goal"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-bee-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </div>
                {errors.monthlyGoal && (
                  <p className="text-red-500 text-sm mt-1">Monthly goal must be at least $1</p>
                )}
              </div>
            </div>

            {/* Preference Section */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Earning Preference
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Do you prefer online or offline earning methods?
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleInputChange('preference', 'online')}
                  className={`p-6 rounded-xl border-2 transition-all text-center ${
                    formData.preference === 'online'
                      ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                  }`}
                >
                  <Monitor className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Online</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Work from anywhere with internet-based opportunities
                  </p>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleInputChange('preference', 'offline')}
                  className={`p-6 rounded-xl border-2 transition-all text-center ${
                    formData.preference === 'offline'
                      ? 'border-purple-400 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500'
                  }`}
                >
                  <Globe className="w-8 h-8 mx-auto mb-3 text-purple-500" />
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Offline</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Local, in-person earning opportunities in your area
                  </p>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleInputChange('preference', 'both')}
                  className={`p-6 rounded-xl border-2 transition-all text-center ${
                    formData.preference === 'both'
                      ? 'border-bee-400 bg-bee-50 dark:bg-bee-900/20 text-bee-700 dark:text-bee-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-bee-300 dark:hover:border-bee-500'
                  }`}
                >
                  <div className="flex justify-center space-x-1 mb-3">
                    <Monitor className="w-6 h-6 text-bee-500" />
                    <Globe className="w-6 h-6 text-bee-500" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Both</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Show me all opportunities for maximum options
                  </p>
                </motion.button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="pt-8"
            >
              <button
                type="submit"
                disabled={isSubmitting || formData.monthlyGoal <= 0}
                className="w-full py-4 bg-gradient-to-r from-bee-400 to-bee-600 text-white rounded-xl text-lg font-semibold hover:from-bee-500 hover:to-bee-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Finding Your Perfect Match...</span>
                  </div>
                ) : (
                  <>
                    <span>Get My Recommendations</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>

        {/* Summary Card */}
        {(formData.investment > 0 || formData.monthlyGoal > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-gradient-to-r from-bee-100 to-bee-200 dark:from-bee-900/30 dark:to-bee-800/30 rounded-2xl p-6 border border-bee-300 dark:border-bee-700"
          >
            <h3 className="text-lg font-semibold text-bee-800 dark:text-bee-200 mb-4">
              Your Earning Profile Summary
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-bee-600 dark:text-bee-400 font-medium">Investment:</span>
                <p className="text-bee-800 dark:text-bee-200">
                  ${formData.investment.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-bee-600 dark:text-bee-400 font-medium">Monthly Goal:</span>
                <p className="text-bee-800 dark:text-bee-200">
                  ${formData.monthlyGoal.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-bee-600 dark:text-bee-400 font-medium">Preference:</span>
                <p className="text-bee-800 dark:text-bee-200 capitalize">
                  {formData.preference}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EarningInputPage;