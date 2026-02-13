import { motion } from 'framer-motion';
import AnimationCard from './AnimationCard';

interface IndicacoesProps {
  isActive: boolean;
  referralsCount?: number;
  userGender?: 'male' | 'female' | 'neutral';
  onClick?: () => void;
}

export default function Indicacoes({
  isActive,
  referralsCount = 4,
  userGender = 'neutral',
  onClick,
}: IndicacoesProps) {
  const Person = ({
    x,
    y,
    delay,
    isCentral = false,
  }: {
    x: number;
    y: number;
    delay: number;
    isCentral?: boolean;
  }) => (
    <motion.g
      animate={{
        y: isCentral ? [0, -4, 0] : [0, 4, 0],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
      }}
    >
      <circle cx={x} cy={y} r="12" fill={isCentral ? '#009865' : '#60A5FA'} />
      <circle cx={x} cy={y + 20} r="8" fill={isCentral ? '#009865' : '#60A5FA'} />
      <line
        x1={x}
        y1={y + 12}
        x2={x}
        y2={y + 28}
        stroke={isCentral ? '#009865' : '#60A5FA'}
        strokeWidth="2"
      />
      <line
        x1={x - 8}
        y1={y + 16}
        x2={x + 8}
        y2={y + 16}
        stroke={isCentral ? '#009865' : '#60A5FA'}
        strokeWidth="2"
      />
    </motion.g>
  );

  const ConnectionLine = ({
    x1,
    y1,
    x2,
    y2,
    delay,
  }: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    delay: number;
  }) => (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#009865"
      strokeWidth="2"
      animate={{
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
      }}
    />
  );

  return (
    <AnimationCard isActive={isActive} onClick={onClick}>
      <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 p-6">
        <svg
          className="w-32 h-32"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Person x={100} y={50} delay={0} isCentral={true} />

          <Person x={60} y={120} delay={0.3} />
          <Person x={100} y={140} delay={0.6} />
          <Person x={140} y={120} delay={0.9} />

          <ConnectionLine x1={100} y1={62} x2={60} y2={108} delay={0} />
          <ConnectionLine x1={100} y1={62} x2={100} y2={128} delay={0.2} />
          <ConnectionLine x1={100} y1={62} x2={140} y2={108} delay={0.4} />

          <ConnectionLine x1={60} y1={132} x2={100} y2={128} delay={0.3} />
          <ConnectionLine x1={100} y1={132} x2={140} y2={132} delay={0.5} />
        </svg>

        <motion.div
          className={`text-center ${isActive ? 'opacity-100' : 'opacity-30 blur-lg'}`}
          animate={{ opacity: isActive ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-gray-500 uppercase tracking-wide">Suas Indicações</p>
          <motion.p
            className="text-3xl font-bold text-emerald-600"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            {referralsCount}
          </motion.p>
          <p className="text-xs text-gray-400 mt-1">Pessoas na rede</p>
        </motion.div>

        <motion.div
          className="flex gap-2 justify-center"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          {[...Array(Math.min(referralsCount, 4))].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-emerald-500"
            />
          ))}
        </motion.div>
      </div>
    </AnimationCard>
  );
}
