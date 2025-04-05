import React from 'react';
import { Brain, BookOpen, MessageSquare, FileText, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-indigo-600 text-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
            <Brain className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold">CareerPrep AI</span>
          </Link>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/mock-interview" className="flex items-center px-3 py-2 rounded-md hover:bg-indigo-700">
                <BookOpen className="h-5 w-5 mr-1" />
                Mock Interview
              </Link>
              <Link to="/aptitude" className="flex items-center px-3 py-2 rounded-md hover:bg-indigo-700">
                <Trophy className="h-5 w-5 mr-1" />
                Aptitude Tests
              </Link>
              <Link to="/forum" className="flex items-center px-3 py-2 rounded-md hover:bg-indigo-700">
                <MessageSquare className="h-5 w-5 mr-1" />
                Forum
              </Link>
              <Link to="/resume" className="flex items-center px-3 py-2 rounded-md hover:bg-indigo-700">
                <FileText className="h-5 w-5 mr-1" />
                Resume Builder
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;