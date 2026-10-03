/**
 * Robust Preschool Audio & Voice Engine
 * Handles Web Audio API with high, audible gain levels, automatic gesture unlocking,
 * fail-safe sound effects, and resilient SpeechSynthesis with voice pre-loading.
 */

let audioCtx: AudioContext | null = null;
let isMusicPlaying = false;
let musicTimeout: any = null;
let voicesLoaded = false;
let cachedVoices: SpeechSynthesisVoice[] = [];

// Initialize voices as soon as browser is ready
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const updateVoices = () => {
    try {
      cachedVoices = window.speechSynthesis.getVoices();
      if (cachedVoices.length > 0) {
        voicesLoaded = true;
      }
    } catch (e) {
      // Ignore
    }
  };

  updateVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = updateVoices;
  }
}

export function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Call on any user tap/touch to unlock audio on iOS/Android
 */
export function unlockAudio(): boolean {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Loud, clear bubble pop when child strokes or selects colors
 */
export function playPopSound(pitchMultiplier = 1) {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const startFreq = 480 * pitchMultiplier;
    const endFreq = 960 * pitchMultiplier;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.09);

    // High audible gain (0.75) for mobile speakers
    gain.gain.setValueAtTime(0.75, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // Ignore
  }
}

/**
 * Playful cartoon boing for buttons
 */
export function playBoingSound() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(520, ctx.currentTime + 0.08);
    osc.frequency.linearRampToValueAtTime(360, ctx.currentTime + 0.16);
    osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.24);

    gain.gain.setValueAtTime(0.85, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.29);
  } catch (e) {
    // Ignore
  }
}

/**
 * Bright, joyful sparkle chime
 */
export function playSparkleSound() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const startTime = ctx.currentTime + index * 0.06;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Increased gain for crisp audibility
      gain.gain.setValueAtTime(0.65, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.32);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  } catch (e) {
    // Ignore
  }
}

/**
 * Triumphant Celebration Fanfare when finishing letter
 */
export function playSuccessFanfare() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const arpeggio = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    arpeggio.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const startTime = ctx.currentTime + index * 0.08;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.8, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.42);
    });

    // Sustained high celebration chord at 380ms
    setTimeout(() => {
      try {
        const finalNotes = [523.25, 659.25, 783.99, 1046.5];
        finalNotes.forEach(freq => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          gain.gain.setValueAtTime(0.7, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.9);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 0.95);
        });
      } catch (err) {
        // Ignore
      }
    }, 380);
  } catch (e) {
    // Ignore
  }
}

/**
 * Melodic phonics acoustic chime - played alongside speech so audio is NEVER silent
 */
export function playPhonicsChime(letter: string) {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    // Map letter A-Z to a pleasant musical pitch
    const charCode = letter.toUpperCase().charCodeAt(0) - 65; // 0 to 25
    const baseFreq = 440 + (charCode % 12) * 35; // friendly melodic pitch

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.8, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.42);
  } catch (e) {
    // Ignore
  }
}

/**
 * Background Nursery Music (Gentle ABC Melody)
 */
const ABC_NOTES: [number, number][] = [
  [261.63, 1], [261.63, 1], [392.00, 1], [392.00, 1],
  [440.00, 1], [440.00, 1], [392.00, 2],
  [349.23, 1], [349.23, 1], [329.63, 1], [329.63, 1],
  [293.66, 1], [293.66, 1], [261.63, 2],
  [392.00, 1], [392.00, 1], [349.23, 1], [349.23, 1],
  [329.63, 1], [329.63, 1], [293.66, 2],
  [392.00, 1], [392.00, 1], [349.23, 1], [349.23, 1],
  [329.63, 1], [329.63, 1], [293.66, 2],
];

let currentNoteIndex = 0;

export function toggleBackgroundMusic(enabled?: boolean): boolean {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    if (enabled !== undefined) {
      isMusicPlaying = !enabled;
    }

    if (isMusicPlaying) {
      isMusicPlaying = false;
      if (musicTimeout) {
        clearTimeout(musicTimeout);
        musicTimeout = null;
      }
      return false;
    } else {
      isMusicPlaying = true;
      currentNoteIndex = 0;
      const tempo = 360;

      const playNextNote = () => {
        if (!isMusicPlaying) return;
        const [freq, beats] = ABC_NOTES[currentNoteIndex];
        currentNoteIndex = (currentNoteIndex + 1) % ABC_NOTES.length;

        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const dur = (beats * tempo) / 1000;
        // Increased from 0.045 to 0.3 for clear audibility
        noteGain.gain.setValueAtTime(0.32, ctx.currentTime);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur * 1.1);

        osc.connect(noteGain);
        noteGain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + dur * 1.2);

        musicTimeout = setTimeout(playNextNote, beats * tempo);
      };

      playNextNote();
      return true;
    }
  } catch (e) {
    return false;
  }
}

export function isBgMusicActive(): boolean {
  return isMusicPlaying;
}

/**
 * Speech Synthesis with maximum reliability across Android, Chrome, and iOS
 */
export function speakText(
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    onEnd?: () => void;
    interrupt?: boolean;
    letterHint?: string;
  }
) {
  // Always play corresponding melodic chime first so user IMMEDIATELY hears clear audio
  if (options?.letterHint) {
    playPhonicsChime(options.letterHint);
  } else {
    playSparkleSound();
  }

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (options?.onEnd) options.onEnd();
    return;
  }

  try {
    // Unpause speech synthesis if browser paused it
    window.speechSynthesis.resume();

    if (options?.interrupt !== false) {
      window.speechSynthesis.cancel();
    }

    // Small timeout ensures cancel() does not wipe out the newly queued speech in Chrome
    setTimeout(() => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.volume = 1.0; // FULL VOLUME
        utterance.pitch = options?.pitch ?? 1.2;
        utterance.rate = options?.rate ?? 0.85;
        utterance.lang = 'en-US';

        const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(
          v =>
            v.lang.startsWith('en') &&
            (v.name.includes('Samantha') ||
              v.name.includes('Google US English') ||
              v.name.includes('Karen') ||
              v.name.includes('Victoria') ||
              v.name.includes('Natural') ||
              v.name.includes('English'))
        ) || voices.find(v => v.lang.startsWith('en'));

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        if (options?.onEnd) {
          utterance.onend = () => options.onEnd?.();
          utterance.onerror = () => options.onEnd?.();
        }

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        if (options?.onEnd) options.onEnd();
      }
    }, 40);
  } catch (err) {
    if (options?.onEnd) options.onEnd();
  }
}

/**
 * Speaks completion sequence:
 * "Yaaayyyy! A!" -> "A! A for Apple!"
 */
export function speakCompletionSequence(letter: string, word: string) {
  playSuccessFanfare();

  speakText(`Yaaayyyy! ${letter}!`, {
    rate: 0.9,
    pitch: 1.25,
    letterHint: letter,
    onEnd: () => {
      setTimeout(() => {
        speakText(`${letter}! ${letter} for ${word}!`, {
          rate: 0.82,
          pitch: 1.2,
          letterHint: letter,
        });
      }, 350);
    },
  });
}
