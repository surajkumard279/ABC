import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { AlphabetItem } from '../data/alphabetData';
import { CartoonIllustration } from './CartoonIllustration';
import { playSuccessFanfare, speakCompletionSequence, speakText, playBoingSound, playSparkleSound, unlockAudio } from '../utils/audio';
import { Volume2, ArrowRight, RotateCcw, ArrowLeft, Star } from 'lucide-react';

interface CelebrationModalProps {
  item: AlphabetItem;
  onNext: () => void;
  onPrevious: () => void;
  onRepeat: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  item,
  onNext,
  onPrevious,
  onRepeat,
  hasNext,
  hasPrevious,
}) => {
  const [selectedWord, setSelectedWord] = useState<string>(item.word);
  const [showSecondary, setShowSecondary] = useState(false);

  // Trigger celebration on mount
  useEffect(() => {
    // 1. Play triumph sound fanfare
    playSuccessFanfare();

    // 2. Launch vibrant preschool confetti burst
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.35 },
      colors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'],
      shapes: ['star', 'circle'],
      scalar: 1.2,
    });

    // Second shower 400ms later for extra toddler delight
    const timer = setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 70,
        origin: { x: 0.1, y: 0.4 },
        colors: ['#facc15', '#38bdf8', '#fb7185'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 70,
        origin: { x: 0.9, y: 0.4 },
        colors: ['#4ade80', '#c084fc', '#f97316'],
      });
    }, 380);

    // 3. Speak completion sequence: "Yaaayyyy! A!" -> "A! A for Apple!"
    speakCompletionSequence(item.letter, item.word);

    return () => clearTimeout(timer);
  }, [item]);

  const handleReplayVoice = () => {
    unlockAudio();
    speakText(`${item.letter}! ${item.letter} for ${selectedWord}!`, {
      pitch: 1.25,
      rate: 0.82,
      letterHint: item.letter,
    });
  };

  const handleToggleSecondaryWord = (altWord: string) => {
    unlockAudio();
    setSelectedWord(altWord);
    setShowSecondary(true);
    speakText(`${item.letter}! ${item.letter} for ${altWord}!`, {
      pitch: 1.25,
      rate: 0.82,
      letterHint: item.letter,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/40 backdrop-blur-sm animate-fade-in overflow-y-auto">
      {/* Celebration Card */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-5 shadow-2xl border-4 border-amber-300 text-center flex flex-col items-center transform transition-all animate-bounce-in">
        {/* Floating Stars Header */}
        <div className="absolute -top-6 flex items-center gap-2">
          <Star className="w-8 h-8 text-amber-400 fill-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <div className="bg-gradient-to-r from-amber-400 via-rose-400 to-pink-500 text-white font-black text-xl sm:text-2xl px-6 py-2 rounded-full shadow-lg border-2 border-white">
            YAAAYYYY! 🎉
          </div>
          <Star className="w-8 h-8 text-amber-400 fill-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        {/* Large Capital Letter Badge */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white text-white font-black text-4xl sm:text-5xl"
            style={{ backgroundColor: item.themeColor }}
          >
            {item.letter}
          </div>
          <div className="text-left">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Great Job!
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-800 tracking-wide">
              Letter {item.letter}
            </span>
          </div>
        </div>

        {/* Cute Cartoon Illustration in Large Format */}
        <div className="relative my-3 w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-b from-sky-50 to-amber-50 rounded-3xl p-2 border-4 border-white shadow-inner flex items-center justify-center overflow-hidden">
          <CartoonIllustration
            letter={item.letter}
            word={selectedWord}
            size={180}
            className="transform hover:scale-105 transition-transform"
          />

          {/* Golden star badge */}
          <div className="absolute top-2 right-2 bg-amber-400 text-white p-1.5 rounded-full shadow-md animate-pulse">
            <Star className="w-4 h-4 fill-white" />
          </div>
        </div>

        {/* Large Phonics Text */}
        <div className="w-full bg-amber-50 border-2 border-amber-200 rounded-2xl py-2 px-3 mb-3">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-wide">
            {item.letter} FOR {selectedWord.toUpperCase()}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
            "{item.letter}! {item.letter} for {selectedWord}!"
          </p>
        </div>

        {/* Optional Secondary Word Choice (e.g. F for Frog, H for Hat, etc.) */}
        {item.secondaryWord && (
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xs font-bold text-slate-500">Also try:</span>
            <button
              type="button"
              onClick={() => handleToggleSecondaryWord(showSecondary ? item.word : item.secondaryWord!)}
              className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-full text-xs font-bold shadow-sm border border-amber-300 flex items-center gap-1 transition-transform active:scale-95 cursor-pointer"
            >
              <span>{showSecondary ? item.emoji : item.secondaryEmoji}</span>
              <span>{showSecondary ? item.word : item.secondaryWord}</span>
            </button>
          </div>
        )}

        {/* Fun Toddler Fact */}
        <p className="text-xs text-slate-500 font-medium px-4 mb-4 line-clamp-2">
          {item.funFact}
        </p>

        {/* Voice and Action Controls */}
        <div className="w-full flex flex-col gap-2.5">
          {/* Main Huge Next Letter CTA */}
          <button
            type="button"
            onClick={() => {
              playBoingSound();
              onNext();
            }}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 hover:from-emerald-500 hover:to-teal-600 active:translate-y-1 text-white font-black text-lg sm:text-xl rounded-2xl shadow-[0_6px_0_#0f766e] active:shadow-[0_2px_0_#0f766e] flex items-center justify-center gap-2 transition-all cursor-pointer animate-pulse"
          >
            <span>{hasNext ? 'Next Letter' : 'Celebrate All!'}</span>
            <ArrowRight className="w-6 h-6 stroke-[3]" />
          </button>

          {/* Secondary Actions: Hear Again & Repeat */}
          <div className="grid grid-cols-2 gap-2 w-full">
            <button
              type="button"
              onClick={handleReplayVoice}
              className="py-2.5 px-3 bg-sky-100 hover:bg-sky-200 active:scale-95 text-sky-800 font-extrabold text-sm rounded-xl border border-sky-300 flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-sky-600" />
              <span>Hear Again</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playBoingSound();
                onRepeat();
              }}
              className="py-2.5 px-3 bg-purple-100 hover:bg-purple-200 active:scale-95 text-purple-800 font-extrabold text-sm rounded-xl border border-purple-300 flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-purple-600" />
              <span>Colour Again</span>
            </button>
          </div>

          {/* Back button if needed */}
          {hasPrevious && (
            <button
              type="button"
              onClick={() => {
                playBoingSound();
                onPrevious();
              }}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1 py-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Go back to previous letter</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
