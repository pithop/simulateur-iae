interface NavigationGridProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  answers: Record<number, string>;
  onNavigate: (index: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationGrid({
  totalQuestions,
  currentQuestionIndex,
  answers,
  onNavigate,
  isOpen,
  onClose,
}: NavigationGridProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Navigation des questions</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto">
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 sm:gap-3">
            {Array.from({ length: totalQuestions }).map((_, i) => {
              const isCurrent = i === currentQuestionIndex;
              const isAnswered = answers[i] !== undefined;

              let btnClass = "w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-sm transition-all duration-200 ";
              
              if (isCurrent) {
                btnClass += "bg-blue-600 text-white shadow-md scale-110 ring-2 ring-blue-200";
              } else if (isAnswered) {
                btnClass += "bg-gray-200 text-gray-700 hover:bg-gray-300";
              } else {
                btnClass += "bg-white border-2 border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50";
              }

              return (
                <button
                  key={i}
                  onClick={() => {
                    onNavigate(i);
                    onClose();
                  }}
                  className={btnClass}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-center space-x-6 text-xs text-gray-500">
          <div className="flex items-center"><div className="w-3 h-3 rounded bg-blue-600 mr-2"></div>Actuelle</div>
          <div className="flex items-center"><div className="w-3 h-3 rounded bg-gray-200 mr-2"></div>Répondue</div>
          <div className="flex items-center"><div className="w-3 h-3 rounded border-2 border-gray-200 bg-white mr-2"></div>À faire</div>
        </div>
      </div>
    </div>
  );
}
