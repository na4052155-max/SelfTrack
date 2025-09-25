import React, { useState } from 'react';
import { Menu, X, User, LogOut, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './auth/LoginModal';
import SignupModal from './auth/SignupModal';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-pink-500 to-blue-500 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                LearnPath
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-pink-500 transition-colors">Home</a>
              <a href="#roadmaps" className="text-gray-700 hover:text-pink-500 transition-colors">Roadmaps</a>
              <a href="#dashboard" className="text-gray-700 hover:text-pink-500 transition-colors">Dashboard</a>
              <a href="#challenges" className="text-gray-700 hover:text-pink-500 transition-colors">Challenges</a>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-700">{user.name}</span>
                    <div className="bg-pink-100 px-2 py-1 rounded-full text-xs text-pink-600 font-medium">
                      {user.points} pts
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 text-gray-500 hover:text-pink-500 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="text-gray-700 hover:text-pink-500 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowSignupModal(true)}
                    className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-pink-100">
            <nav className="px-4 py-4 space-y-2">
              <a href="#home" className="block py-2 text-gray-700 hover:text-pink-500">Home</a>
              <a href="#roadmaps" className="block py-2 text-gray-700 hover:text-pink-500">Roadmaps</a>
              <a href="#dashboard" className="block py-2 text-gray-700 hover:text-pink-500">Dashboard</a>
              <a href="#challenges" className="block py-2 text-gray-700 hover:text-pink-500">Challenges</a>
            </nav>
          </div>
        )}
      </header>

      {/* Modals */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      {showSignupModal && <SignupModal onClose={() => setShowSignupModal(false)} />}
    </>
  );
};

export default Header;