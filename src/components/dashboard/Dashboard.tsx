import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { Trophy, Target, Clock, Star } from 'lucide-react';
import ProgressCard from './ProgressCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { currentPlan, plans } = useLearning();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your dashboard</h2>
        </div>
      </div>
    );
  }

  const completedTasks = currentPlan?.milestones.reduce((acc, milestone) => 
    acc + milestone.tasks.filter(task => task.completed).length, 0
  ) || 0;

  const totalTasks = currentPlan?.milestones.reduce((acc, milestone) => 
    acc + milestone.tasks.length, 0
  ) || 0;

  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Continue your learning journey and track your progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Points</p>
                <p className="text-2xl font-bold text-pink-500">{user.points}</p>
              </div>
              <Trophy className="h-8 w-8 text-pink-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Level</p>
                <p className="text-2xl font-bold text-blue-500">{user.level}</p>
              </div>
              <Star className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed Tasks</p>
                <p className="text-2xl font-bold text-green-500">{completedTasks}</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Plans</p>
                <p className="text-2xl font-bold text-purple-500">{plans.length}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Current Learning Plan */}
        {currentPlan && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ProgressCard plan={currentPlan} />
            </div>

            <div className="space-y-6">
              {/* Weekly Challenge */}
              <div className="bg-gradient-to-r from-pink-500 to-blue-500 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Weekly Challenge 🎯</h3>
                <p className="text-pink-100 mb-4">
                  Complete 5 tasks this week to earn 50 bonus points!
                </p>
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Progress</span>
                    <span className="text-sm">3/5</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Badges</h3>
                <div className="space-y-3">
                  {user.badges.length > 0 ? (
                    user.badges.map((badge) => (
                      <div key={badge.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <span className="text-lg">{badge.icon}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{badge.name}</p>
                          <p className="text-sm text-gray-600">{badge.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-center py-4">
                      Complete tasks to earn your first badge!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {!currentPlan && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Start Your Learning Journey
            </h2>
            <p className="text-gray-600 mb-8">
              Create your first learning plan to get started
            </p>
            <button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Create Learning Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;