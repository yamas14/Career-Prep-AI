import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Play, Square, RefreshCw } from 'lucide-react';
import InterviewSetup from './InterviewSetup';
import InterviewFeedback from './InterviewFeedback';

type InterviewState = 'setup' | 'active' | 'feedback';

const MockInterview = () => {
  const [interviewState, setInterviewState] = useState<InterviewState>('setup');
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState<string>('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    // Cleanup function to stop recording when component unmounts
    return () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);

  const startInterview = (jobRole: string, experienceLevel: string) => {
    setCurrentQuestion('Tell me about your experience with React development and any significant projects you\'ve worked on.');
    setInterviewState('active');
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        // Convert speech to text
        try {
          const formData = new FormData();
          formData.append('audio', audioBlob);
          
          // Here you would typically send the audio to a speech-to-text service
          // For now, we'll simulate the response
          const transcribedText = "This is a simulated response from speech-to-text conversion. In a production environment, this would be the actual transcribed text from your audio recording.";
          setResponse(transcribedText);
        } catch (error) {
          console.error('Speech to text conversion failed:', error);
          setError('Failed to convert speech to text. Please try again.');
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setError('');
    } catch (err) {
      console.error('Failed to start recording:', err);
      setError('Failed to access microphone. Please ensure you have granted microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const endInterview = () => {
    if (isRecording) {
      stopRecording();
    }
    setInterviewState('feedback');
  };

  const restartInterview = () => {
    if (isRecording) {
      stopRecording();
    }
    setInterviewState('setup');
    setCurrentQuestion('');
    setResponse('');
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {interviewState === 'setup' && (
        <InterviewSetup onStart={startInterview} />
      )}

      {interviewState === 'active' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mock Interview in Progress</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-lg text-gray-700">{currentQuestion}</p>
            </div>
          </div>

          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-4 min-h-[200px]">
              <p className="text-gray-600">{response || 'Your response will appear here after recording...'}</p>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={toggleRecording}
                className={`flex items-center px-4 py-2 rounded-full ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-indigo-500 hover:bg-indigo-600'
                } text-white transition-colors`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="h-5 w-5 mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5 mr-2" />
                    Start Recording
                  </>
                )}
              </button>

              <button
                onClick={endInterview}
                className="flex items-center px-4 py-2 rounded-full bg-gray-500 hover:bg-gray-600 text-white transition-colors"
              >
                <Square className="h-5 w-5 mr-2" />
                End Interview
              </button>

              <button
                onClick={restartInterview}
                className="flex items-center px-4 py-2 rounded-full bg-gray-500 hover:bg-gray-600 text-white transition-colors"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Restart
              </button>
            </div>

            {isRecording && (
              <div className="flex items-center justify-center">
                <div className="animate-pulse flex space-x-2">
                  <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                  <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                  <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {interviewState === 'feedback' && (
        <InterviewFeedback onRestart={restartInterview} />
      )}
    </div>
  );
};

export default MockInterview;