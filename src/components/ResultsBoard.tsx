interface Question {
  id: number;
  test_id: number;
  category: string;
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

interface ResultsBoardProps {
  questions: Question[];
  answers: Record<number, string>;
  onRestart: () => void;
}

export default function ResultsBoard({ questions, answers, onRestart }: ResultsBoardProps) {
  let totalScore = 0;
  const categories: Record<string, { total: number; score: number }> = {
    "Culture Générale": { total: 0, score: 0 },
    "Français": { total: 0, score: 0 },
    "Logique": { total: 0, score: 0 },
    "Anglais": { total: 0, score: 0 },
  };

  questions.forEach((q, index) => {
    const isCorrect = answers[index] === q.correct_answer;
    
    // Ensure category exists in our map, otherwise add it dynamically
    if (!categories[q.category]) {
      categories[q.category] = { total: 0, score: 0 };
    }
    
    categories[q.category].total += 1;
    if (isCorrect) {
      categories[q.category].score += 1;
      totalScore += 1;
    }
  });

  const percentage = Math.round((totalScore / questions.length) * 100);
  
  let message = "";
  if (percentage >= 80) message = "Excellent travail !";
  else if (percentage >= 50) message = "Bon début, encore un effort !";
  else message = "Des révisions s'imposent !";

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mt-8 animate-in slide-in-from-bottom-8 duration-700">
      <div className="p-8 text-center bg-gradient-to-b from-blue-50 to-white">
        <h2 className="text-3xl font-black text-gray-900 mb-2">Bilan du Test</h2>
        <p className="text-gray-500 font-medium mb-8">{message}</p>
        
        <div className="inline-flex flex-col items-center justify-center w-40 h-40 rounded-full border-8 border-blue-500 bg-white shadow-inner mb-2">
          <span className="text-5xl font-black text-blue-600">{totalScore}</span>
          <span className="text-xl text-gray-400 font-bold border-t-2 border-gray-100 mt-1 pt-1 w-16 text-center">
            {questions.length}
          </span>
        </div>
        <div className="text-sm font-bold text-blue-500 uppercase tracking-widest mt-4">Score Final</div>
      </div>

      <div className="p-6 sm:p-8 border-t border-gray-100 bg-gray-50">
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
          <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Détail par catégorie
        </h3>
        
        <div className="space-y-4">
          {Object.entries(categories).map(([name, data]) => {
            if (data.total === 0) return null;
            const catPercentage = Math.round((data.score / data.total) * 100);
            return (
              <div key={name} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-700">{name}</div>
                  <div className="text-sm text-gray-400">{data.score} sur {data.total} bonnes réponses</div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-3 overflow-hidden">
                    <div 
                      className={`h-2.5 rounded-full ${catPercentage >= 50 ? 'bg-green-500' : 'bg-orange-500'}`} 
                      style={{ width: `${catPercentage}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-gray-900 w-10 text-right">{catPercentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-6 bg-white border-t border-gray-100 text-center">
        <button
          onClick={onRestart}
          className="inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95 shadow-md hover:shadow-lg"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refaire un Test Blanc
        </button>
      </div>
    </div>
  );
}
