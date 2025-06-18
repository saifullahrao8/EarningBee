import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (faceData: string) => Promise<string>;
  logout: () => void;
  isAuthenticated: boolean;
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

  const login = async (faceData: string): Promise<string> => {
    // Simulate face scan processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if user exists (simulate blockchain-like lookup)
    const existingUser = localStorage.getItem(`face_${faceData}`);
    
    let userData: User;
    
    if (existingUser) {
      userData = JSON.parse(existingUser);
    } else {
      // Create new user
      userData = {
        privateKey: generatePrivateKey(),
        faceScanned: true,
        createdAt: new Date()
      };
      localStorage.setItem(`face_${faceData}`, JSON.stringify(userData));
    }
    
    setUser(userData);
    localStorage.setItem('earningbee_user', JSON.stringify(userData));
    
    return userData.privateKey;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('earningbee_user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};