import React from 'react';
import { ThumbsUp, AlertCircle, RefreshCw } from 'lucide-react';

interface InterviewFeedbackProps {
  onRestart: () => void;
}

const InterviewFeedback = ({ onRestart }: InterviewFeedbackProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Interview Feedback</h2>

      <div className="space-y-6">
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="flex items-center text-xl font-semibold text-green-800 mb-4">
            <ThumbsUp className="h-6 w-6 mr-2" />
            Strengths
          </h3>
          <ul className="list-disc list-inside space-y-2 text-green-700">
            <li>Clear communication and structured responses</li>
            <li>Good examples to support your points</li>
            <li>Demonstrated technical knowledge effectively</li>
          </ul>
        </div>

        <div className="bg-amber-50 rounded-lg p-6">
          <h3 className="flex items-center text-xl font-semibold text-amber-800 mb-4">
            <AlertCircle className="h-6 w-6 mr-2" />
            Areas for Improvement
          </h3>
          <ul className="list-disc list-inside space-y-2 text-amber-700">
            <li>Consider providing more specific metrics and results</li>
            <li>Could elaborate more on problem-solving approach</li>
            <li>Practice concise responses while maintaining detail</li>
          </ul>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onRestart}
            className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Start New Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewFeedback;