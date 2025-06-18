import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Edit3, Camera, Save, X, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { UserProfile as UserProfileType } from '../types';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfileType>>(
    user?.profile || {}
  );

  if (!user) return null;

  const handleSave = () => {
    updateProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(user.profile);
    setIsEditing(false);
  };

  const generateNewAvatar = () => {
    const newSeed = Math.random().toString(36).substring(2, 15);
    const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${newSeed}`;
    setEditedProfile(prev => ({ ...prev, profileImage: newAvatar }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {isEditing ? 'Edit Profile' : 'User Profile'}
              </h2>
              <div className="flex space-x-2">
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-gray-500 hover:text-bee-600 dark:text-gray-400 dark:hover:text-bee-400 transition-colors"
                  >
                    <Edit3 size={20} />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Profile Image */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img
                  src={isEditing ? editedProfile.profileImage : user.profile.profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto border-4 border-bee-200 dark:border-bee-700"
                />
                {isEditing && (
                  <button
                    onClick={generateNewAvatar}
                    className="absolute bottom-0 right-0 p-2 bg-bee-500 text-white rounded-full hover:bg-bee-600 transition-colors"
                  >
                    <Camera size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name || ''}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-bee-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white font-medium">{user.profile.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedProfile.email || ''}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-bee-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">{user.profile.email}</p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={editedProfile.bio || ''}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-bee-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none"
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">{user.profile.bio}</p>
                )}
              </div>

              {/* Join Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Member Since
                </label>
                <p className="text-gray-600 dark:text-gray-300">
                  {new Date(user.profile.joinedDate).toLocaleDateString()}
                </p>
              </div>

              {/* Private Key */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Private Key
                </label>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <code className="text-xs text-gray-800 dark:text-gray-200 break-all">
                    {user.privateKey}
                  </code>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Keep this secure! It's your unique identifier.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              {isEditing ? (
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Save size={16} />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-bee-600 text-white px-4 py-2 rounded-lg hover:bg-bee-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Settings size={16} />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={logout}
                    className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserProfile;