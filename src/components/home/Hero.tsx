import React, { useState } from 'react';
import { Search, Sparkles, Target, Trophy } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

const Hero: React.FC = () => {
  const { createPlan } = useLearning();
  const [searchField, setSearchField] = useState('');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchField.trim()) {
      createPlan(searchField, difficulty);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-blue-50 min-h-screen">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-8 left-1/3 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
            Master Any{' '}
            <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              Skill
            </span>{' '}
            with AI
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Get personalized learning roadmaps, track your progress, and achieve your goals with 
            our AI-powered platform designed for modern learners.
          </p>

          {/* Search form */}
          <div className="max-w-2xl mx-auto mb-16">
            <form onSubmit={handleCreatePlan} className="bg-white rounded-2xl shadow-lg border border-pink-100 p-2">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                    placeholder="What do you want to learn? (e.g., Web Development, Machine Learning)"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:ring-0 text-lg"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="px-4 py-4 rounded-xl border-0 bg-gray-50 focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <Sparkles className="h-5 w-5" />
                    Create Plan
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-pink-100">
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Roadmaps</h3>
              <p className="text-gray-600">AI-generated learning paths tailored to your goals and experience level</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-blue-100">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Progress Tracking</h3>
              <p className="text-gray-600">Monitor your learning journey with detailed analytics and achievements</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-purple-100">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Learning</h3>
              <p className="text-gray-600">Engage with quizzes, flashcards, and hands-on projects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;