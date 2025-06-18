import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  login: (faceData: string) => Promise<string>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('earningbee_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const generatePrivateKey = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'EBee_';
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const generateDefaultProfile = (): UserProfile => {
    const userId = Math.random().toString(36).substring(2, 15);
    return {
      id: userId,
      name: `User_${userId.substring(0, 6)}`,
      email: `user_${userId}@earningbee.com`,
      profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
      bio: 'New EarningBee explorer ready to discover earning opportunities!',
      joinedDate: new Date(),
      preferences: {
        notifications: true,
        darkMode: false,
        language: 'en'
      }
    };
  };

  const login = async (faceData: string): Promise<string> => {
    setIsLoading(true);
    
    // Simulate secure face scan processing (5 seconds)
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Check if user exists (simulate blockchain-like lookup)
    const existingUser = localStorage.getItem(`face_${faceData}`);
    
    let userData: User;
    
    if (existingUser) {
      userData = JSON.parse(existingUser);
    } else {
      // Create new user with profile
      userData = {
        privateKey: generatePrivateKey(),
        faceScanned: true,
        createdAt: new Date(),
        profile: generateDefaultProfile()
      };
      localStorage.setItem(`face_${faceData}`, JSON.stringify(userData));
    }
    
    setUser(userData);
    localStorage.setItem('earningbee_user', JSON.stringify(userData));
    setIsLoading(false);
    
    return userData.privateKey;
  };

  const updateProfile = (profileUpdates: Partial<UserProfile>) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      profile: {
        ...user.profile,
        ...profileUpdates
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem('earningbee_user', JSON.stringify(updatedUser));
    
    // Update face data storage as well
    const faceDataKeys = Object.keys(localStorage).filter(key => key.startsWith('face_'));
    faceDataKeys.forEach(key => {
      const storedUser = JSON.parse(localStorage.getItem(key) || '{}');
      if (storedUser.privateKey === user.privateKey) {
        localStorage.setItem(key, JSON.stringify(updatedUser));
      }
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('earningbee_user');
  };

  const value = {
    user,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};