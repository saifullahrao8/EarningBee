import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ActivityData } from '../types';

interface ActivityContextType {
  activityData: ActivityData;
  updateTimeSpent: () => void;
  incrementSearchCount: () => void;
  addPageVisit: (page: string) => void;
  incrementRecommendationsViewed: () => void;
  resetActivity: () => void;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (context === undefined) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
};

export const ActivityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activityData, setActivityData] = useState<ActivityData>(() => {
    const saved = localStorage.getItem('earningbee_activity');
    return saved ? JSON.parse(saved) : {
      timeSpent: 0,
      searchCount: 0,
      pagesVisited: [],
      recommendationsViewed: 0,
      startTime: new Date()
    };
  });

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      updateTimeSpent();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('earningbee_activity', JSON.stringify(activityData));
  }, [activityData]);

  const updateTimeSpent = () => {
    const now = Date.now();
    const timeDiff = Math.floor((now - lastUpdate) / 1000);
    
    setActivityData(prev => ({
      ...prev,
      timeSpent: prev.timeSpent + timeDiff
    }));
    
    setLastUpdate(now);
  };

  const incrementSearchCount = () => {
    setActivityData(prev => ({
      ...prev,
      searchCount: prev.searchCount + 1
    }));
  };

  const addPageVisit = (page: string) => {
    setActivityData(prev => ({
      ...prev,
      pagesVisited: [...prev.pagesVisited, page]
    }));
  };

  const incrementRecommendationsViewed = () => {
    setActivityData(prev => ({
      ...prev,
      recommendationsViewed: prev.recommendationsViewed + 1
    }));
  };

  const resetActivity = () => {
    const newActivity: ActivityData = {
      timeSpent: 0,
      searchCount: 0,
      pagesVisited: [],
      recommendationsViewed: 0,
      startTime: new Date()
    };
    setActivityData(newActivity);
    localStorage.setItem('earningbee_activity', JSON.stringify(newActivity));
  };

  const value = {
    activityData,
    updateTimeSpent,
    incrementSearchCount,
    addPageVisit,
    incrementRecommendationsViewed,
    resetActivity
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};