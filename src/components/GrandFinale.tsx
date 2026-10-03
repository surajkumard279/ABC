import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { ALPHABET_DATA, AlphabetItem } from '../data/alphabetData';
import { playSuccessFanfare, speakText, playBoingSound, playSparkleSound, unlockAudio } from '../utils/audio';
import { RotateCcw, Trophy, Star, Sparkles, Volume2, X } from 'lucide-react';
import { CartoonIllustration } from './CartoonIllustration';

interface GrandFinaleProps {
  onPlayAgain: () => void;
  onSelectLetter: (index: number) => void;
}

export const GrandFinale: React.FC<GrandFinaleProps> = ({
  onPlayAgain,
  onSelectLetter,
}) => {
  const [inspectedItem, setInspectedItem] = useState<AlphabetItem | null>(null);

  useEffect(() => {
    playSuccessFanfare();
    speakText('Yaaayyyy! You did it! You know all letters from A to Z!', {
      pitch: 1.3,
      rate: 0.85,
    });

    // Multiple bursts of celebratory confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#ec4899'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#facc15', '#06b6d4', '#8b5cf6', '#4ade80'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleLetterClick = (item: AlphabetItem, index: number) => {
    unlockAudio();
    setInspectedItem(item);
    speakText(`${item.letter}! ${item.letter} for ${item.word}!`, {
      pitch: 1.25,
      rate: 0.85,
      letterHint: item.letter,
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-200 via-amber-100 to-pink-100 p-4 flex flex-col items-center justify-between pb-8">
      {/* Top Trophy Banner */}
      <div className="w-full max-w-xl text-center mt-3">
        <div className="inline-flex items-center gap-2 bg-amber-400 text-amber-950 font-black text-xl sm:text-2xl px-6 py-2 rounded-full shadow-lg border-4 border-white mb-2 animate-bounce">
          <Trophy className="w-6 h-6 text-amber-900 fill-amber-300" />
          <span>YAAAYYYY! YOU DID IT! 🎉</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-wide drop-shadow-sm">
          ALPHABET CHAMPION!
        </h1>
        <p className="text-sm font-bold text-slate-600 mt-1">
          Tap any letter to hear its song!
        </p>
      </div>

      {/* Complete A-Z All 26 Brightly Coloured Letters */}
      <div className="w-full max-w-2xl bg-white/90 rounded-3xl p-4 sm:p-6 shadow-xl border-4 border-white my-4 backdrop-blur-sm">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2.5 sm:gap-3">
          {ALPHABET_DATA.map((item, idx) => (
            <button
              key={item.letter}
              type="button"
              onClick={() => handleLetterClick(item, idx)}
              className="group relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all transform hover:scale-110 active:scale-95 shadow-md border-2 border-white cursor-pointer"
              style={{ backgroundColor: item.themeColor }}
            >
              <span className="text-2xl sm:text-3xl font-black text-white drop-shadow">
                {item.letter}
              </span>
              <span className="text-base sm:text-lg mt-0.5 filter drop-shadow">
                {item.emoji}
              </span>
              {/* Little Star Badge */}
              <div className="absolute -top-1.5 -right-1.5 bg-amber-400 rounded-full p-0.5 shadow">
                <Star className="w-3 h-3 text-white fill-white" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Play Again Huge CTA */}
      <div className="w-full max-w-md flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            playBoingSound();
            onPlayAgain();
          }}
          className="w-full py-4 px-8 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 hover:from-emerald-500 hover:to-teal-600 active:translate-y-1 text-white font-black text-xl rounded-2xl shadow-[0_6px_0_#0f766e] active:shadow-[0_2px_0_#0f766e] flex items-center justify-center gap-3 transition-all cursor-pointer"
        >
          <RotateCcw className="w-6 h-6 stroke-[3]" />
          <span>PLAY AGAIN! 🎈</span>
        </button>
      </div>

      {/* Mini Inspector Modal when tapping a letter */}
      {inspectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="relative bg-white rounded-3xl p-5 max-w-xs w-full text-center shadow-2xl border-4 border-amber-300">
            <button
              type="button"
              onClick={() => setInspectedItem(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div
              className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white font-black text-4xl shadow-md border-2 border-white mb-2"
              style={{ backgroundColor: inspectedItem.themeColor }}
            >
              {inspectedItem.letter}
            </div>

            <div className="w-36 h-36 mx-auto flex items-center justify-center my-2">
              <CartoonIllustration
                letter={inspectedItem.letter}
                word={inspectedItem.word}
                size={140}
              />
            </div>

            <h3 className="text-xl font-black text-slate-800">
              {inspectedItem.letter} for {inspectedItem.word}
            </h3>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  playSparkleSound();
                  speakText(`${inspectedItem.letter}! ${inspectedItem.letter} for ${inspectedItem.word}!`, {
                    pitch: 1.25,
                    rate: 0.85,
                  });
                }}
                className="flex-1 py-2 bg-sky-100 text-sky-800 font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Hear</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const idx = ALPHABET_DATA.findIndex((a) => a.letter === inspectedItem.letter);
                  setInspectedItem(null);
                  onSelectLetter(idx);
                }}
                className="flex-1 py-2 bg-amber-400 text-amber-950 font-black rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Colour</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
