import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface BeeBotProps {
  onNavigate: (page: string) => void;
  onStartSearch: () => void;
  currentRecommendations?: any[];
}

const BeeBot: React.FC<BeeBotProps> = ({ onNavigate, onStartSearch, currentRecommendations }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const speechSynthesis = useRef<SpeechSynthesis | null>(null);
  const recognition = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Initialize Speech APIs
    if ('speechSynthesis' in window) {
      speechSynthesis.current = window.speechSynthesis;
    }

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(transcript);
        setIsListening(false);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (speechSynthesis.current) {
        speechSynthesis.current.cancel();
      }
    };
  }, []);

  const speak = (text: string) => {
    if (speechSynthesis.current) {
      speechSynthesis.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.current.speak(utterance);
    }
  };

  const handleVoiceCommand = (command: string) => {
    setMessage(`Command: "${command}"`);
    
    if (command.includes('home') || command.includes('landing')) {
      onNavigate('/');
      speak('Navigating to home page');
    } else if (command.includes('search') || command.includes('find') || command.includes('recommend')) {
      onStartSearch();
      speak('Starting your earning search');
    } else if (command.includes('input') || command.includes('form')) {
      onNavigate('/input');
      speak('Opening earning input form');
    } else if (command.includes('results') || command.includes('recommendations')) {
      onNavigate('/recommendations');
      speak('Showing your recommendations');
    } else if (command.includes('activity') || command.includes('stats')) {
      onNavigate('/activity');
      speak('Opening your activity dashboard');
    } else if (command.includes('about')) {
      onNavigate('/about');
      speak('Opening about page');
    } else if (command.includes('speak') && currentRecommendations) {
      speakRecommendations();
    } else {
      speak('I can help you navigate, start searches, or speak your recommendations. Try saying "go home", "start search", or "speak recommendations"');
    }

    setTimeout(() => setMessage(''), 3000);
  };

  const speakRecommendations = () => {
    if (currentRecommendations && currentRecommendations.length > 0) {
      const text = `Here are your earning recommendations: ${currentRecommendations.map((method, index) => 
        `${index + 1}. ${method.name} in ${method.category} category, with potential earnings from ${method.minEarning} to ${method.maxEarning} dollars per month`
      ).join('. ')}`;
      speak(text);
    } else {
      speak('No recommendations available. Please complete the earning input form first.');
    }
  };

  const startListening = () => {
    if (recognition.current) {
      setIsListening(true);
      recognition.current.start();
    } else {
      speak('Voice recognition is not supported in your browser');
    }
  };

  const stopListening = () => {
    if (recognition.current) {
      recognition.current.stop();
    }
    setIsListening(false);
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      speechSynthesis.current?.cancel();
      setIsSpeaking(false);
    } else {
      speak('Hello! I\'m BeeBot, your smart earning advisor. I can help you navigate the app, start searches, and speak your recommendations. Just click the microphone and tell me what you need!');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute bottom-20 right-0 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 w-72 border border-bee-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 dark:text-white">BeeBot Assistant</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <button
                  onClick={() => onNavigate('/')}
                  className="p-2 bg-bee-100 dark:bg-bee-900 text-bee-800 dark:text-bee-200 rounded-lg hover:bg-bee-200 dark:hover:bg-bee-800 transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => onNavigate('/input')}
                  className="p-2 bg-bee-100 dark:bg-bee-900 text-bee-800 dark:text-bee-200 rounded-lg hover:bg-bee-200 dark:hover:bg-bee-800 transition-colors"
                >
                  Input
                </button>
                <button
                  onClick={() => onNavigate('/recommendations')}
                  className="p-2 bg-bee-100 dark:bg-bee-900 text-bee-800 dark:text-bee-200 rounded-lg hover:bg-bee-200 dark:hover:bg-bee-800 transition-colors"
                >
                  Results
                </button>
                <button
                  onClick={() => onNavigate('/activity')}
                  className="p-2 bg-bee-100 dark:bg-bee-900 text-bee-800 dark:text-bee-200 rounded-lg hover:bg-bee-200 dark:hover:bg-bee-800 transition-colors"
                >
                  Activity
                </button>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`flex-1 p-2 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                    isListening 
                      ? 'bg-red-500 text-white' 
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                  <span className="text-sm">{isListening ? 'Stop' : 'Listen'}</span>
                </button>
                
                <button
                  onClick={toggleSpeech}
                  className={`p-2 rounded-lg transition-colors ${
                    isSpeaking 
                      ? 'bg-red-500 text-white' 
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>
              
              {message && (
                <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  {message}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        animate={{
          scale: isListening || isSpeaking ? 1.1 : 1,
          rotate: isSpeaking ? [0, -5, 5, -5, 0] : 0,
        }}
        transition={{
          rotate: {
            duration: 0.5,
            repeat: isSpeaking ? Infinity : 0,
          },
          scale: {
            duration: 0.2,
          }
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isListening 
            ? 'bg-red-500 animate-pulse' 
            : isSpeaking 
              ? 'bg-blue-500 animate-buzz' 
              : 'bg-gradient-to-br from-bee-400 to-bee-600 hover:from-bee-500 hover:to-bee-700'
        }`}
      >
        {/* Bee Body */}
        <div className="relative">
          <div className="w-8 h-8 bg-black rounded-full relative">
            {/* Bee Stripes */}
            <div className="absolute inset-0 bg-bee-400 rounded-full">
              <div className="absolute top-1 left-0 right-0 h-1 bg-black rounded-full"></div>
              <div className="absolute top-3 left-0 right-0 h-1 bg-black rounded-full"></div>
              <div className="absolute top-5 left-0 right-0 h-1 bg-black rounded-full"></div>
            </div>
            
            {/* Bee Wings */}
            <div className="absolute -top-1 -left-2 w-3 h-4 bg-white opacity-80 rounded-full animate-buzz"></div>
            <div className="absolute -top-1 -right-2 w-3 h-4 bg-white opacity-80 rounded-full animate-buzz" style={{ animationDelay: '0.1s' }}></div>
            
            {/* Bee Eyes */}
            <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Status indicators */}
        {isListening && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <Mic size={10} className="text-white" />
          </div>
        )}
        
        {isSpeaking && (
          <div className="absolute -top-1 -left-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
            <Volume2 size={10} className="text-white" />
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default BeeBot;