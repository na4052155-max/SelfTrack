export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  learningPreferences: {
    style: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
    pace: 'slow' | 'medium' | 'fast';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  };
  points: number;
  level: number;
  badges: Badge[];
  joinedAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface LearningPlan {
  id: string;
  title: string;
  description: string;
  field: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: string;
  objectives: string[];
  milestones: Milestone[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  completed: boolean;
  progress: number;
  resources: Resource[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  notes?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  completedAt?: Date;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'article' | 'video' | 'book' | 'course' | 'tool';
  notes?: string;
}

export interface Quiz {
  id: string;
  title: string;
  field: string;
  questions: Question[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeLimit?: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface FlashCard {
  id: string;
  front: string;
  back: string;
  field: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lastReviewed?: Date;
  reviewCount: number;
  correctCount: number;
}

export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  field: string;
  tasks: string[];
  points: number;
  badge?: Badge;
  startDate: Date;
  endDate: Date;
  completed: boolean;
}