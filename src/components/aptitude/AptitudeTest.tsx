import React, { useState, useEffect } from 'react';
import { Clock, Brain, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    category: 'Quantitative',
    question: 'If a train travels 420 kilometers in 7 hours, what is its average speed in kilometers per hour?',
    options: ['50 km/h', '60 km/h', '65 km/h', '70 km/h'],
    correctAnswer: 1,
  },
  {
    id: 2,
    category: 'Logical Reasoning',
    question: 'Which number should come next in the pattern? 2, 6, 12, 20, 30, __',
    options: ['35', '40', '42', '45'],
    correctAnswer: 2,
  },
  {
    id: 3,
    category: 'Verbal',
    question: 'Choose the word that is most nearly opposite in meaning to "BENEVOLENT"',
    options: ['Malevolent', 'Charitable', 'Generous', 'Kind'],
    correctAnswer: 0,
  },
];

const AptitudeTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(900); // 15 minutes in seconds
  const [testStatus, setTestStatus] = useState<'not-started' | 'in-progress' | 'completed'>('not-started');
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (testStatus === 'in-progress' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setTestStatus('completed');
            calculateScore();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [testStatus, timeLeft]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startTest = () => {
    setTestStatus('in-progress');
    setSelectedAnswers(new Array(sampleQuestions.length).fill(-1));
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answerIndex;
      return newAnswers;
    });
  };

  const calculateScore = () => {
    const correctAnswers = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === sampleQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
    setScore(correctAnswers);
  };

  const submitTest = () => {
    setTestStatus('completed');
    calculateScore();
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setTimeLeft(900);
    setTestStatus('not-started');
    setScore(0);
  };

  if (testStatus === 'not-started') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Aptitude Test</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Test Instructions</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Total duration: 15 minutes</li>
                <li>• Number of questions: {sampleQuestions.length}</li>
                <li>• Categories: Quantitative, Logical Reasoning, Verbal</li>
                <li>• All questions are multiple choice</li>
                <li>• No negative marking</li>
              </ul>
            </div>
            <button
              onClick={startTest}
              className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              <Brain className="h-5 w-5 mr-2" />
              Start Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (testStatus === 'completed') {
    const percentage = (score / sampleQuestions.length) * 100;
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Test Results</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-indigo-600 mb-4">{percentage}%</div>
                <p className="text-xl text-gray-600">Your Score: {score} out of {sampleQuestions.length}</p>
              </div>
            </div>
            <div className="space-y-4">
              {sampleQuestions.map((question, index) => (
                <div key={question.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    {selectedAnswers[index] === question.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-1" />
                    )}
                    <div>
                      <p className="text-gray-800 font-medium">{question.question}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Correct answer: {question.options[question.correctAnswer]}
                      </p>
                      {selectedAnswers[index] !== question.correctAnswer && (
                        <p className="text-sm text-red-600 mt-1">
                          Your answer: {selectedAnswers[index] === -1 ? 'Not answered' : question.options[selectedAnswers[index]]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={restartTest}
              className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Take Another Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Question {currentQuestion + 1}/{sampleQuestions.length}</h2>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="h-5 w-5" />
            <span className="font-mono text-xl">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-sm text-indigo-600 font-medium mb-2">{sampleQuestions[currentQuestion].category}</div>
            <p className="text-lg text-gray-800">{sampleQuestions[currentQuestion].question}</p>
          </div>

          <div className="space-y-3">
            {sampleQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestion, index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-between space-x-4">
            <button
              onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="px-6 py-2 rounded-lg border-2 border-gray-200 hover:border-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {currentQuestion === sampleQuestions.length - 1 ? (
              <button
                onClick={submitTest}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion((prev) => Math.min(sampleQuestions.length - 1, prev + 1))}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Next
              </button>
            )}
          </div>

          <div className="flex justify-center space-x-2">
            {sampleQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded-full ${
                  currentQuestion === index
                    ? 'bg-indigo-600 text-white'
                    : selectedAnswers[index] !== -1
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AptitudeTest;