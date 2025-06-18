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

export interface User {
  privateKey: string;
  faceScanned: boolean;
  createdAt: Date;
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