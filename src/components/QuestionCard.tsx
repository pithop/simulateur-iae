import { useState, useEffect } from 'react';

interface Question {
  id: number;
  test_id: number;
  category: string;
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  mode?: 'test' | 'revision';
}

export default function QuestionCard({ question, selectedAnswer, onSelectAnswer, mode = 'test' }: QuestionCardProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    setShowExplanation(false);
  }, [question.id]);

  const isTestAnswered = mode === 'test' && selectedAnswer !== null;
  const isRevisionAnswered = mode === 'revision' && selectedAnswer !== null;
  const isRevealed = mode === 'revision' && (showExplanation || isRevisionAnswered);
  const shouldShowExplanation = isTestAnswered || isRevealed;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-4">
      <div className="p-5 sm:p-6 border-b border-gray-100">
        <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
          {question.category}
        </span>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
          {question.question}
        </h2>
      </div>

      <div className="p-5 sm:p-6 space-y-3 bg-gray-50/50">
        {question.options.map((option) => {
          const optionLetter = option.substring(0, 1);
          let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 text-sm sm:text-base ";
          
          if (mode === 'test') {
            if (!isTestAnswered) {
              buttonClass += "border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 text-gray-700 active:scale-[0.98]";
            } else {
              if (optionLetter === question.correct_answer) {
                buttonClass += "border-green-500 bg-green-50 text-green-800 font-medium";
              } else if (selectedAnswer === optionLetter) {
                buttonClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                buttonClass += "border-gray-200 bg-white text-gray-400 opacity-60";
              }
            }
          } else {
            // Revision mode
            if (isRevealed) {
              if (optionLetter === question.correct_answer) {
                buttonClass += "border-green-500 bg-green-50 text-green-800 font-medium";
              } else if (selectedAnswer === optionLetter) {
                buttonClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                buttonClass += "border-gray-200 bg-white text-gray-400 opacity-60";
              }
            } else {
              buttonClass += "border-gray-200 bg-white hover:border-indigo-400 hover:bg-indigo-50 text-gray-700 active:scale-[0.98] cursor-pointer";
            }
          }

          return (
            <button
              key={option}
              disabled={mode === 'test' ? isTestAnswered : isRevealed}
              onClick={() => onSelectAnswer(optionLetter)}
              className={buttonClass}
            >
              <div className="flex items-start">
                <span className="font-bold mr-3">{optionLetter})</span>
                <span>{option.substring(3)}</span>
              </div>
            </button>
          );
        })}
        
        {mode === 'revision' && !isRevealed && (
          <button
            onClick={() => setShowExplanation(true)}
            className="w-full mt-4 py-4 font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all shadow-md active:scale-[0.98]"
          >
            Ou Voir la réponse directement
          </button>
        )}
      </div>

      {shouldShowExplanation && (
        <div className="p-5 sm:p-6 bg-blue-50 border-t border-blue-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-sm font-bold text-blue-900 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Analyse et Explication
          </h3>
          <p className="text-sm text-blue-800 leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
