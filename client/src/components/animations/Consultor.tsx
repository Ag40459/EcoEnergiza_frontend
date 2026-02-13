import { motion } from 'framer-motion';
import AnimationCard from './AnimationCard';

interface ConsultorProps {
  isActive: boolean;
  isConsultor?: boolean;
  salesCount?: number;
  userGender?: 'male' | 'female' | 'neutral';
  onClick?: () => void;
}

export default function Consultor({
  isActive,
  isConsultor = false,
  salesCount = 0,
  userGender = 'neutral',
  onClick,
}: ConsultorProps) {
  const Person = ({
    x,
    y,
    delay,
    isCentral = false,
    color = '#60A5FA',
  }: {
    x: number;
    y: number;
    delay: number;
    isCentral?: boolean;
    color?: string;
  }) => (
    <motion.g
      animate={{
        y: isCentral ? [0, -5, 0] : [0, 3, 0],
      }}
      transition={{
        duration: 2.5,
        delay,
        repeat: Infinity,
      }}
    >
      <circle cx={x} cy={y} r="12" fill={color} />
      <circle cx={x} cy={y + 20} r="8" fill={color} />
      <line
        x1={x}
        y1={y + 12}
        x2={x}
        y2={y + 28}
        stroke={color}
        strokeWidth="2"
      />
      <line
        x1={x - 8}
        y1={y + 16}
        x2={x + 8}
        y2={y + 16}
        stroke={color}
        strokeWidth="2"
      />

      {isCentral && (
        <motion.line
          x1={x}
          y1={y + 12}
          x2={x + 20}
          y2={y}
          stroke={color}
          strokeWidth="2"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            delay,
            repeat: Infinity,
          }}
        />
      )}
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
          <Person
            x={100}
            y={40}
            delay={0}
            isCentral={true}
            color="#009865"
          />

          <Person x={50} y={110} delay={0.3} color="#60A5FA" />
          <Person x={100} y={130} delay={0.6} color="#60A5FA" />
          <Person x={150} y={110} delay={0.9} color="#60A5FA" />

          <ConnectionLine x1={100} y1={52} x2={50} y2={98} delay={0} />
          <ConnectionLine x1={100} y1={52} x2={100} y2={118} delay={0.2} />
          <ConnectionLine x1={100} y1={52} x2={150} y2={98} delay={0.4} />

          <ConnectionLine x1={50} y1={122} x2={100} y2={118} delay={0.3} />
          <ConnectionLine x1={100} y1={122} x2={150} y2={122} delay={0.5} />
        </svg>

        <motion.div
          className={`text-center ${isActive ? 'opacity-100' : 'opacity-30 blur-lg'}`}
          animate={{ opacity: isActive ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        >
          {isConsultor ? (
            <>
              <p className="text-sm text-gray-500 uppercase tracking-wide">Suas Vendas</p>
              <motion.p
                className="text-3xl font-bold text-emerald-600"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                {salesCount}
              </motion.p>
              <p className="text-xs text-gray-400 mt-1">Clientes ativos</p>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-500 uppercase tracking-wide">Torne-se Consultor</p>
              <p className="text-lg font-bold text-emerald-600 mt-2">Ganhe Comissões</p>
              <p className="text-xs text-gray-400 mt-1">Indique e ganhe</p>
            </>
          )}
        </motion.div>

        <motion.div
          className="flex gap-2 justify-center"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          {isConsultor && (
            <>
              {[...Array(Math.min(salesCount, 5))].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-emerald-500"
                />
              ))}
            </>
          )}
        </motion.div>
      </div>
    </AnimationCard>
  );
}
