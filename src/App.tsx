import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LearningProvider } from './context/LearningContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/home/Hero';
import PrebuiltPlans from './components/home/PrebuiltPlans';
import Dashboard from './components/dashboard/Dashboard';
import QuizSystem from './components/learning/QuizSystem';

type View = 'home' | 'dashboard' | 'quiz';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'quiz':
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
              <QuizSystem
                quiz={{
                  id: '1',
                  title: 'Web Development Basics',
                  field: 'Web Development',
                  difficulty: 'beginner',
                  questions: [
                    {
                      id: '1',
                      question: 'What does HTML stand for?',
                      options: [
                        'HyperText Markup Language',
                        'High Tech Modern Language',
                        'Home Tool Markup Language',
                        'Hyperlink and Text Markup Language'
                      ],
                      correctAnswer: 0,
                      explanation: 'HTML stands for HyperText Markup Language, which is the standard markup language for creating web pages.'
                    },
                    {
                      id: '2',
                      question: 'Which CSS property is used to change the text color?',
                      options: ['color', 'text-color', 'font-color', 'text-style'],
                      correctAnswer: 0,
                      explanation: 'The "color" property in CSS is used to set the color of text.'
                    }
                  ],
                  timeLimit: 300
                }}
                onComplete={(score) => {
                  console.log('Quiz completed with score:', score);
                  setCurrentView('dashboard');
                }}
              />
            </div>
          </div>
        );
      default:
        return (
          <>
            <Hero />
            <PrebuiltPlans />
          </>
        );
    }
  };

  // Add navigation handler
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'dashboard') setCurrentView('dashboard');
      else if (hash === 'quiz') setCurrentView('quiz');
      else setCurrentView('home');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <AuthProvider>
      <LearningProvider>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            {renderCurrentView()}
          </main>
          <Footer />
        </div>
      </LearningProvider>
    </AuthProvider>
  );
}

export default App;