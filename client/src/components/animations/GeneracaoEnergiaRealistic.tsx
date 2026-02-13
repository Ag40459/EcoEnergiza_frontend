import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimationCard from './AnimationCard';

interface GeneracaoEnergiaRealisticProps {
  isActive: boolean;
  isLoading?: boolean;
  progress?: number;
  energyValue?: number;
  onClick?: () => void;
}

export default function GeneracaoEnergiaRealistic({
  isActive,
  isLoading = false,
  progress = 0,
  energyValue = 4.2,
  onClick,
}: GeneracaoEnergiaRealisticProps) {
  const [isDaytime, setIsDaytime] = useState(true);

  useEffect(() => {
    const checkDaytime = () => {
      const hour = new Date().getHours();
      setIsDaytime(hour >= 6 && hour < 18);
    };

    checkDaytime();
    const interval = setInterval(checkDaytime, 60000);
    return () => clearInterval(interval);
  }, []);

  const EnergyRay = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0], y: [0, -60, -60] }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 4,
      }}
    >
      <line
        x1={x}
        y1={y}
        x2={x}
        y2={y - 50}
        stroke={isDaytime ? '#FCD34D' : '#93C5FD'}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx={x}
        cy={y - 50}
        r="3"
        fill={isDaytime ? '#FCD34D' : '#93C5FD'}
        filter={isDaytime ? 'drop-shadow(0 0 6px rgba(253, 224, 71, 0.8))' : 'drop-shadow(0 0 4px rgba(147, 197, 253, 0.6))'}
      />
    </motion.g>
  );

  const SleepZzz = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
    <motion.text
      x={x}
      y={y}
      fontSize="16"
      fontWeight="bold"
      fill="#93C5FD"
      textAnchor="middle"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0], y: [0, -60, -60] }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 4,
      }}
      filter="drop-shadow(0 0 4px rgba(147, 197, 253, 0.6))"
    >
      Zzz
    </motion.text>
  );

  return (
    <AnimationCard
      isActive={isActive}
      isLoading={isLoading}
      progress={progress}
      onClick={onClick}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 p-6">
        <svg
          className="w-full h-full"
          viewBox="0 0 400 350"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="panelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E40AF" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
            <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D1D5DB" />
              <stop offset="50%" stopColor="#9CA3AF" />
              <stop offset="100%" stopColor="#6B7280" />
            </linearGradient>
          </defs>

          <g id="solar-panels">
            <rect x="80" y="80" width="60" height="40" fill="url(#panelGradient)" stroke="#0F172A" strokeWidth="1" rx="2" />
            <rect x="150" y="80" width="60" height="40" fill="url(#panelGradient)" stroke="#0F172A" strokeWidth="1" rx="2" />
            <rect x="220" y="80" width="60" height="40" fill="url(#panelGradient)" stroke="#0F172A" strokeWidth="1" rx="2" />

            <rect x="80" y="130" width="60" height="40" fill="url(#panelGradient)" stroke="#0F172A" strokeWidth="1" rx="2" />
            <rect x="150" y="130" width="60" height="40" fill="url(#panelGradient)" stroke="#0F172A" strokeWidth="1" rx="2" />
            <rect x="220" y="130" width="60" height="40" fill="url(#panelGradient)" stroke="#0F172A" strokeWidth="1" rx="2" />
          </g>

          <g id="structure">
            <line x1="70" y1="180" x2="300" y2="180" stroke="url(#metalGradient)" strokeWidth="4" />
            <line x1="70" y1="180" x2="50" y2="220" stroke="url(#metalGradient)" strokeWidth="3" />
            <line x1="300" y1="180" x2="320" y2="220" stroke="url(#metalGradient)" strokeWidth="3" />
            <line x1="50" y1="220" x2="320" y2="220" stroke="url(#metalGradient)" strokeWidth="4" />

            <line x1="80" y1="70" x2="70" y2="180" stroke="url(#metalGradient)" strokeWidth="2" />
            <line x1="150" y1="70" x2="150" y2="180" stroke="url(#metalGradient)" strokeWidth="2" />
            <line x1="220" y1="70" x2="220" y2="180" stroke="url(#metalGradient)" strokeWidth="2" />
            <line x1="280" y1="70" x2="300" y2="180" stroke="url(#metalGradient)" strokeWidth="2" />
          </g>

          <g id="inverter">
            <rect x="320" y="200" width="50" height="60" fill="#4B5563" stroke="#2D3748" strokeWidth="2" rx="3" />
            <rect x="328" y="210" width="34" height="20" fill="#1F2937" stroke="#111827" strokeWidth="1" rx="2" />
            <circle cx="332" cy="245" r="3" fill="#10B981" />
            <circle cx="345" cy="245" r="3" fill="#10B981" />
            <circle cx="358" cy="245" r="3" fill="#10B981" />
          </g>

          <g id="transformer">
            <rect x="30" y="240" width="40" height="50" fill="#6B7280" stroke="#374151" strokeWidth="2" rx="2" />
            <circle cx="50" cy="245" r="4" fill="#9CA3AF" />
            <circle cx="50" cy="270" r="4" fill="#9CA3AF" />
            <circle cx="50" cy="285" r="4" fill="#9CA3AF" />
          </g>

          <g id="wiring">
            <path d="M 110 120 Q 140 150 180 160" stroke="#4B5563" strokeWidth="1.5" fill="none" strokeDasharray="2,2" />
            <path d="M 180 120 Q 200 150 240 160" stroke="#4B5563" strokeWidth="1.5" fill="none" strokeDasharray="2,2" />
            <path d="M 250 120 Q 280 150 320 200" stroke="#4B5563" strokeWidth="1.5" fill="none" strokeDasharray="2,2" />

            <path d="M 345 200 Q 300 220 70 240" stroke="#4B5563" strokeWidth="2" fill="none" />
            <path d="M 70 290 Q 100 310 200 310" stroke="#4B5563" strokeWidth="2" fill="none" />
          </g>

          <g id="ground">
            <line x1="50" y1="320" x2="350" y2="320" stroke="#6B7280" strokeWidth="2" />
            <line x1="55" y1="320" x2="55" y2="330" stroke="#6B7280" strokeWidth="1.5" />
            <line x1="65" y1="320" x2="65" y2="330" stroke="#6B7280" strokeWidth="1.5" />
            <line x1="75" y1="320" x2="75" y2="330" stroke="#6B7280" strokeWidth="1.5" />
          </g>

          {isDaytime ? (
            <>
              <EnergyRay x={110} y={100} delay={0} />
              <EnergyRay x={180} y={100} delay={0.5} />
              <EnergyRay x={250} y={100} delay={1} />
              <EnergyRay x={110} y={150} delay={1.5} />
              <EnergyRay x={180} y={150} delay={2} />
              <EnergyRay x={250} y={150} delay={2.5} />
            </>
          ) : (
            <>
              <SleepZzz x={110} y={90} delay={0} />
              <SleepZzz x={180} y={90} delay={0.5} />
              <SleepZzz x={250} y={90} delay={1} />
              <SleepZzz x={110} y={140} delay={1.5} />
              <SleepZzz x={180} y={140} delay={2} />
              <SleepZzz x={250} y={140} delay={2.5} />
            </>
          )}

          <motion.circle
            cx={isDaytime ? 350 : 350}
            cy={isDaytime ? 40 : 40}
            r={isDaytime ? 20 : 18}
            fill={isDaytime ? '#FCD34D' : '#E0E7FF'}
            animate={{
              opacity: isDaytime ? [0.8, 1, 0.8] : [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            filter={isDaytime ? 'drop-shadow(0 0 12px rgba(253, 224, 71, 0.8))' : 'drop-shadow(0 0 8px rgba(224, 231, 255, 0.6))'}
          />
        </svg>

        <motion.div
          className={`text-center mt-4 ${isActive ? 'opacity-100' : 'opacity-30 blur-lg'}`}
          animate={{ opacity: isActive ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-gray-500 uppercase tracking-wide">Energia Gerada</p>
          <p className="text-3xl font-bold text-emerald-600">{energyValue} kW</p>
        </motion.div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
              <motion.div
                className="w-12 h-12 bg-blue-500 rounded-full"
                animate={{ x: [-20, 20] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
              />
              <motion.div
                className="w-12 h-12 bg-blue-600 rounded-full"
                animate={{ x: [20, -20] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
              />
            </div>
          </div>
        )}
      </div>
    </AnimationCard>
  );
}
