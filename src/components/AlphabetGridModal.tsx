import React from 'react';
import { ALPHABET_DATA } from '../data/alphabetData';
import { playBoingSound, speakText } from '../utils/audio';
import { Star, X } from 'lucide-react';

interface AlphabetGridModalProps {
  currentIndex: number;
  completedLetters: Set<string>;
  onSelectLetter: (index: number) => void;
  onClose: () => void;
}

export const AlphabetGridModal: React.FC<AlphabetGridModalProps> = ({
  currentIndex,
  completedLetters,
  onSelectLetter,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border-4 border-amber-300 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">
              Pick a Letter! 🎨
            </h2>
            <span className="text-xs font-bold text-slate-400">
              Completed: {completedLetters.size} / 26 letters
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Letter Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3 py-4 overflow-y-auto pr-1">
          {ALPHABET_DATA.map((item, idx) => {
            const isCompleted = completedLetters.has(item.letter);
            const isCurrent = currentIndex === idx;

            return (
              <button
                key={item.letter}
                type="button"
                onClick={() => {
                  playBoingSound();
                  speakText(item.letter, { pitch: 1.3, rate: 0.9 });
                  onSelectLetter(idx);
                  onClose();
                }}
                className={`relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all active:scale-95 cursor-pointer shadow-sm border-2 ${
                  isCurrent
                    ? 'ring-4 ring-amber-400 border-white scale-105 shadow-md'
                    : 'border-slate-100 hover:border-slate-300'
                }`}
                style={{
                  backgroundColor: item.themeColor,
                }}
              >
                <span className="text-2xl font-black text-white drop-shadow">
                  {item.letter}
                </span>
                <span className="text-xs font-black text-white/90">
                  {item.emoji}
                </span>

                {/* Completed Star */}
                {isCompleted && (
                  <div className="absolute -top-1 -right-1 bg-amber-400 rounded-full p-0.5 shadow">
                    <Star className="w-3 h-3 text-white fill-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
