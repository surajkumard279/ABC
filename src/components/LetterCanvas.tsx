import React, { useRef, useEffect, useState, useCallback } from 'react';
import { playPopSound, playSparkleSound, unlockAudio } from '../utils/audio';
import { Sparkles, RotateCcw, Wand2 } from 'lucide-react';

interface LetterCanvasProps {
  letter: string;
  themeColor: string;
  onComplete: () => void;
  isCompleted: boolean;
}

interface TargetPoint {
  x: number;
  y: number;
  colored: boolean;
}

const PALETTE = [
  { name: 'Rainbow', value: 'rainbow', color: 'linear-gradient(135deg, #ef4444, #f59e0b, #10b981, #3b82f6, #8b5cf6)' },
  { name: 'Red', value: '#ef4444', color: '#ef4444' },
  { name: 'Orange', value: '#f97316', color: '#f97316' },
  { name: 'Yellow', value: '#facc15', color: '#facc15' },
  { name: 'Green', value: '#22c55e', color: '#22c55e' },
  { name: 'Blue', value: '#0ea5e9', color: '#0ea5e9' },
  { name: 'Purple', value: '#a855f7', color: '#a855f7' },
  { name: 'Pink', value: '#ec4899', color: '#ec4899' },
];

export const LetterCanvas: React.FC<LetterCanvasProps> = ({
  letter,
  themeColor,
  onComplete,
  isCompleted,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const paintCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const targetPointsRef = useRef<TargetPoint[]>([]);
  const coloredCountRef = useRef(0);
  const soundThrottleRef = useRef(0);
  const rainbowHueRef = useRef(0);

  const [activeColor, setActiveColor] = useState<string>('rainbow');
  const [brushSize, setBrushSize] = useState<number>(36);
  const [progress, setProgress] = useState<number>(0);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  // Canvas logical dimensions
  const CANVAS_WIDTH = 340;
  const CANVAS_HEIGHT = 380;
  const FONT_SPEC = '900 310px "Fredoka", "Arial Rounded MT Bold", sans-serif';

  // Distance from point (px, py) to line segment (x1, y1) -> (x2, y2)
  const distToSegment = (
    px: number,
    py: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
    if (l2 === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
  };

  // Re-composite main display canvas from paint canvas + crisp outline
  const renderComposite = useCallback(() => {
    const canvas = canvasRef.current;
    const paintCanvas = paintCanvasRef.current;
    if (!canvas || !paintCanvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 1. Draw base letter silhouette in soft white with very subtle inner glow
    ctx.save();
    ctx.font = FONT_SPEC;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const centerX = CANVAS_WIDTH / 2;
    const centerY = CANVAS_HEIGHT / 2 + 15;

    // Draw white interior fill
    ctx.fillStyle = '#ffffff';
    ctx.fillText(letter, centerX, centerY);

    // 2. Composite user brush strokes ONLY where the letter interior is filled!
    ctx.globalCompositeOperation = 'source-in';
    ctx.drawImage(paintCanvas, 0, 0);

    // Restore to normal compositing
    ctx.globalCompositeOperation = 'source-over';

    // 3. Draw thin, clean, crisp outline ON TOP so it looks clean to colour
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#334155'; // clean dark slate border
    ctx.strokeText(letter, centerX, centerY);

    ctx.restore();
  }, [letter]);

  // Initialize or reset letter canvas
  const initLetter = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set up internal paint canvas
    let paintCanvas = paintCanvasRef.current;
    if (!paintCanvas) {
      paintCanvas = document.createElement('canvas');
      paintCanvas.width = CANVAS_WIDTH;
      paintCanvas.height = CANVAS_HEIGHT;
      paintCanvasRef.current = paintCanvas;
    } else {
      const pCtx = paintCanvas.getContext('2d');
      pCtx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    // High DPI scaling for ultra-crisp display
    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_WIDTH * dpr;
    canvas.height = CANVAS_HEIGHT * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    }

    // Pre-calculate target sampling grid inside the letter shape
    // Create an offscreen test context
    const testCanvas = document.createElement('canvas');
    testCanvas.width = CANVAS_WIDTH;
    testCanvas.height = CANVAS_HEIGHT;
    const tCtx = testCanvas.getContext('2d');
    const points: TargetPoint[] = [];

    if (tCtx) {
      tCtx.font = FONT_SPEC;
      tCtx.textAlign = 'center';
      tCtx.textBaseline = 'middle';
      const centerX = CANVAS_WIDTH / 2;
      const centerY = CANVAS_HEIGHT / 2 + 15;
      tCtx.fillStyle = '#000000';
      tCtx.fillText(letter, centerX, centerY);

      // Sample pixels on a 14px grid
      const imgData = tCtx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      const data = imgData.data;

      for (let y = 30; y < CANVAS_HEIGHT - 30; y += 14) {
        for (let x = 20; x < CANVAS_WIDTH - 20; x += 14) {
          const alpha = data[(y * CANVAS_WIDTH + x) * 4 + 3];
          if (alpha > 120) {
            points.push({ x, y, colored: false });
          }
        }
      }
    }

    targetPointsRef.current = points;
    coloredCountRef.current = 0;
    setProgress(0);
    renderComposite();
  }, [letter, renderComposite]);

  useEffect(() => {
    initLetter();
  }, [initLetter]);

  // Magic Sparkle Fill - fills the letter with rainbow colors & triggers completion
  const handleMagicFill = () => {
    const paintCanvas = paintCanvasRef.current;
    if (!paintCanvas) return;
    const pCtx = paintCanvas.getContext('2d');
    if (!pCtx) return;

    playSparkleSound();

    // Create a gorgeous rainbow gradient across the letter
    const grad = pCtx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    grad.addColorStop(0, '#ef4444');
    grad.addColorStop(0.2, '#f97316');
    grad.addColorStop(0.4, '#facc15');
    grad.addColorStop(0.6, '#22c55e');
    grad.addColorStop(0.8, '#3b82f6');
    grad.addColorStop(1, '#a855f7');

    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Mark all points colored
    targetPointsRef.current.forEach((pt) => (pt.colored = true));
    coloredCountRef.current = targetPointsRef.current.length;
    setProgress(100);
    renderComposite();

    // Spawn celebration sparkles
    const newSparkles = Array.from({ length: 14 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * (CANVAS_WIDTH - 80) + 40,
      y: Math.random() * (CANVAS_HEIGHT - 80) + 40,
      color: ['#facc15', '#ec4899', '#38bdf8', '#4ade80', '#a855f7'][i % 5],
    }));
    setSparkles(newSparkles);

    setTimeout(() => {
      onComplete();
    }, 450);
  };

  // Add paint stroke
  const paintStroke = (x0: number, y0: number, x1: number, y1: number) => {
    const paintCanvas = paintCanvasRef.current;
    if (!paintCanvas) return;
    const pCtx = paintCanvas.getContext('2d');
    if (!pCtx) return;

    pCtx.lineCap = 'round';
    pCtx.lineJoin = 'round';
    pCtx.lineWidth = brushSize;

    if (activeColor === 'rainbow') {
      rainbowHueRef.current = (rainbowHueRef.current + 8) % 360;
      pCtx.strokeStyle = `hsl(${rainbowHueRef.current}, 95%, 55%)`;
    } else {
      pCtx.strokeStyle = activeColor;
    }

    pCtx.beginPath();
    pCtx.moveTo(x0, y0);
    pCtx.lineTo(x1, y1);
    pCtx.stroke();

    // Check newly colored sampling points
    const points = targetPointsRef.current;
    const total = points.length;
    if (total === 0) return;

    let newlyColored = 0;
    const radius = brushSize / 2 + 10;

    for (let i = 0; i < total; i++) {
      const pt = points[i];
      if (!pt.colored) {
        if (distToSegment(pt.x, pt.y, x0, y0, x1, y1) <= radius) {
          pt.colored = true;
          coloredCountRef.current++;
          newlyColored++;
        }
      }
    }

    const currentPercent = Math.min(
      100,
      Math.round((coloredCountRef.current / total) * 100)
    );
    setProgress(currentPercent);
    renderComposite();

    // Sound feedback throttled
    const now = Date.now();
    if (now - soundThrottleRef.current > 120) {
      soundThrottleRef.current = now;
      playPopSound(0.85 + (currentPercent / 100) * 0.5);
    }

    // Spawn light sparkle particle
    if (Math.random() < 0.3) {
      const sparkleColor =
        activeColor === 'rainbow'
          ? `hsl(${rainbowHueRef.current}, 90%, 60%)`
          : activeColor;
      setSparkles((prev) => [
        ...prev.slice(-8),
        { id: Date.now() + Math.random(), x: x1, y: y1, color: sparkleColor },
      ]);
    }

    // Auto complete when child reaches >= 88%
    if (currentPercent >= 88 && !isCompleted) {
      // Auto-fill the remaining 10% smoothly
      setTimeout(() => {
        targetPointsRef.current.forEach((pt) => (pt.colored = true));
        coloredCountRef.current = total;
        setProgress(100);
        onComplete();
      }, 200);
    }
  };

  // Touch and Pointer Event Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    unlockAudio();
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * CANVAS_WIDTH;
    const y = ((e.clientY - rect.top) / rect.height) * CANVAS_HEIGHT;

    lastPointRef.current = { x, y };
    paintStroke(x, y, x + 0.1, y + 0.1);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * CANVAS_WIDTH;
    const y = ((e.clientY - rect.top) / rect.height) * CANVAS_HEIGHT;

    if (lastPointRef.current) {
      paintStroke(lastPointRef.current.x, lastPointRef.current.y, x, y);
    }
    lastPointRef.current = { x, y };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    try {
      canvasRef.current?.releasePointerCapture(e.pointerId);
    } catch (err) {
      // Ignore
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto select-none">
      {/* Progress Bar & Cheer Indicator */}
      <div className="w-full px-4 mb-2 flex items-center justify-between gap-3">
        <div className="flex-1 bg-white/80 rounded-full h-5 p-1 shadow-inner border-2 border-white flex items-center">
          <div
            className="h-full rounded-full transition-all duration-200 bg-gradient-to-r from-amber-400 via-rose-400 to-emerald-400 shadow-sm"
            style={{ width: `${Math.max(6, progress)}%` }}
          />
        </div>
        <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-md border border-slate-100 font-extrabold text-sm text-slate-700">
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
          <span>{progress}%</span>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div className="relative w-full aspect-[340/380] max-h-[380px] flex items-center justify-center">
        {/* Glow backdrop behind letter */}
        <div
          className="absolute inset-4 rounded-3xl opacity-30 filter blur-xl transition-colors duration-500"
          style={{ backgroundColor: themeColor }}
        />

        {/* Canvas card */}
        <div className="relative w-full h-full bg-white/95 rounded-3xl border-4 border-white shadow-xl shadow-sky-200/50 overflow-hidden flex items-center justify-center p-1 touch-none">
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="w-full h-full cursor-pointer touch-none block"
            style={{ touchAction: 'none' }}
          />

          {/* Sparkle particles overlay */}
          {sparkles.map((sp) => (
            <div
              key={sp.id}
              className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-ping"
              style={{
                left: `${(sp.x / CANVAS_WIDTH) * 100}%`,
                top: `${(sp.y / CANVAS_HEIGHT) * 100}%`,
              }}
            >
              <div
                className="w-4 h-4 rounded-full shadow-lg"
                style={{ backgroundColor: sp.color }}
              />
            </div>
          ))}

          {/* Toddler Instruction hint when letter is untouched */}
          {progress === 0 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-amber-400/95 text-amber-950 font-bold px-4 py-1.5 rounded-full text-xs shadow-md border-2 border-white pointer-events-none flex items-center gap-1.5 animate-bounce">
              <span>👉</span>
              <span>Colour inside the letter!</span>
            </div>
          )}
        </div>
      </div>

      {/* Chunky Crayon Palette (Ages 2-6) */}
      <div className="w-full mt-3 px-2">
        <div className="flex items-center justify-center gap-2 flex-wrap bg-white/90 p-2.5 rounded-2xl shadow-md border-2 border-white">
          {PALETTE.map((p) => {
            const isSelected = activeColor === p.value;
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => {
                  setActiveColor(p.value);
                  playPopSound(1.2);
                }}
                className={`relative w-9 h-11 sm:w-10 sm:h-12 rounded-xl transition-all duration-150 flex flex-col items-center justify-start pt-1 cursor-pointer ${
                  isSelected
                    ? 'ring-4 ring-slate-800 scale-110 -translate-y-1.5 z-10 shadow-lg'
                    : 'hover:scale-105 active:scale-95 shadow-sm'
                }`}
                style={{
                  background: p.color,
                }}
                title={p.name}
                aria-label={`Select ${p.name} crayon`}
              >
                {/* Cute crayon tip highlight */}
                <div className="w-2.5 h-1.5 bg-white/60 rounded-full mb-1" />
                {isSelected && (
                  <span className="text-[10px] font-black text-white drop-shadow">★</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Brush size & Quick Tools */}
        <div className="flex items-center justify-between gap-2 mt-2 px-1">
          {/* Brush sizes */}
          <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-xl shadow-sm border border-white">
            <span className="text-xs font-bold text-slate-600">Brush:</span>
            <button
              type="button"
              onClick={() => {
                setBrushSize(26);
                playPopSound(1.1);
              }}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                brushSize === 26 ? 'bg-amber-400 text-white shadow-sm ring-2 ring-amber-500' : 'bg-slate-200'
              }`}
              title="Medium brush"
            >
              <div className="w-3.5 h-3.5 rounded-full bg-slate-700" />
            </button>
            <button
              type="button"
              onClick={() => {
                setBrushSize(44);
                playPopSound(1.3);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                brushSize === 44 ? 'bg-amber-400 text-white shadow-sm ring-2 ring-amber-500' : 'bg-slate-200'
              }`}
              title="Jumbo toddler brush"
            >
              <div className="w-5 h-5 rounded-full bg-slate-700" />
            </button>
          </div>

          {/* Quick Action buttons */}
          <div className="flex items-center gap-2">
            {/* Clear / Recolor */}
            <button
              type="button"
              onClick={() => {
                playPopSound(0.7);
                initLetter();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-700 hover:bg-slate-50 active:scale-95 font-bold text-xs rounded-xl shadow-sm border border-slate-200 transition-all cursor-pointer"
              title="Clear & Redo"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset</span>
            </button>

            {/* Magic Sparkle Wand */}
            <button
              type="button"
              onClick={handleMagicFill}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-amber-400 to-pink-500 text-white active:scale-95 font-black text-xs rounded-xl shadow-md border-2 border-white transition-all cursor-pointer"
              title="Magic Sparkle Fill"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Magic</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
