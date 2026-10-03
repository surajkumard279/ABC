import React from 'react';

interface CartoonIllustrationProps {
  letter: string;
  word: string;
  className?: string;
  size?: number;
}

export const CartoonIllustration: React.FC<CartoonIllustrationProps> = ({
  letter,
  word,
  className = '',
  size = 200,
}) => {
  const normWord = word.toLowerCase();

  // Render dedicated crisp cartoon vector clipart for each vocabulary word
  const renderClipart = () => {
    switch (letter) {
      case 'A': // Apple
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            {/* Shadow */}
            <ellipse cx="80" cy="148" rx="46" ry="9" fill="#00000018" />
            {/* Apple body */}
            <path
              d="M80 38 C55 30 20 50 22 92 C23 124 55 142 78 142 C80 142 80 142 82 142 C105 142 137 124 138 92 C140 50 105 30 80 38 Z"
              fill="#ef4444"
              stroke="#991b1b"
              strokeWidth="5"
            />
            {/* Apple shine */}
            <path
              d="M38 65 C32 80 36 105 48 118"
              stroke="#ffffff"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
            {/* Stem */}
            <path
              d="M80 38 C80 20 92 14 96 10"
              stroke="#78350f"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            {/* Green Leaf */}
            <path
              d="M84 28 C106 18 120 28 116 42 C102 46 88 38 84 28 Z"
              fill="#22c55e"
              stroke="#15803d"
              strokeWidth="3.5"
            />
            {/* Leaf vein */}
            <path d="M88 32 Q102 32 110 34" stroke="#166534" strokeWidth="2.5" fill="none" />
            {/* Cute Cartoon Face */}
            <ellipse cx="62" cy="85" rx="5" ry="7" fill="#1e293b" />
            <ellipse cx="98" cy="85" rx="5" ry="7" fill="#1e293b" />
            <circle cx="64" cy="83" r="2" fill="#ffffff" />
            <circle cx="100" cy="83" r="2" fill="#ffffff" />
            {/* Rosy cheeks */}
            <circle cx="52" cy="94" r="7" fill="#fda4af" opacity="0.85" />
            <circle cx="108" cy="94" r="7" fill="#fda4af" opacity="0.85" />
            {/* Happy Smile */}
            <path
              d="M72 96 Q80 106 88 96"
              stroke="#1e293b"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        );

      case 'B': // Ball
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="48" ry="9" fill="#00000018" />
            {/* Beach / Play Ball */}
            <circle cx="80" cy="80" r="62" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="6" />
            {/* Colorful panels */}
            <path
              d="M80 18 C50 35 30 65 30 80 C30 95 50 125 80 142 C60 120 50 100 50 80 C50 60 60 40 80 18 Z"
              fill="#ef4444"
            />
            <path
              d="M80 18 C110 35 130 65 130 80 C130 95 110 125 80 142 C100 120 110 100 110 80 C110 60 100 40 80 18 Z"
              fill="#eab308"
            />
            <path
              d="M80 18 C92 38 98 60 98 80 C98 100 92 122 80 142 C68 122 62 100 62 80 C62 60 68 38 80 18 Z"
              fill="#22c55e"
            />
            {/* Center cap */}
            <ellipse cx="80" cy="30" rx="14" ry="7" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
            {/* Cartoon eyes on ball */}
            <ellipse cx="68" cy="76" rx="5" ry="7" fill="#1e293b" />
            <ellipse cx="92" cy="76" rx="5" ry="7" fill="#1e293b" />
            <circle cx="70" cy="74" r="2" fill="#ffffff" />
            <circle cx="94" cy="74" r="2" fill="#ffffff" />
            <circle cx="58" cy="85" r="5" fill="#fda4af" opacity="0.8" />
            <circle cx="102" cy="85" r="5" fill="#fda4af" opacity="0.8" />
            <path
              d="M75 87 Q80 94 85 87"
              stroke="#1e293b"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Specular gloss */}
            <path
              d="M45 42 C40 54 40 68 45 78"
              stroke="#ffffff"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
          </svg>
        );

      case 'C': // Cat
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="44" ry="9" fill="#00000018" />
            {/* Body */}
            <ellipse cx="80" cy="116" rx="40" ry="30" fill="#f97316" stroke="#c2410c" strokeWidth="5" />
            {/* Tail */}
            <path
              d="M116 122 C138 122 144 95 136 82 C132 76 124 82 128 90 C132 98 126 112 114 114"
              fill="#f97316"
              stroke="#c2410c"
              strokeWidth="4.5"
            />
            {/* Ears */}
            <polygon
              points="44,52 32,18 64,36"
              fill="#f97316"
              stroke="#c2410c"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <polygon points="44,46 38,26 58,38" fill="#fda4af" />
            <polygon
              points="116,52 128,18 96,36"
              fill="#f97316"
              stroke="#c2410c"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <polygon points="116,46 122,26 102,38" fill="#fda4af" />
            {/* Head */}
            <circle cx="80" cy="68" r="42" fill="#fb923c" stroke="#c2410c" strokeWidth="5" />
            {/* Cute big eyes */}
            <ellipse cx="64" cy="64" rx="7" ry="9" fill="#1e293b" />
            <ellipse cx="96" cy="64" rx="7" ry="9" fill="#1e293b" />
            <circle cx="66" cy="61" r="3" fill="#ffffff" />
            <circle cx="98" cy="61" r="3" fill="#ffffff" />
            {/* Pink Nose */}
            <polygon points="76,76 84,76 80,82" fill="#ec4899" />
            {/* Kitty mouth */}
            <path
              d="M72 84 Q80 90 80 82 Q80 90 88 84"
              stroke="#1e293b"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Whiskers */}
            <line x1="34" y1="72" x2="52" y2="75" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
            <line x1="34" y1="84" x2="52" y2="82" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
            <line x1="126" y1="72" x2="108" y2="75" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
            <line x1="126" y1="84" x2="108" y2="82" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
            {/* Rosy Cheeks */}
            <circle cx="50" cy="80" r="6" fill="#fda4af" opacity="0.8" />
            <circle cx="110" cy="80" r="6" fill="#fda4af" opacity="0.8" />
          </svg>
        );

      case 'D': // Dog
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="46" ry="9" fill="#00000018" />
            {/* Body */}
            <ellipse cx="80" cy="118" rx="38" ry="28" fill="#eab308" stroke="#ca8a04" strokeWidth="5" />
            {/* Tail wagging */}
            <path
              d="M114 116 Q138 108 142 90"
              stroke="#ca8a04"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            {/* Floppy Ears */}
            <ellipse
              cx="40"
              cy="65"
              rx="14"
              ry="26"
              fill="#b45309"
              stroke="#78350f"
              strokeWidth="4"
              transform="rotate(-18 40 65)"
            />
            <ellipse
              cx="120"
              cy="65"
              rx="14"
              ry="26"
              fill="#b45309"
              stroke="#78350f"
              strokeWidth="4"
              transform="rotate(18 120 65)"
            />
            {/* Head */}
            <ellipse cx="80" cy="72" rx="42" ry="38" fill="#facc15" stroke="#ca8a04" strokeWidth="5" />
            {/* Big Friendly Eyes */}
            <ellipse cx="64" cy="64" rx="7" ry="9" fill="#1e293b" />
            <ellipse cx="96" cy="64" rx="7" ry="9" fill="#1e293b" />
            <circle cx="66" cy="61" r="3" fill="#ffffff" />
            <circle cx="98" cy="61" r="3" fill="#ffffff" />
            {/* Snout */}
            <ellipse cx="80" cy="86" rx="20" ry="14" fill="#fef08a" stroke="#ca8a04" strokeWidth="3" />
            {/* Black Nose */}
            <ellipse cx="80" cy="80" rx="9" ry="6" fill="#1e293b" />
            <circle cx="78" cy="78" r="2" fill="#ffffff" />
            {/* Cute Happy Tongue */}
            <path d="M78 94 Q80 108 86 108 Q92 108 88 94" fill="#f43f5e" stroke="#be123c" strokeWidth="2.5" />
            <path
              d="M72 88 Q80 94 88 88"
              stroke="#1e293b"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        );

      case 'E': // Elephant
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="48" ry="9" fill="#00000018" />
            {/* Big Ears */}
            <circle cx="36" cy="70" r="28" fill="#93c5fd" stroke="#2563eb" strokeWidth="4" />
            <circle cx="36" cy="70" r="18" fill="#bfdbfe" />
            <circle cx="124" cy="70" r="28" fill="#93c5fd" stroke="#2563eb" strokeWidth="4" />
            <circle cx="124" cy="70" r="18" fill="#bfdbfe" />
            {/* Body */}
            <ellipse cx="80" cy="110" rx="42" ry="34" fill="#60a5fa" stroke="#2563eb" strokeWidth="5" />
            {/* Feet */}
            <ellipse cx="60" cy="140" rx="12" ry="7" fill="#93c5fd" stroke="#2563eb" strokeWidth="3.5" />
            <ellipse cx="100" cy="140" rx="12" ry="7" fill="#93c5fd" stroke="#2563eb" strokeWidth="3.5" />
            {/* Head */}
            <ellipse cx="80" cy="76" rx="38" ry="34" fill="#60a5fa" stroke="#2563eb" strokeWidth="5" />
            {/* Trunk swinging happily */}
            <path
              d="M80 84 C80 108 72 124 92 128 C104 130 108 116 100 110"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M80 84 C80 108 72 124 92 128 C104 130 108 116 100 110"
              fill="none"
              stroke="#2563eb"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Water drops spraying from trunk */}
            <circle cx="112" cy="98" r="4" fill="#38bdf8" />
            <circle cx="124" cy="90" r="3.5" fill="#38bdf8" />
            <circle cx="118" cy="80" r="3" fill="#38bdf8" />
            {/* Happy Eyes */}
            <ellipse cx="66" cy="68" rx="6" ry="8" fill="#1e293b" />
            <ellipse cx="94" cy="68" rx="6" ry="8" fill="#1e293b" />
            <circle cx="68" cy="66" r="2.5" fill="#ffffff" />
            <circle cx="96" cy="66" r="2.5" fill="#ffffff" />
            <circle cx="54" cy="80" r="6" fill="#fda4af" opacity="0.85" />
            <circle cx="106" cy="80" r="6" fill="#fda4af" opacity="0.85" />
          </svg>
        );

      case 'F': // Fish (or Frog)
        if (normWord.includes('frog')) {
          return (
            <svg viewBox="0 0 160 160" width="100%" height="100%">
              <ellipse cx="80" cy="148" rx="46" ry="9" fill="#00000018" />
              {/* Lily pad */}
              <ellipse cx="80" cy="144" rx="52" ry="12" fill="#15803d" opacity="0.5" />
              {/* Big Frog Eyes */}
              <circle cx="54" cy="46" r="18" fill="#22c55e" stroke="#15803d" strokeWidth="4" />
              <circle cx="106" cy="46" r="18" fill="#22c55e" stroke="#15803d" strokeWidth="4" />
              <circle cx="54" cy="46" r="10" fill="#1e293b" />
              <circle cx="106" cy="46" r="10" fill="#1e293b" />
              <circle cx="56" cy="43" r="4" fill="#ffffff" />
              <circle cx="108" cy="43" r="4" fill="#ffffff" />
              {/* Head / Body */}
              <ellipse cx="80" cy="90" rx="46" ry="38" fill="#4ade80" stroke="#15803d" strokeWidth="5" />
              {/* Yellow belly */}
              <ellipse cx="80" cy="104" rx="28" ry="20" fill="#fef08a" />
              {/* Giant happy smile */}
              <path
                d="M52 86 Q80 112 108 86"
                stroke="#15803d"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="48" cy="86" r="6" fill="#f472b6" opacity="0.8" />
              <circle cx="112" cy="86" r="6" fill="#f472b6" opacity="0.8" />
            </svg>
          );
        }
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="46" ry="9" fill="#00000018" />
            {/* Bubbles */}
            <circle cx="34" cy="48" r="6" fill="#38bdf8" opacity="0.6" />
            <circle cx="24" cy="34" r="4" fill="#38bdf8" opacity="0.7" />
            {/* Tail Fin */}
            <polygon points="144,48 116,80 144,112 130,80" fill="#fb7185" stroke="#e11d48" strokeWidth="4" />
            {/* Top and Bottom Fins */}
            <path d="M72 40 Q84 18 100 38" fill="#fb7185" stroke="#e11d48" strokeWidth="3" />
            <path d="M78 120 Q88 138 98 120" fill="#fb7185" stroke="#e11d48" strokeWidth="3" />
            {/* Fish Body */}
            <ellipse cx="76" cy="80" rx="48" ry="38" fill="#f97316" stroke="#c2410c" strokeWidth="5" />
            {/* Stripes */}
            <path d="M72 44 Q84 80 72 116" stroke="#ffffff" strokeWidth="7" fill="none" opacity="0.9" />
            <path d="M96 50 Q106 80 96 110" stroke="#ffffff" strokeWidth="7" fill="none" opacity="0.9" />
            {/* Eye */}
            <circle cx="52" cy="72" r="9" fill="#1e293b" />
            <circle cx="54" cy="69" r="3.5" fill="#ffffff" />
            {/* Cheerful mouth */}
            <path
              d="M32 84 Q42 86 38 92"
              stroke="#1e293b"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Cheek */}
            <circle cx="56" cy="88" r="6" fill="#fda4af" opacity="0.9" />
          </svg>
        );

      case 'G': // Grapes
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="40" ry="9" fill="#00000018" />
            {/* Stem & Leaf */}
            <path d="M80 38 Q78 16 92 12" stroke="#78350f" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path
              d="M84 28 C108 18 118 36 104 46 C94 48 84 38 84 28 Z"
              fill="#22c55e"
              stroke="#15803d"
              strokeWidth="3.5"
            />
            {/* Grape Bunch Spheres */}
            {/* Top row */}
            <circle cx="58" cy="52" r="16" fill="#a855f7" stroke="#7e22ce" strokeWidth="3.5" />
            <circle cx="82" cy="50" r="16" fill="#9333ea" stroke="#7e22ce" strokeWidth="3.5" />
            <circle cx="104" cy="54" r="16" fill="#a855f7" stroke="#7e22ce" strokeWidth="3.5" />
            {/* Second row */}
            <circle cx="48" cy="76" r="16" fill="#9333ea" stroke="#7e22ce" strokeWidth="3.5" />
            <circle cx="72" cy="74" r="16" fill="#c084fc" stroke="#7e22ce" strokeWidth="3.5" />
            <circle cx="96" cy="76" r="16" fill="#9333ea" stroke="#7e22ce" strokeWidth="3.5" />
            <circle cx="114" cy="78" r="14" fill="#a855f7" stroke="#7e22ce" strokeWidth="3.5" />
            {/* Third row */}
            <circle cx="60" cy="100" r="16" fill="#9333ea" stroke="#7e22ce" strokeWidth="3.5" />
            <circle cx="84" cy="98" r="16" fill="#a855f7" stroke="#7e22ce" strokeWidth="3.5" />
            <circle cx="104" cy="102" r="14" fill="#c084fc" stroke="#7e22ce" strokeWidth="3.5" />
            {/* Bottom rows */}
            <circle cx="72" cy="120" r="15" fill="#9333ea" stroke="#7e22ce" strokeWidth="3.5" />
            <circle cx="92" cy="122" r="14" fill="#a855f7" stroke="#7e22ce" strokeWidth="3.5" />
            <circle cx="82" cy="138" r="13" fill="#7e22ce" stroke="#6b21a8" strokeWidth="3.5" />
            {/* Cartoon face on center grape */}
            <ellipse cx="68" cy="72" rx="3.5" ry="5" fill="#1e293b" />
            <ellipse cx="80" cy="72" rx="3.5" ry="5" fill="#1e293b" />
            <circle cx="69" cy="70" r="1.5" fill="#ffffff" />
            <circle cx="81" cy="70" r="1.5" fill="#ffffff" />
            <path d="M71 78 Q74 83 78 78" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        );

      case 'H': // Horse (or Hat)
        if (normWord.includes('hat')) {
          return (
            <svg viewBox="0 0 160 160" width="100%" height="100%">
              <ellipse cx="80" cy="148" rx="54" ry="10" fill="#00000018" />
              {/* Brim */}
              <ellipse cx="80" cy="128" rx="60" ry="16" fill="#334155" stroke="#0f172a" strokeWidth="5" />
              {/* Hat Crown */}
              <path
                d="M44 126 L48 48 C48 38 112 38 112 48 L116 126 Z"
                fill="#475569"
                stroke="#0f172a"
                strokeWidth="5"
              />
              {/* Ribbon Band */}
              <path d="M46 112 L114 112 L115 124 L45 124 Z" fill="#ef4444" />
              {/* Gold Buckle */}
              <rect x="70" y="108" width="20" height="18" rx="3" fill="#eab308" stroke="#ca8a04" strokeWidth="3" />
              {/* Sparkle */}
              <circle cx="106" cy="44" r="5" fill="#facc15" />
            </svg>
          );
        }
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="46" ry="9" fill="#00000018" />
            {/* Mane */}
            <path
              d="M52 40 C44 56 46 88 56 100 C50 82 52 58 60 46 Z"
              fill="#78350f"
              stroke="#451a03"
              strokeWidth="3.5"
            />
            {/* Horse Head / Neck */}
            <path
              d="M60 48 L76 24 C82 22 92 28 92 36 L94 48 L124 74 C132 82 128 98 112 104 L88 106 L78 136 L52 136 L60 48 Z"
              fill="#b45309"
              stroke="#78350f"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            {/* Muzzle */}
            <path
              d="M102 82 L124 74 C130 80 128 96 112 104 L96 104 Z"
              fill="#fcd34d"
              stroke="#78350f"
              strokeWidth="3.5"
            />
            {/* Nostril & Smile */}
            <circle cx="118" cy="88" r="3" fill="#78350f" />
            <path d="M106 96 Q112 100 118 96" stroke="#78350f" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Eye */}
            <circle cx="86" cy="54" r="6" fill="#1e293b" />
            <circle cx="88" cy="52" r="2.5" fill="#ffffff" />
            {/* Ear */}
            <polygon points="76,24 82,6 88,26" fill="#b45309" stroke="#78350f" strokeWidth="3.5" />
            <polygon points="78,22 82,12 86,22" fill="#fda4af" />
          </svg>
        );

      case 'I': // Ice Cream
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="36" ry="8" fill="#00000018" />
            {/* Waffle Cone */}
            <polygon
              points="48,82 112,82 80,146"
              fill="#f59e0b"
              stroke="#b45309"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            {/* Waffle Grid */}
            <line x1="58" y1="88" x2="88" y2="136" stroke="#d97706" strokeWidth="2.5" />
            <line x1="72" y1="88" x2="98" y2="120" stroke="#d97706" strokeWidth="2.5" />
            <line x1="102" y1="88" x2="72" y2="136" stroke="#d97706" strokeWidth="2.5" />
            <line x1="88" y1="88" x2="62" y2="120" stroke="#d97706" strokeWidth="2.5" />
            {/* Ice cream scoops */}
            {/* Mint scoop */}
            <circle cx="64" cy="74" r="22" fill="#34d399" stroke="#059669" strokeWidth="4" />
            {/* Strawberry scoop */}
            <circle cx="96" cy="74" r="22" fill="#fb7185" stroke="#e11d48" strokeWidth="4" />
            {/* Vanilla / Banana top scoop */}
            <circle cx="80" cy="50" r="26" fill="#fef08a" stroke="#ca8a04" strokeWidth="4.5" />
            {/* Red Cherry on top */}
            <circle cx="80" cy="24" r="10" fill="#dc2626" stroke="#991b1b" strokeWidth="3" />
            <path d="M80 18 Q90 6 98 8" stroke="#78350f" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Colorful Sprinkles */}
            <line x1="72" y1="44" x2="76" y2="42" stroke="#ec4899" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="86" y1="46" x2="90" y2="50" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="76" y1="58" x2="82" y2="56" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
            {/* Happy Face */}
            <ellipse cx="74" cy="50" rx="3" ry="4" fill="#1e293b" />
            <ellipse cx="86" cy="50" rx="3" ry="4" fill="#1e293b" />
            <path d="M76 58 Q80 62 84 58" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        );

      case 'J': // Jug
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="44" ry="9" fill="#00000018" />
            {/* Jug Handle */}
            <path
              d="M106 58 C136 58 136 104 104 112"
              fill="none"
              stroke="#0284c7"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M106 58 C136 58 136 104 104 112"
              fill="none"
              stroke="#0369a1"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Jug Body */}
            <path
              d="M58 44 C50 44 44 68 44 94 C44 126 56 142 80 142 C104 142 116 126 116 94 C116 68 110 44 102 44 Z"
              fill="#38bdf8"
              stroke="#0369a1"
              strokeWidth="5"
            />
            {/* Neck / Spout */}
            <path
              d="M52 44 C42 34 50 26 62 26 L98 26 C110 26 118 34 108 44 Z"
              fill="#7dd3fc"
              stroke="#0369a1"
              strokeWidth="4.5"
            />
            {/* Cute pattern band */}
            <path d="M46 90 Q80 100 114 90" stroke="#facc15" strokeWidth="6" fill="none" />
            {/* Face on jug */}
            <ellipse cx="70" cy="74" rx="4" ry="6" fill="#1e293b" />
            <ellipse cx="90" cy="74" rx="4" ry="6" fill="#1e293b" />
            <circle cx="71" cy="72" r="1.5" fill="#ffffff" />
            <circle cx="91" cy="72" r="1.5" fill="#ffffff" />
            <circle cx="62" cy="82" r="5" fill="#fda4af" opacity="0.8" />
            <circle cx="98" cy="82" r="5" fill="#fda4af" opacity="0.8" />
            <path d="M76 82 Q80 88 84 82" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
        );

      case 'K': // Kite
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="150" rx="30" ry="6" fill="#00000010" />
            {/* String & Bows */}
            <path d="M80 108 Q94 128 76 150" stroke="#64748b" strokeWidth="3" fill="none" />
            <polygon points="86,120 96,116 92,126" fill="#ec4899" />
            <polygon points="82,136 72,132 76,142" fill="#22c55e" />
            {/* Diamond Kite Body */}
            <polygon
              points="80,14 128,68 80,110 32,68"
              fill="#ffffff"
              stroke="#e11d48"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            {/* 4 Quadrants */}
            <polygon points="80,14 128,68 80,68" fill="#ef4444" />
            <polygon points="80,14 32,68 80,68" fill="#3b82f6" />
            <polygon points="32,68 80,110 80,68" fill="#eab308" />
            <polygon points="128,68 80,110 80,68" fill="#10b981" />
            {/* Kite Cross struts */}
            <line x1="80" y1="14" x2="80" y2="110" stroke="#78350f" strokeWidth="3" />
            <line x1="32" y1="68" x2="128" y2="68" stroke="#78350f" strokeWidth="3" />
            {/* Smiling Eyes */}
            <ellipse cx="70" cy="56" rx="4" ry="5" fill="#1e293b" />
            <ellipse cx="90" cy="56" rx="4" ry="5" fill="#1e293b" />
            <circle cx="71" cy="54" r="1.5" fill="#ffffff" />
            <circle cx="91" cy="54" r="1.5" fill="#ffffff" />
            <path d="M76 64 Q80 70 84 64" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
        );

      case 'L': // Lion
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="46" ry="9" fill="#00000018" />
            {/* Giant Fluffy Golden Mane */}
            <circle cx="80" cy="74" r="54" fill="#d97706" stroke="#92400e" strokeWidth="5" />
            {/* Mane Fluffs */}
            <circle cx="40" cy="46" r="18" fill="#b45309" />
            <circle cx="120" cy="46" r="18" fill="#b45309" />
            <circle cx="30" cy="80" r="18" fill="#b45309" />
            <circle cx="130" cy="80" r="18" fill="#b45309" />
            <circle cx="46" cy="114" r="18" fill="#b45309" />
            <circle cx="114" cy="114" r="18" fill="#b45309" />
            {/* Ears */}
            <circle cx="48" cy="42" r="14" fill="#fbbf24" stroke="#b45309" strokeWidth="3" />
            <circle cx="48" cy="42" r="8" fill="#f59e0b" />
            <circle cx="112" cy="42" r="14" fill="#fbbf24" stroke="#b45309" strokeWidth="3" />
            <circle cx="112" cy="42" r="8" fill="#f59e0b" />
            {/* Lion Face */}
            <circle cx="80" cy="80" r="38" fill="#fde047" stroke="#b45309" strokeWidth="4.5" />
            {/* Friendly Big Eyes */}
            <ellipse cx="66" cy="72" rx="6" ry="8" fill="#1e293b" />
            <ellipse cx="94" cy="72" rx="6" ry="8" fill="#1e293b" />
            <circle cx="68" cy="70" r="2.5" fill="#ffffff" />
            <circle cx="96" cy="70" r="2.5" fill="#ffffff" />
            {/* Snout */}
            <ellipse cx="80" cy="94" rx="16" ry="12" fill="#ffffff" />
            <polygon points="74,86 86,86 80,94" fill="#b45309" />
            <path
              d="M74 96 Q80 102 80 94 Q80 102 86 96"
              stroke="#1e293b"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            {/* Whiskers */}
            <circle cx="56" cy="90" r="5" fill="#fda4af" opacity="0.8" />
            <circle cx="104" cy="90" r="5" fill="#fda4af" opacity="0.8" />
          </svg>
        );

      case 'M': // Monkey
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="44" ry="9" fill="#00000018" />
            {/* Big Round Ears */}
            <circle cx="34" cy="72" r="20" fill="#78350f" stroke="#451a03" strokeWidth="4" />
            <circle cx="34" cy="72" r="12" fill="#fed7aa" />
            <circle cx="126" cy="72" r="20" fill="#78350f" stroke="#451a03" strokeWidth="4" />
            <circle cx="126" cy="72" r="12" fill="#fed7aa" />
            {/* Head */}
            <circle cx="80" cy="76" r="42" fill="#92400e" stroke="#451a03" strokeWidth="5" />
            {/* Face mask */}
            <ellipse cx="64" cy="68" rx="18" ry="18" fill="#fed7aa" />
            <ellipse cx="96" cy="68" rx="18" ry="18" fill="#fed7aa" />
            <ellipse cx="80" cy="88" rx="28" ry="20" fill="#fed7aa" />
            {/* Eyes */}
            <ellipse cx="64" cy="66" rx="6" ry="8" fill="#1e293b" />
            <ellipse cx="96" cy="66" rx="6" ry="8" fill="#1e293b" />
            <circle cx="66" cy="64" r="2.5" fill="#ffffff" />
            <circle cx="98" cy="64" r="2.5" fill="#ffffff" />
            {/* Nose & Smile */}
            <circle cx="76" cy="84" r="2.5" fill="#451a03" />
            <circle cx="84" cy="84" r="2.5" fill="#451a03" />
            <path
              d="M62 92 Q80 108 98 92"
              stroke="#451a03"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Rosy Cheeks */}
            <circle cx="54" cy="88" r="6" fill="#fbcfe8" opacity="0.8" />
            <circle cx="106" cy="88" r="6" fill="#fbcfe8" opacity="0.8" />
          </svg>
        );

      case 'N': // Nest
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="52" ry="9" fill="#00000018" />
            {/* 3 Sky-Blue Speckled Eggs */}
            <ellipse
              cx="58"
              cy="74"
              rx="15"
              ry="21"
              fill="#7dd3fc"
              stroke="#0284c7"
              strokeWidth="3.5"
              transform="rotate(-15 58 74)"
            />
            <ellipse
              cx="82"
              cy="66"
              rx="16"
              ry="22"
              fill="#bae6fd"
              stroke="#0284c7"
              strokeWidth="3.5"
            />
            <ellipse
              cx="102"
              cy="74"
              rx="15"
              ry="21"
              fill="#7dd3fc"
              stroke="#0284c7"
              strokeWidth="3.5"
              transform="rotate(15 102 74)"
            />
            {/* Specks on eggs */}
            <circle cx="56" cy="70" r="2" fill="#0284c7" opacity="0.6" />
            <circle cx="80" cy="62" r="2" fill="#0284c7" opacity="0.6" />
            <circle cx="104" cy="70" r="2" fill="#0284c7" opacity="0.6" />
            {/* Cozy Woven Twig Nest */}
            <ellipse cx="80" cy="108" rx="56" ry="32" fill="#854d0e" stroke="#5b3109" strokeWidth="5" />
            {/* Interlaced twigs */}
            <path d="M30 102 Q80 126 130 104" stroke="#ca8a04" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M26 112 Q80 134 134 112" stroke="#713f12" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M36 122 Q80 140 124 122" stroke="#eab308" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Green leaf sticking out */}
            <path d="M120 94 Q138 88 136 100 Q126 104 120 94 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2.5" />
          </svg>
        );

      case 'O': // Owl
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="46" ry="9" fill="#00000018" />
            {/* Branch */}
            <rect x="22" y="132" width="116" height="12" rx="6" fill="#78350f" stroke="#451a03" strokeWidth="3" />
            {/* Owl Body */}
            <ellipse cx="80" cy="88" rx="44" ry="46" fill="#6366f1" stroke="#4338ca" strokeWidth="5" />
            {/* Tuft Ears */}
            <polygon points="46,48 38,20 62,38" fill="#4338ca" />
            <polygon points="114,48 122,20 98,38" fill="#4338ca" />
            {/* Belly feathers */}
            <ellipse cx="80" cy="104" rx="26" ry="24" fill="#e0e7ff" />
            {/* Huge Round Eyes */}
            <circle cx="56" cy="68" r="18" fill="#ffffff" stroke="#4338ca" strokeWidth="4" />
            <circle cx="104" cy="68" r="18" fill="#ffffff" stroke="#4338ca" strokeWidth="4" />
            <circle cx="56" cy="68" r="10" fill="#1e293b" />
            <circle cx="104" cy="68" r="10" fill="#1e293b" />
            <circle cx="59" cy="65" r="3.5" fill="#ffffff" />
            <circle cx="107" cy="65" r="3.5" fill="#ffffff" />
            {/* Orange Beak */}
            <polygon points="74,78 86,78 80,90" fill="#f97316" stroke="#c2410c" strokeWidth="2.5" />
            {/* Cute Yellow Talons */}
            <circle cx="68" cy="132" r="5" fill="#eab308" />
            <circle cx="76" cy="132" r="5" fill="#eab308" />
            <circle cx="84" cy="132" r="5" fill="#eab308" />
            <circle cx="92" cy="132" r="5" fill="#eab308" />
          </svg>
        );

      case 'P': // Parrot (or Pen)
        if (normWord.includes('pen')) {
          return (
            <svg viewBox="0 0 160 160" width="100%" height="100%">
              <ellipse cx="80" cy="148" rx="42" ry="8" fill="#00000018" />
              {/* Pen Shaft */}
              <polygon
                points="48,30 112,30 102,120 58,120"
                fill="#0284c7"
                stroke="#0369a1"
                strokeWidth="5"
                strokeLinejoin="round"
              />
              {/* Tip */}
              <polygon points="58,120 102,120 80,148" fill="#e2e8f0" stroke="#475569" strokeWidth="4" />
              <polygon points="76,140 84,140 80,148" fill="#0f172a" />
              {/* Cap clip */}
              <rect x="42" y="32" width="10" height="42" rx="4" fill="#eab308" stroke="#ca8a04" strokeWidth="3" />
            </svg>
          );
        }
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="44" ry="9" fill="#00000018" />
            {/* Long Tail */}
            <path
              d="M72 110 L52 148 L68 148 L80 118"
              fill="#3b82f6"
              stroke="#1d4ed8"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Body */}
            <ellipse cx="80" cy="80" rx="36" ry="46" fill="#14b8a6" stroke="#0f766e" strokeWidth="5" />
            {/* Wing */}
            <path
              d="M74 68 C64 88 68 116 88 120 C96 112 94 92 88 72 Z"
              fill="#f59e0b"
              stroke="#d97706"
              strokeWidth="4"
            />
            {/* Big Curved Beak */}
            <path
              d="M96 52 C116 52 128 66 122 84 C116 84 104 74 96 70 Z"
              fill="#f97316"
              stroke="#c2410c"
              strokeWidth="4"
            />
            {/* Eye patch */}
            <circle cx="86" cy="54" r="10" fill="#ffffff" stroke="#0f766e" strokeWidth="2.5" />
            <circle cx="88" cy="54" r="5" fill="#1e293b" />
            <circle cx="90" cy="52" r="1.5" fill="#ffffff" />
            {/* Head Crest */}
            <path d="M72 38 Q66 18 80 26 Q86 16 94 34" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" fill="none" />
          </svg>
        );

      case 'Q': // Queen
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="46" ry="9" fill="#00000018" />
            {/* Royal Dress */}
            <polygon
              points="80,94 36,144 124,144"
              fill="#a855f7"
              stroke="#7e22ce"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            {/* White Ermine Collar */}
            <path d="M60 98 Q80 114 100 98" fill="#ffffff" stroke="#e2e8f0" strokeWidth="3" />
            {/* Head & Hair */}
            <circle cx="80" cy="74" r="32" fill="#fed7aa" stroke="#ca8a04" strokeWidth="4" />
            {/* Curly brown/blonde hair */}
            <circle cx="48" cy="70" r="14" fill="#b45309" />
            <circle cx="112" cy="70" r="14" fill="#b45309" />
            <circle cx="44" cy="86" r="12" fill="#b45309" />
            <circle cx="116" cy="86" r="12" fill="#b45309" />
            {/* Sparkling Golden Crown */}
            <polygon
              points="54,48 50,22 66,34 80,16 94,34 110,22 106,48"
              fill="#eab308"
              stroke="#ca8a04"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <circle cx="50" cy="22" r="3" fill="#ef4444" />
            <circle cx="80" cy="16" r="3.5" fill="#3b82f6" />
            <circle cx="110" cy="22" r="3" fill="#ec4899" />
            {/* Cute Queen Eyes */}
            <ellipse cx="70" cy="70" rx="4.5" ry="6" fill="#1e293b" />
            <ellipse cx="90" cy="70" rx="4.5" ry="6" fill="#1e293b" />
            <circle cx="71" cy="68" r="2" fill="#ffffff" />
            <circle cx="91" cy="68" r="2" fill="#ffffff" />
            {/* Rosy Cheeks */}
            <circle cx="62" cy="78" r="5" fill="#fda4af" opacity="0.9" />
            <circle cx="98" cy="78" r="5" fill="#fda4af" opacity="0.9" />
            {/* Sweet Smile */}
            <path d="M74 80 Q80 86 86 80" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
        );

      case 'R': // Rabbit (or Rat)
        if (normWord.includes('rat')) {
          return (
            <svg viewBox="0 0 160 160" width="100%" height="100%">
              <ellipse cx="80" cy="148" rx="44" ry="9" fill="#00000018" />
              {/* Tail */}
              <path d="M120 114 Q148 108 144 80" stroke="#fda4af" strokeWidth="5" strokeLinecap="round" fill="none" />
              {/* Body */}
              <ellipse cx="80" cy="110" rx="42" ry="32" fill="#94a3b8" stroke="#475569" strokeWidth="5" />
              {/* Big Round Ears */}
              <circle cx="56" cy="54" r="16" fill="#94a3b8" stroke="#475569" strokeWidth="3" />
              <circle cx="56" cy="54" r="10" fill="#fda4af" />
              <circle cx="104" cy="54" r="16" fill="#94a3b8" stroke="#475569" strokeWidth="3" />
              <circle cx="104" cy="54" r="10" fill="#fda4af" />
              {/* Head */}
              <ellipse cx="80" cy="80" rx="32" ry="28" fill="#cbd5e1" stroke="#475569" strokeWidth="4" />
              {/* Eyes & Nose */}
              <circle cx="70" cy="74" r="5" fill="#1e293b" />
              <circle cx="90" cy="74" r="5" fill="#1e293b" />
              <circle cx="80" cy="84" r="4" fill="#fda4af" />
              <path d="M74 90 Q80 94 86 90" stroke="#1e293b" strokeWidth="2.5" fill="none" />
            </svg>
          );
        }
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="44" ry="9" fill="#00000018" />
            {/* Long Bunny Ears */}
            <ellipse
              cx="60"
              cy="36"
              rx="13"
              ry="34"
              fill="#ffffff"
              stroke="#fb7185"
              strokeWidth="4.5"
              transform="rotate(-10 60 36)"
            />
            <ellipse cx="60" cy="38" rx="7" ry="24" fill="#fda4af" transform="rotate(-10 60 38)" />
            <ellipse
              cx="100"
              cy="36"
              rx="13"
              ry="34"
              fill="#ffffff"
              stroke="#fb7185"
              strokeWidth="4.5"
              transform="rotate(10 100 36)"
            />
            <ellipse cx="100" cy="38" rx="7" ry="24" fill="#fda4af" transform="rotate(10 100 38)" />
            {/* Body */}
            <ellipse cx="80" cy="116" rx="40" ry="32" fill="#ffffff" stroke="#e2e8f0" strokeWidth="5" />
            {/* Head */}
            <circle cx="80" cy="82" r="38" fill="#ffffff" stroke="#e2e8f0" strokeWidth="5" />
            {/* Big Friendly Eyes */}
            <ellipse cx="64" cy="74" rx="6" ry="8" fill="#1e293b" />
            <ellipse cx="96" cy="74" rx="6" ry="8" fill="#1e293b" />
            <circle cx="66" cy="72" r="2.5" fill="#ffffff" />
            <circle cx="98" cy="72" r="2.5" fill="#ffffff" />
            {/* Pink Nose */}
            <polygon points="76,84 84,84 80,90" fill="#f43f5e" />
            {/* Mouth & Whiskers */}
            <path
              d="M74 92 Q80 96 80 90 Q80 96 86 92"
              stroke="#1e293b"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <line x1="36" y1="84" x2="54" y2="86" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="124" y1="84" x2="106" y2="86" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            {/* Cheeks */}
            <circle cx="52" cy="86" r="6" fill="#fda4af" opacity="0.8" />
            <circle cx="108" cy="86" r="6" fill="#fda4af" opacity="0.8" />
            {/* Little Carrot */}
            <polygon points="80,126 94,142 86,146" fill="#f97316" stroke="#c2410c" strokeWidth="2.5" />
            <path d="M78 124 L74 120" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'S': // Sun (or Soap)
        if (normWord.includes('soap')) {
          return (
            <svg viewBox="0 0 160 160" width="100%" height="100%">
              <ellipse cx="80" cy="148" rx="46" ry="9" fill="#00000018" />
              {/* Soap Bar */}
              <rect
                x="36"
                y="64"
                width="88"
                height="60"
                rx="24"
                fill="#38bdf8"
                stroke="#0284c7"
                strokeWidth="5"
              />
              <path d="M46 76 Q80 84 114 76" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
              {/* Suds / Bubbles */}
              <circle cx="48" cy="50" r="14" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="3" />
              <circle cx="80" cy="38" r="18" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="3" />
              <circle cx="112" cy="46" r="14" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="3" />
              <circle cx="82" cy="34" r="4" fill="#ffffff" />
            </svg>
          );
        }
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="40" ry="8" fill="#00000018" />
            {/* Sun Rays */}
            <g stroke="#f59e0b" strokeWidth="6" strokeLinecap="round">
              <line x1="80" y1="16" x2="80" y2="28" />
              <line x1="80" y1="132" x2="80" y2="144" />
              <line x1="16" y1="80" x2="28" y2="80" />
              <line x1="132" y1="80" x2="144" y2="80" />
              <line x1="34" y1="34" x2="44" y2="44" />
              <line x1="116" y1="116" x2="126" y2="126" />
              <line x1="34" y1="126" x2="44" y2="116" />
              <line x1="116" y1="44" x2="126" y2="34" />
            </g>
            {/* Golden Core */}
            <circle cx="80" cy="80" r="46" fill="#facc15" stroke="#f59e0b" strokeWidth="6" />
            {/* Happy Cartoon Face */}
            <ellipse cx="64" cy="74" rx="6" ry="8" fill="#1e293b" />
            <ellipse cx="96" cy="74" rx="6" ry="8" fill="#1e293b" />
            <circle cx="66" cy="72" r="2.5" fill="#ffffff" />
            <circle cx="98" cy="72" r="2.5" fill="#ffffff" />
            {/* Rosy Cheeks */}
            <circle cx="52" cy="86" r="7" fill="#fb923c" opacity="0.8" />
            <circle cx="108" cy="86" r="7" fill="#fb923c" opacity="0.8" />
            {/* Big Radiant Smile */}
            <path
              d="M66 88 Q80 104 94 88"
              stroke="#1e293b"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        );

      case 'T': // Tiger (or T-shirt)
        if (normWord.includes('shirt') || normWord.includes('t-shirt')) {
          return (
            <svg viewBox="0 0 160 160" width="100%" height="100%">
              <ellipse cx="80" cy="148" rx="44" ry="9" fill="#00000018" />
              {/* T-Shirt */}
              <path
                d="M58 36 L30 64 L46 80 L58 72 L58 136 L102 136 L102 72 L114 80 L130 64 L102 36 C92 48 68 48 58 36 Z"
                fill="#3b82f6"
                stroke="#1d4ed8"
                strokeWidth="5"
                strokeLinejoin="round"
              />
              {/* Yellow stripes */}
              <line x1="58" y1="92" x2="102" y2="92" stroke="#facc15" strokeWidth="6" />
              <line x1="58" y1="112" x2="102" y2="112" stroke="#facc15" strokeWidth="6" />
            </svg>
          );
        }
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="46" ry="9" fill="#00000018" />
            {/* Ears */}
            <circle cx="44" cy="46" r="16" fill="#ea580c" stroke="#9a3412" strokeWidth="4" />
            <circle cx="44" cy="46" r="9" fill="#ffffff" />
            <circle cx="116" cy="46" r="16" fill="#ea580c" stroke="#9a3412" strokeWidth="4" />
            <circle cx="116" cy="46" r="9" fill="#ffffff" />
            {/* Head */}
            <circle cx="80" cy="78" r="44" fill="#f97316" stroke="#9a3412" strokeWidth="5" />
            {/* Tiger Stripes */}
            <polygon points="80,38 74,52 86,52" fill="#1e293b" />
            <polygon points="38,70 54,72 44,78" fill="#1e293b" />
            <polygon points="122,70 106,72 116,78" fill="#1e293b" />
            {/* Snout */}
            <ellipse cx="80" cy="94" rx="20" ry="14" fill="#ffffff" />
            <polygon points="74,86 86,86 80,94" fill="#ec4899" />
            {/* Big Brave Eyes */}
            <ellipse cx="64" cy="68" rx="6" ry="8" fill="#1e293b" />
            <ellipse cx="96" cy="68" rx="6" ry="8" fill="#1e293b" />
            <circle cx="66" cy="66" r="2.5" fill="#ffffff" />
            <circle cx="98" cy="66" r="2.5" fill="#ffffff" />
            <path
              d="M74 98 Q80 104 80 94 Q80 104 86 98"
              stroke="#1e293b"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        );

      case 'U': // Umbrella
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="150" rx="38" ry="7" fill="#00000018" />
            {/* Rain Drops */}
            <circle cx="28" cy="54" r="3.5" fill="#38bdf8" />
            <circle cx="132" cy="64" r="3.5" fill="#38bdf8" />
            <circle cx="22" cy="92" r="4" fill="#38bdf8" />
            <circle cx="138" cy="100" r="4" fill="#38bdf8" />
            {/* Canopy Dome */}
            <path
              d="M24 88 C24 38 136 38 136 88 C124 82 108 82 96 88 C84 82 68 82 56 88 C44 82 36 82 24 88 Z"
              fill="#0ea5e9"
              stroke="#0369a1"
              strokeWidth="5"
            />
            {/* Umbrella Segments */}
            <path d="M56 88 C64 62 74 42 80 38" stroke="#facc15" strokeWidth="5" fill="none" />
            <path d="M96 88 C88 62 82 42 80 38" stroke="#ef4444" strokeWidth="5" fill="none" />
            {/* Top Tip */}
            <line x1="80" y1="38" x2="80" y2="24" stroke="#0369a1" strokeWidth="5" strokeLinecap="round" />
            {/* Shaft & J-Hook Handle */}
            <path
              d="M80 84 L80 132 C80 144 68 144 68 136"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Eyes on umbrella */}
            <ellipse cx="72" cy="62" rx="4" ry="5" fill="#ffffff" />
            <ellipse cx="88" cy="62" rx="4" ry="5" fill="#ffffff" />
            <circle cx="72" cy="62" r="2.5" fill="#1e293b" />
            <circle cx="88" cy="62" r="2.5" fill="#1e293b" />
            <path d="M76 72 Q80 76 84 72" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        );

      case 'V': // Van
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="54" ry="9" fill="#00000018" />
            {/* Camper Van Body */}
            <rect
              x="22"
              y="54"
              width="116"
              height="64"
              rx="18"
              fill="#22c55e"
              stroke="#15803d"
              strokeWidth="5"
            />
            {/* White Top Roof */}
            <rect x="24" y="56" width="112" height="24" rx="14" fill="#ffffff" opacity="0.9" />
            {/* Windows */}
            <rect x="36" y="64" width="26" height="20" rx="4" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" />
            <rect x="70" y="64" width="30" height="20" rx="4" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" />
            <polygon points="106,64 126,64 126,84 106,84" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" />
            {/* Cute Headlights */}
            <circle cx="132" cy="98" r="6" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
            {/* Wheels */}
            <circle cx="48" cy="122" r="16" fill="#334155" stroke="#0f172a" strokeWidth="4" />
            <circle cx="48" cy="122" r="7" fill="#e2e8f0" />
            <circle cx="112" cy="122" r="16" fill="#334155" stroke="#0f172a" strokeWidth="4" />
            <circle cx="112" cy="122" r="7" fill="#e2e8f0" />
          </svg>
        );

      case 'W': // Watch
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="36" ry="8" fill="#00000018" />
            {/* Watch Straps */}
            <rect x="66" y="16" width="28" height="128" rx="8" fill="#06b6d4" stroke="#0891b2" strokeWidth="4" />
            <line x1="72" y1="28" x2="88" y2="28" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            <line x1="72" y1="130" x2="88" y2="130" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            {/* Watch Face Case */}
            <circle cx="80" cy="80" r="42" fill="#fde047" stroke="#ca8a04" strokeWidth="6" />
            {/* White Dial */}
            <circle cx="80" cy="80" r="32" fill="#ffffff" stroke="#ca8a04" strokeWidth="3" />
            {/* Hour markers */}
            <circle cx="80" cy="54" r="3" fill="#ea580c" />
            <circle cx="106" cy="80" r="3" fill="#ea580c" />
            <circle cx="80" cy="106" r="3" fill="#ea580c" />
            <circle cx="54" cy="80" r="3" fill="#ea580c" />
            {/* Clock Hands pointing to 10:10 smile */}
            <line x1="80" y1="80" x2="68" y2="64" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
            <line x1="80" y1="80" x2="96" y2="66" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="80" cy="80" r="4" fill="#dc2626" />
            {/* Smiling mouth */}
            <path d="M74 88 Q80 94 86 88" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        );

      case 'X': // Xmas Tree
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="46" ry="9" fill="#00000018" />
            {/* Brown Trunk */}
            <rect x="70" y="126" width="20" height="18" rx="4" fill="#78350f" stroke="#451a03" strokeWidth="3.5" />
            {/* Tree Layers */}
            {/* Bottom tier */}
            <polygon
              points="80,82 32,128 128,128"
              fill="#15803d"
              stroke="#14532d"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            {/* Middle tier */}
            <polygon
              points="80,56 42,94 118,94"
              fill="#16a34a"
              stroke="#14532d"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            {/* Top tier */}
            <polygon
              points="80,30 52,64 108,64"
              fill="#22c55e"
              stroke="#14532d"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            {/* Big Golden Star on Top */}
            <polygon
              points="80,12 84,24 96,24 86,32 90,44 80,36 70,44 74,32 64,24 76,24"
              fill="#facc15"
              stroke="#ca8a04"
              strokeWidth="2.5"
            />
            {/* Colorful Bauble Ornaments */}
            <circle cx="60" cy="82" r="5" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
            <circle cx="100" cy="80" r="5" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
            <circle cx="48" cy="116" r="6" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
            <circle cx="80" cy="112" r="6" fill="#ec4899" stroke="#be185d" strokeWidth="1.5" />
            <circle cx="112" cy="116" r="6" fill="#06b6d4" stroke="#0e7490" strokeWidth="1.5" />
          </svg>
        );

      case 'Y': // Yak
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="46" ry="9" fill="#00000018" />
            {/* Horns */}
            <path
              d="M48 56 Q30 30 18 36 Q38 46 54 60"
              fill="#e2e8f0"
              stroke="#64748b"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M112 56 Q130 30 142 36 Q122 46 106 60"
              fill="#e2e8f0"
              stroke="#64748b"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Big Shaggy Body */}
            <ellipse cx="80" cy="108" rx="46" ry="34" fill="#713f12" stroke="#451a03" strokeWidth="5" />
            {/* Fluffy shaggy fur fringe */}
            <path
              d="M38 120 L48 138 L58 124 L68 138 L78 124 L88 138 L98 124 L108 138 L118 120"
              fill="#854d0e"
              stroke="#451a03"
              strokeWidth="3.5"
            />
            {/* Head */}
            <circle cx="80" cy="74" r="34" fill="#854d0e" stroke="#451a03" strokeWidth="4.5" />
            {/* Muzzle */}
            <ellipse cx="80" cy="88" rx="20" ry="14" fill="#d97706" />
            <circle cx="74" cy="86" r="3" fill="#451a03" />
            <circle cx="86" cy="86" r="3" fill="#451a03" />
            {/* Eyes */}
            <ellipse cx="66" cy="68" rx="5" ry="7" fill="#1e293b" />
            <ellipse cx="94" cy="68" rx="5" ry="7" fill="#1e293b" />
            <circle cx="68" cy="66" r="2" fill="#ffffff" />
            <circle cx="96" cy="66" r="2" fill="#ffffff" />
            <path d="M74 94 Q80 100 86 94" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        );

      case 'Z': // Zebra
        return (
          <svg viewBox="0 0 160 160" width="100%" height="100%">
            <ellipse cx="80" cy="148" rx="46" ry="9" fill="#00000018" />
            {/* Mane */}
            <path
              d="M48 40 C42 56 46 88 56 100"
              stroke="#1e293b"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
            {/* Head / Neck */}
            <path
              d="M60 48 L76 24 C82 22 92 28 92 36 L94 48 L124 74 C132 82 128 98 112 104 L88 106 L78 136 L52 136 L60 48 Z"
              fill="#ffffff"
              stroke="#1e293b"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            {/* Black Zebra Stripes */}
            <path d="M72 44 L86 52" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
            <path d="M74 62 L94 68" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
            <path d="M84 78 L104 84" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
            <path d="M62 90 L78 94" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
            <path d="M64 110 L76 114" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
            {/* Muzzle */}
            <path
              d="M102 82 L124 74 C130 80 128 96 112 104 L96 104 Z"
              fill="#334155"
              stroke="#1e293b"
              strokeWidth="3.5"
            />
            <circle cx="116" cy="86" r="3" fill="#ffffff" />
            {/* Big Friendly Eye */}
            <circle cx="86" cy="54" r="6" fill="#1e293b" />
            <circle cx="88" cy="52" r="2.5" fill="#ffffff" />
            {/* Ear */}
            <polygon points="76,24 82,6 88,26" fill="#ffffff" stroke="#1e293b" strokeWidth="3.5" />
            <polygon points="78,22 82,12 86,22" fill="#fda4af" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center filter drop-shadow-md select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {renderClipart()}
    </div>
  );
};
