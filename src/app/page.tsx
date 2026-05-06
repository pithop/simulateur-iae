"use client";

import { useState, useEffect } from 'react';
import Timer from '@/components/Timer';
import QuestionCard from '@/components/QuestionCard';
import NavigationGrid from '@/components/NavigationGrid';
import ResultsBoard from '@/components/ResultsBoard';

interface Question {
  id: number;
  test_id: number;
  category: string;
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

type TestState = 'home' | 'active' | 'results';
type TestMode = 'test' | 'revision' | null;

export default function Home() {
  const [testState, setTestState] = useState<TestState>('home');
  const [testMode, setTestMode] = useState<TestMode>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to load questions", err);
        setIsLoading(false);
      });
  }, []);

  const startTest = (mode: 'test' | 'revision') => {
    setTestMode(mode);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTestState('active');
  };

  const endTest = () => {
    if (testMode === 'test') {
      setTestState('results');
    } else {
      setTestState('home');
      setTestMode(null);
    }
  };

  const handleSelectAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };

  const filteredQuestions = testMode === 'revision' && selectedCategory !== 'Toutes'
    ? questions.filter(q => q.category === selectedCategory)
    : questions;

  const nextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (testMode === 'revision') {
      // Loop back to start in revision mode
      setCurrentQuestionIndex(0);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div></div>;
  }

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  
  // Get unique categories for the filter
  const categories = ['Toutes', ...Array.from(new Set(questions.map(q => q.category)))];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 pb-20 sm:pb-10 font-sans selection:bg-blue-200">
      {testState === 'home' && (
        <div className="max-w-3xl mx-auto px-4 py-12 sm:py-20 flex flex-col items-center justify-center min-h-screen text-center animate-in fade-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 mb-8 rotate-3">
            <span className="text-3xl font-black text-white">IAE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">Score IAE-Message</h1>
          <p className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed">
            Simulateur d'entraînement intensif. Préparez-vous dans les conditions réelles ou révisez à votre rythme.
          </p>
          
          <div className="w-full max-w-md space-y-4">
            <button
              onClick={() => startTest('test')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-5 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex flex-col items-center justify-center group"
            >
              <span>Mode Test Blanc (Conditions Réelles)</span>
              <span className="text-xs font-normal text-blue-200 mt-1">170 questions • Chrono 3h • Score final</span>
            </button>
            
            <button
              onClick={() => startTest('revision')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-5 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex flex-col items-center justify-center group"
            >
              <span>Mode Révision Express (Survie)</span>
              <span className="text-xs font-normal text-indigo-200 mt-1">Pas de chrono • Filtre par catégorie • Flashcards</span>
            </button>
          </div>
        </div>
      )}

      {testState === 'active' && currentQuestion && (
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              {testMode === 'test' && (
                <button
                  onClick={() => setIsNavOpen(true)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 mr-3 transition-colors focus:ring-2 focus:ring-blue-500"
                  aria-label="Ouvrir la grille de navigation"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              )}
              
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Question</div>
                <div className="text-lg font-black text-gray-900 leading-none">{currentQuestionIndex + 1} <span className="text-gray-400 font-medium text-sm">/ {filteredQuestions.length}</span></div>
              </div>
            </div>
            
            {testMode === 'test' ? (
              <Timer initialMinutes={180} onTimeUp={endTest} isActive={testState === 'active'} />
            ) : (
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentQuestionIndex(0);
                }}
                className="bg-gray-100 border-none text-sm font-bold text-gray-700 py-2 px-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            )}
          </header>

          <div className="flex-1 px-4 py-6 w-full max-w-3xl mx-auto">
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6 overflow-hidden">
              <div 
                className={`${testMode === 'test' ? 'bg-blue-600' : 'bg-indigo-600'} h-1.5 rounded-full transition-all duration-500 ease-out`} 
                style={{ width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
              ></div>
            </div>

            <QuestionCard
              question={currentQuestion}
              selectedAnswer={answers[currentQuestionIndex] || null}
              onSelectAnswer={handleSelectAnswer}
              mode={testMode!}
            />

            {/* Bottom Navigation */}
            <div className="mt-8 flex items-center justify-between gap-4">
              {testMode === 'test' ? (
                <>
                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="flex-1 py-4 font-bold text-gray-700 bg-white border border-gray-200 rounded-xl disabled:opacity-50 disabled:bg-gray-50 active:scale-[0.98] transition-all flex items-center justify-center hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Précédent
                  </button>
                  
                  {currentQuestionIndex === filteredQuestions.length - 1 ? (
                    <button
                      onClick={endTest}
                      className="flex-1 py-4 font-bold text-white bg-green-600 rounded-xl active:scale-[0.98] shadow-md shadow-green-200 hover:bg-green-700 transition-all flex items-center justify-center"
                    >
                      Terminer
                      <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className="flex-1 py-4 font-bold text-white bg-blue-600 rounded-xl active:scale-[0.98] shadow-md shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center group"
                    >
                      Suivant
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  )}
                </>
              ) : (
                // Revision mode bottom navigation
                <>
                  <button
                    onClick={endTest}
                    className="py-4 px-6 font-bold text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-xl active:scale-[0.98] transition-all"
                  >
                    Quitter
                  </button>
                  <button
                    onClick={nextQuestion}
                    className="flex-1 py-4 font-bold text-white bg-indigo-600 rounded-xl active:scale-[0.98] shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center group"
                  >
                    Question Suivante
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </>
              )}
            </div>
          </div>
          
          {testMode === 'test' && (
            <NavigationGrid
              totalQuestions={filteredQuestions.length}
              currentQuestionIndex={currentQuestionIndex}
              answers={answers}
              onNavigate={setCurrentQuestionIndex}
              isOpen={isNavOpen}
              onClose={() => setIsNavOpen(false)}
            />
          )}
        </div>
      )}

      {testState === 'results' && testMode === 'test' && (
        <div className="px-4 py-8">
          <ResultsBoard 
            questions={filteredQuestions} 
            answers={answers} 
            onRestart={() => setTestState('home')} 
          />
        </div>
      )}
    </main>
  );
}
