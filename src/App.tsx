import React, { useState, useEffect } from 'react';
import { ALPHABET_DATA } from './data/alphabetData';
import { LetterCanvas } from './components/LetterCanvas';
import { CelebrationModal } from './components/CelebrationModal';
import { GrandFinale } from './components/GrandFinale';
import { HomeScreen } from './components/HomeScreen';
import { AlphabetGridModal } from './components/AlphabetGridModal';
import {
  unlockAudio,
  speakText,
  playBoingSound,
  playSparkleSound,
  toggleBackgroundMusic,
  isBgMusicActive,
} from './utils/audio';
import {
  Home,
  Grid,
  Volume2,
  Music,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'play' | 'finale'>('home');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [completedLetters, setCompletedLetters] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('abc_completed_letters');
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch (e) {
      return new Set<string>();
    }
  });

  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);

  const currentItem = ALPHABET_DATA[currentIndex];

  // Save progress
  useEffect(() => {
    try {
      localStorage.setItem(
        'abc_completed_letters',
        JSON.stringify(Array.from(completedLetters))
      );
    } catch (e) {
      // Ignore
    }
  }, [completedLetters]);

  // Audio unlock listener - keep active so audio never gets suspended
  useEffect(() => {
    const handleGesture = () => unlockAudio();
    window.addEventListener('pointerdown', handleGesture);
    window.addEventListener('click', handleGesture);
    window.addEventListener('touchstart', handleGesture);
    return () => {
      window.removeEventListener('pointerdown', handleGesture);
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
    };
  }, []);

  // Speak initial letter when navigating to play screen
  const navigateToLetter = (index: number) => {
    unlockAudio();
    setCurrentIndex(index);
    setIsCelebrationOpen(false);
    setCurrentScreen('play');
    setCanvasKey((prev) => prev + 1);

    const targetItem = ALPHABET_DATA[index];
    speakText(`${targetItem.letter}! Colour the letter ${targetItem.letter}!`, {
      pitch: 1.25,
      rate: 0.88,
      letterHint: targetItem.letter,
    });
  };

  // Called when child completes coloring the letter
  const handleLetterComplete = () => {
    setCompletedLetters((prev) => new Set(prev).add(currentItem.letter));
    setIsCelebrationOpen(true);
  };

  // Next letter action
  const handleNextLetter = () => {
    setIsCelebrationOpen(false);
    if (currentIndex < ALPHABET_DATA.length - 1) {
      navigateToLetter(currentIndex + 1);
    } else {
      // Reached end of Z -> Go to grand finale!
      setCurrentScreen('finale');
    }
  };

  // Previous letter action
  const handlePreviousLetter = () => {
    setIsCelebrationOpen(false);
    if (currentIndex > 0) {
      navigateToLetter(currentIndex - 1);
    }
  };

  // Repeat current letter
  const handleRepeatLetter = () => {
    unlockAudio();
    setIsCelebrationOpen(false);
    setCanvasKey((prev) => prev + 1);
    speakText(`${currentItem.letter}! Colour again!`, {
      pitch: 1.25,
      rate: 0.88,
      letterHint: currentItem.letter,
    });
  };

  // Replay pronunciation
  const handleSpeakCurrent = () => {
    unlockAudio();
    speakText(`${currentItem.letter}! ${currentItem.letter} for ${currentItem.word}!`, {
      pitch: 1.25,
      rate: 0.82,
      letterHint: currentItem.letter,
    });
  };

  // Background nursery music toggle
  const handleToggleMusic = () => {
    unlockAudio();
    const state = toggleBackgroundMusic();
    setMusicOn(state);
    playBoingSound();
  };

  // Render Grand Finale
  if (currentScreen === 'finale') {
    return (
      <GrandFinale
        onPlayAgain={() => {
          navigateToLetter(0);
        }}
        onSelectLetter={(idx) => {
          navigateToLetter(idx);
        }}
      />
    );
  }

  // Render Home Screen
  if (currentScreen === 'home') {
    return (
      <>
        <HomeScreen
          onStart={() => navigateToLetter(0)}
          onOpenGrid={() => setIsGridOpen(true)}
          completedCount={completedLetters.size}
        />
        {isGridOpen && (
          <AlphabetGridModal
            currentIndex={currentIndex}
            completedLetters={completedLetters}
            onSelectLetter={(idx) => navigateToLetter(idx)}
            onClose={() => setIsGridOpen(false)}
          />
        )}
      </>
    );
  }

  // Main Letter Colouring Screen
  return (
    <div className={`min-h-screen w-full flex flex-col justify-between bg-gradient-to-b ${currentItem.bgGradient} select-none overflow-x-hidden p-2 sm:p-4 touch-none`}>
      {/* Preschool Friendly Top App Bar */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between gap-2 pt-1 pb-2 z-20">
        {/* Home Button */}
        <button
          type="button"
          onClick={() => {
            playBoingSound();
            setCurrentScreen('home');
          }}
          className="w-11 h-11 bg-white hover:bg-slate-50 active:scale-90 rounded-2xl shadow-md border-2 border-white flex items-center justify-center text-slate-700 transition-all cursor-pointer"
          title="Back to Home"
          aria-label="Home"
        >
          <Home className="w-5 h-5 text-amber-500" />
        </button>

        {/* Current Letter & Word Header */}
        <div className="flex-1 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={handleSpeakCurrent}
            className="flex items-center gap-2 bg-white/95 px-4 py-1.5 rounded-2xl shadow-md border-2 border-white cursor-pointer active:scale-95 transition-transform"
          >
            <span
              className="w-7 h-7 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-sm"
              style={{ backgroundColor: currentItem.themeColor }}
            >
              {currentItem.letter}
            </span>
            <span className="font-black text-base sm:text-lg text-slate-800">
              for {currentItem.word}
            </span>
            <span className="text-xl">{currentItem.emoji}</span>
          </button>
        </div>

        {/* Action Controls: Sound & Letter Grid Drawer */}
        <div className="flex items-center gap-1.5">
          {/* Audio Replay Button */}
          <button
            type="button"
            onClick={handleSpeakCurrent}
            className="w-11 h-11 bg-white hover:bg-slate-50 active:scale-90 rounded-2xl shadow-md border-2 border-white flex items-center justify-center text-sky-600 transition-all cursor-pointer"
            title="Hear Pronunciation"
            aria-label="Replay Voice"
          >
            <Volume2 className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Music Toggle */}
          <button
            type="button"
            onClick={handleToggleMusic}
            className={`w-11 h-11 rounded-2xl shadow-md border-2 border-white flex items-center justify-center transition-all cursor-pointer active:scale-90 ${
              musicOn ? 'bg-amber-400 text-white ring-2 ring-amber-300' : 'bg-white text-slate-400'
            }`}
            title={musicOn ? 'Mute Music' : 'Play Gentle Melody'}
            aria-label="Toggle Music"
          >
            <Music className="w-5 h-5" />
          </button>

          {/* Grid Overview Drawer */}
          <button
            type="button"
            onClick={() => {
              playBoingSound();
              setIsGridOpen(true);
            }}
            className="w-11 h-11 bg-white hover:bg-slate-50 active:scale-90 rounded-2xl shadow-md border-2 border-white flex items-center justify-center text-indigo-600 transition-all cursor-pointer"
            title="All Letters A-Z"
            aria-label="All Letters"
          >
            <Grid className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Interactive Colouring Section */}
      <main className="w-full flex-1 flex flex-col items-center justify-center py-1">
        <LetterCanvas
          key={`${currentItem.letter}-${canvasKey}`}
          letter={currentItem.letter}
          themeColor={currentItem.themeColor}
          onComplete={handleLetterComplete}
          isCompleted={isCelebrationOpen}
        />
      </main>

      {/* Chunky Preschool Bottom Navigation Bar */}
      <footer className="w-full max-w-md mx-auto py-2 z-20">
        <div className="flex items-center justify-between gap-3 bg-white/80 p-2 rounded-2xl backdrop-blur-sm border-2 border-white shadow-lg">
          {/* Previous Letter Button */}
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => {
              playBoingSound();
              handlePreviousLetter();
            }}
            className={`flex-1 py-3 px-3 rounded-xl font-black text-sm flex items-center justify-center gap-1 transition-all cursor-pointer shadow-sm ${
              currentIndex === 0
                ? 'opacity-40 bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-white text-slate-700 hover:bg-slate-50 active:scale-95 border border-slate-200'
            }`}
          >
            <ChevronLeft className="w-5 h-5 stroke-[3]" />
            <span className="hidden xs:inline">Previous</span>
          </button>

          {/* Repeat Letter */}
          <button
            type="button"
            onClick={() => {
              playBoingSound();
              handleRepeatLetter();
            }}
            className="w-12 h-12 bg-white hover:bg-slate-50 active:scale-90 rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-700 transition-all cursor-pointer"
            title="Repeat Letter"
          >
            <RotateCcw className="w-5 h-5 text-amber-500 stroke-[2.5]" />
          </button>

          {/* Large Chunky Next Letter CTA */}
          <button
            type="button"
            onClick={() => {
              playBoingSound();
              handleNextLetter();
            }}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 hover:from-emerald-500 hover:to-teal-600 active:translate-y-0.5 text-white font-black text-base rounded-xl shadow-[0_4px_0_#0f766e] active:shadow-[0_1px_0_#0f766e] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span>{currentIndex === 25 ? 'Finish' : 'Next'}</span>
            <ChevronRight className="w-5 h-5 stroke-[3]" />
          </button>
        </div>
      </footer>

      {/* Completion Celebration Modal */}
      {isCelebrationOpen && (
        <CelebrationModal
          item={currentItem}
          onNext={handleNextLetter}
          onPrevious={handlePreviousLetter}
          onRepeat={handleRepeatLetter}
          hasNext={currentIndex < ALPHABET_DATA.length - 1}
          hasPrevious={currentIndex > 0}
        />
      )}

      {/* All Letters A-Z Grid Drawer Modal */}
      {isGridOpen && (
        <AlphabetGridModal
          currentIndex={currentIndex}
          completedLetters={completedLetters}
          onSelectLetter={(idx) => navigateToLetter(idx)}
          onClose={() => setIsGridOpen(false)}
        />
      )}
    </div>
  );
}
