import React from 'react';
import { playBoingSound, speakText, playSparkleSound, unlockAudio } from '../utils/audio';
import { Play, Grid, Sparkles, Volume2 } from 'lucide-react';
import { CartoonIllustration } from './CartoonIllustration';

interface HomeScreenProps {
  onStart: () => void;
  onOpenGrid: () => void;
  completedCount: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStart,
  onOpenGrid,
  completedCount,
}) => {
  const handleStartGame = () => {
    unlockAudio();
    playBoingSound();
    speakText("Let's colour letters! A! A for Apple!", {
      pitch: 1.25,
      rate: 0.85,
      letterHint: 'A',
    });
    onStart();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-sky-300 via-sky-100 to-amber-100 overflow-hidden select-none">
      {/* Decorative Sky Background Elements */}
      <div className="absolute top-4 left-6 w-20 h-10 bg-white/70 rounded-full filter blur-[1px] pointer-events-none" />
      <div className="absolute top-10 right-8 w-28 h-12 bg-white/70 rounded-full filter blur-[1px] pointer-events-none" />
      <div className="absolute top-24 left-1/3 w-16 h-8 bg-white/50 rounded-full filter blur-[1px] pointer-events-none" />

      {/* Top Friendly Badge */}
      <div className="w-full max-w-md flex items-center justify-between z-10 pt-2">
        <div className="inline-flex items-center gap-1.5 bg-white/90 px-3.5 py-1.5 rounded-full shadow-sm border-2 border-white text-xs font-black text-slate-700">
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span>For Ages 2–6</span>
        </div>

        {completedCount > 0 && (
          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-amber-950 font-black text-xs px-3 py-1 rounded-full shadow-sm border-2 border-white">
            <span>⭐ {completedCount} / 26 Done!</span>
          </div>
        )}
      </div>

      {/* Hero Content */}
      <div className="w-full max-w-md flex flex-col items-center text-center my-auto z-10 py-4">
        {/* Playful Floating Alphabet Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-12 h-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg border-2 border-white transform -rotate-6 animate-bounce" style={{ animationDuration: '2.5s' }}>
            A
          </span>
          <span className="w-12 h-12 bg-amber-400 text-amber-950 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg border-2 border-white transform rotate-3 animate-bounce" style={{ animationDuration: '3s' }}>
            B
          </span>
          <span className="w-12 h-12 bg-sky-500 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg border-2 border-white transform -rotate-3 animate-bounce" style={{ animationDuration: '2.8s' }}>
            C
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight drop-shadow-sm leading-tight">
          ALPHABET
          <span className="block text-rose-500">COLOURING</span>
        </h1>

        <p className="text-sm sm:text-base font-extrabold text-slate-600 mt-2 max-w-xs">
          Drag your finger to colour capital letters & discover fun words! 🎨
        </p>

        {/* Cute Mascot Clipart Showcase */}
        <div className="relative my-6 w-44 h-44 bg-white/90 rounded-3xl p-3 shadow-xl border-4 border-white flex items-center justify-center">
          <CartoonIllustration letter="A" word="Apple" size={140} />
          {/* Fun floating emoji badges */}
          <div className="absolute -top-3 -right-3 text-3xl animate-bounce">🍎</div>
          <div className="absolute -bottom-2 -left-3 text-3xl animate-pulse">🐱</div>
        </div>

        {/* Big Preschool Primary Play Button */}
        <div className="w-full space-y-3">
          <button
            type="button"
            onClick={handleStartGame}
            className="w-full py-4 px-8 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 hover:from-emerald-500 hover:to-teal-600 active:translate-y-1 text-white font-black text-2xl rounded-2xl shadow-[0_6px_0_#0f766e] active:shadow-[0_2px_0_#0f766e] flex items-center justify-center gap-3 transition-all cursor-pointer transform hover:scale-[1.02]"
          >
            <Play className="w-7 h-7 fill-white stroke-none" />
            <span>START A–Z</span>
          </button>

          {/* Letter Grid Picker Button */}
          <button
            type="button"
            onClick={() => {
              playSparkleSound();
              onOpenGrid();
            }}
            className="w-full py-3.5 px-6 bg-white hover:bg-slate-50 active:translate-y-0.5 text-slate-700 font-extrabold text-lg rounded-2xl shadow-[0_4px_0_#cbd5e1] active:shadow-[0_1px_0_#cbd5e1] border-2 border-slate-200 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <Grid className="w-5 h-5 text-indigo-500" />
            <span>Choose Any Letter (A–Z)</span>
          </button>
        </div>
      </div>

      {/* Cheerful Bottom Audio Prompt */}
      <div className="w-full max-w-md flex items-center justify-center gap-2 z-10 pb-2">
        <button
          type="button"
          onClick={() => {
            unlockAudio();
            speakText("A for Apple, B for Ball, C for Cat! Let's play!", {
              pitch: 1.25,
              rate: 0.85,
              letterHint: 'A',
            });
          }}
          className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-slate-800 font-bold text-xs py-2 px-4 rounded-full shadow-md border-2 border-white cursor-pointer active:scale-95 transition-all"
        >
          <Volume2 className="w-4 h-4 text-sky-600 animate-pulse" />
          <span>Tap to test sound: "A for Apple!" 🔊</span>
        </button>
      </div>
    </div>
  );
};
