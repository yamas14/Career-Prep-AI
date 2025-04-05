import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import MockInterview from './components/mock-interview/MockInterview';
import AptitudeTest from './components/aptitude/AptitudeTest';
import Forum from './components/forum/Forum';
import ResumeBuilder from './components/resume/ResumeBuilder';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Features />
              </>
            } />
            <Route path="/mock-interview" element={<MockInterview />} />
            <Route path="/aptitude" element={<AptitudeTest />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/resume" element={<ResumeBuilder />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;