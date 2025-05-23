import React from 'react';
import { Monitor, BookOpen, Users, FileText } from 'lucide-react';

const features = [
  {
    name: 'AI Mock Interviews',
    description: 'Practice with our AI interviewer that adapts to your responses and provides real-time feedback.',
    icon: Monitor,
  },
  {
    name: 'Aptitude Tests',
    description: 'Comprehensive practice tests covering quantitative, logical reasoning, and verbal ability.',
    icon: BookOpen,
  },
  {
    name: 'Discussion Forum',
    description: 'Connect with peers, share experiences, and get advice from industry professionals.',
    icon: Users,
  },
  {
    name: 'Resume Builder',
    description: 'Create professional resumes and cover letters with our AI-powered tools.',
    icon: FileText,
  },
];

const Features = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to succeed
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;