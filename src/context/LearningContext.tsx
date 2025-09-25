import React, { createContext, useContext, useState } from 'react';
import { LearningPlan, Quiz, FlashCard, WeeklyChallenge } from '../types';

interface LearningContextType {
  currentPlan: LearningPlan | null;
  plans: LearningPlan[];
  quizzes: Quiz[];
  flashcards: FlashCard[];
  weeklyChallenge: WeeklyChallenge | null;
  createPlan: (field: string, difficulty: 'beginner' | 'intermediate' | 'advanced') => LearningPlan;
  updatePlanProgress: (planId: string, milestoneId: string, taskId: string) => void;
  addPlan: (plan: LearningPlan) => void;
  generateQuiz: (field: string, difficulty: 'beginner' | 'intermediate' | 'advanced') => Quiz;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPlan, setCurrentPlan] = useState<LearningPlan | null>(null);
  const [plans, setPlans] = useState<LearningPlan[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [flashcards, setFlashcards] = useState<FlashCard[]>([]);
  const [weeklyChallenge, setWeeklyChallenge] = useState<WeeklyChallenge | null>(null);

  const createPlan = (field: string, difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    const newPlan: LearningPlan = {
      id: Date.now().toString(),
      title: `${field} Learning Path`,
      description: `Comprehensive ${difficulty} level plan for mastering ${field}`,
      field,
      difficulty,
      estimatedDuration: difficulty === 'beginner' ? '3-6 months' : difficulty === 'intermediate' ? '6-12 months' : '12-18 months',
      objectives: generateObjectives(field, difficulty),
      milestones: generateMilestones(field, difficulty),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setPlans(prev => [...prev, newPlan]);
    setCurrentPlan(newPlan);
    return newPlan;
  };

  const generateObjectives = (field: string, difficulty: string): string[] => {
    const baseObjectives = [
      `Understand core ${field} concepts`,
      `Apply ${field} principles in practical scenarios`,
      `Build real-world ${field} projects`,
      `Master industry-standard tools and technologies`
    ];
    return baseObjectives;
  };

  const generateMilestones = (field: string, difficulty: string) => {
    // This would typically call an AI service
    return [
      {
        id: '1',
        title: `${field} Fundamentals`,
        description: 'Learn the basic concepts and principles',
        tasks: [
          { id: '1-1', title: 'Complete introduction course', description: 'Watch introductory videos and read materials', completed: false },
          { id: '1-2', title: 'Practice basic exercises', description: 'Complete hands-on exercises', completed: false },
          { id: '1-3', title: 'Take assessment quiz', description: 'Test your understanding', completed: false }
        ],
        completed: false,
        progress: 0,
        resources: [
          { id: 'r1', title: `${field} Documentation`, url: '#', type: 'article' as const, notes: 'Official documentation' }
        ]
      },
      {
        id: '2',
        title: `Intermediate ${field}`,
        description: 'Build on fundamentals with advanced topics',
        tasks: [
          { id: '2-1', title: 'Build first project', description: 'Create a practical application', completed: false },
          { id: '2-2', title: 'Learn advanced concepts', description: 'Study intermediate-level topics', completed: false }
        ],
        completed: false,
        progress: 0,
        resources: []
      }
    ];
  };

  const updatePlanProgress = (planId: string, milestoneId: string, taskId: string) => {
    setPlans(prev => prev.map(plan => {
      if (plan.id === planId) {
        const updatedPlan = { ...plan };
        updatedPlan.milestones = plan.milestones.map(milestone => {
          if (milestone.id === milestoneId) {
            const updatedMilestone = { ...milestone };
            updatedMilestone.tasks = milestone.tasks.map(task => {
              if (task.id === taskId) {
                return { ...task, completed: !task.completed, completedAt: new Date() };
              }
              return task;
            });
            const completedTasks = updatedMilestone.tasks.filter(t => t.completed).length;
            updatedMilestone.progress = (completedTasks / updatedMilestone.tasks.length) * 100;
            updatedMilestone.completed = updatedMilestone.progress === 100;
            return updatedMilestone;
          }
          return milestone;
        });
        return updatedPlan;
      }
      return plan;
    }));
  };

  const addPlan = (plan: LearningPlan) => {
    setPlans(prev => [...prev, plan]);
  };

  const generateQuiz = (field: string, difficulty: 'beginner' | 'intermediate' | 'advanced'): Quiz => {
    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title: `${field} ${difficulty} Quiz`,
      field,
      questions: [
        {
          id: '1',
          question: `What is a fundamental concept in ${field}?`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 0,
          explanation: 'This is the correct answer because...'
        }
      ],
      difficulty,
      timeLimit: 300
    };
    setQuizzes(prev => [...prev, newQuiz]);
    return newQuiz;
  };

  return (
    <LearningContext.Provider value={{
      currentPlan,
      plans,
      quizzes,
      flashcards,
      weeklyChallenge,
      createPlan,
      updatePlanProgress,
      addPlan,
      generateQuiz
    }}>
      {children}
    </LearningContext.Provider>
  );
};