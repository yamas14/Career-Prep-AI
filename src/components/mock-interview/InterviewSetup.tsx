import React, { useState } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';

interface InterviewSetupProps {
  onStart: (jobRole: string, experienceLevel: string) => void;
}

const jobRoles = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Data Scientist',
  'UI/UX Designer',
];

const experienceLevels = [
  'Entry Level (0-2 years)',
  'Mid Level (2-5 years)',
  'Senior Level (5+ years)',
];

const InterviewSetup = ({ onStart }: InterviewSetupProps) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');

  const handleStart = () => {
    if (selectedRole && selectedExperience) {
      onStart(selectedRole, selectedExperience);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Setup Your Mock Interview</h2>
      
      <div className="space-y-8">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-4">
            Select Job Role
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobRoles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`flex items-center p-4 rounded-lg border-2 transition-colors ${
                  selectedRole === role
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-200'
                }`}
              >
                <Briefcase className={`h-5 w-5 mr-3 ${
                  selectedRole === role ? 'text-indigo-500' : 'text-gray-400'
                }`} />
                <span className={selectedRole === role ? 'text-indigo-700' : 'text-gray-600'}>
                  {role}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-4">
            Experience Level
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {experienceLevels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedExperience(level)}
                className={`flex items-center p-4 rounded-lg border-2 transition-colors ${
                  selectedExperience === level
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-200'
                }`}
              >
                <GraduationCap className={`h-5 w-5 mr-3 ${
                  selectedExperience === level ? 'text-indigo-500' : 'text-gray-400'
                }`} />
                <span className={selectedExperience === level ? 'text-indigo-700' : 'text-gray-600'}>
                  {level}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleStart}
            disabled={!selectedRole || !selectedExperience}
            className={`px-8 py-3 rounded-full text-white text-lg font-medium transition-colors ${
              selectedRole && selectedExperience
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Start Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewSetup;