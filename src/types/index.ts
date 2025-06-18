export interface EarningMethod {
  id: string;
  name: string;
  category: 'online' | 'offline';
  minInvestment: number;
  maxInvestment: number;
  minEarning: number;
  maxEarning: number;
  description: string;
  image: string;
  learningLink: string;
  platformLink: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeToStart: string;
  requirements: string[];
}

export interface UserInput {
  investment: number;
  monthlyGoal: number;
  preference: 'online' | 'offline' | 'both';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  bio: string;
  joinedDate: Date;
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
  };
}

export interface User {
  privateKey: string;
  faceScanned: boolean;
  createdAt: Date;
  profile: UserProfile;
}

export interface ActivityData {
  timeSpent: number;
  searchCount: number;
  pagesVisited: string[];
  recommendationsViewed: number;
  startTime: Date;
}

export interface Theme {
  mode: 'light' | 'dark';
}