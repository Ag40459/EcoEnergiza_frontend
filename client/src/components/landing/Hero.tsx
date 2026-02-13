import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { ArrowRight } from "lucide-react";

const mensagens = [
  "Sua energia digital, onde você estiver.",
  "Economize até 100% na sua conta de luz.",
  "Monitore seu consumo em tempo real.",
  "Gestão inteligente para sua economia.",
  "Sua usina solar na palma da mão.",
  "Ganhe EcoCoins e troque por benefícios.",
  "Tecnologia inteligente para eficiência energética.",
  "Reduza seu impacto ambiental com energia limpa.",
  "Torne-se um consultor e ganhe comissões.",
  "Desconto na conta sem instalar nada.",
];

const coresGradiente = [
  "linear-gradient(135deg, #e8f5e9 0%, #e0f2f1 50%, #f1f8e9 100%)",
  "linear-gradient(135deg, #e0f2f1 0%, #f1f8e9 50%, #e8f5e9 100%)",
  "linear-gradient(135deg, #f1f8e9 0%, #e8f5e9 50%, #e0f2f1 100%)",
  "linear-gradient(135deg, #e8f5e9 0%, #f5f5f5 50%, #e0f2f1 100%)",
];

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  const { displayedText } = useTypewriter({
    messages: mensagens,
    typingSpeed: 55,
    deletingSpeed: 30,
    pauseAfterType: 3500,
    pauseAfterDelete: 400,
  });

  const [corIndex, setCorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCorIndex((prev) => (prev + 1) % coresGradiente.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="inicio"
      className="w-full h-full flex items-center justify-center p-6 lg:p-20 overflow-hidden"
      style={{
        background: coresGradiente[corIndex],
        transition: "background 3s ease-in-out",
      }}
    >
      <div className="w-full max-w-2xl lg:max-w-6xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Altura fixa para evitar pulos de layout */}
            <div className="h-[140px] md:h-[180px] lg:h-[220px] mb-6 flex items-start">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]"
                style={{ color: "#004e3a" }}
              >
                {displayedText}
                <span
                  className="typing-cursor inline-block w-[3px] h-[0.9em] ml-2 align-middle"
                  style={{ backgroundColor: "#009865" }}
                />
              </h1>
            </div>

            <p
              className="text-base md:text-lg lg:text-xl mb-10 max-w-lg leading-relaxed opacity-90"
              style={{ color: "#006044" }}
            >
              Soluções sustentáveis para monitoramento e gestão do seu consumo de energia.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className="hidden lg:flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all border-none cursor-pointer"
              style={{ 
                backgroundColor: "#009865",
                boxShadow: "0 10px 25px -5px rgba(0, 152, 101, 0.4)"
              }}
            >
              Começar Agora - Grátis
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Mockup do Celular visível no Desktop */}
        <div className="hidden lg:block flex-1 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            <div className="w-[300px] h-[600px] bg-[#1a1a2e] rounded-[3rem] border-[8px] border-[#2a2a40] shadow-2xl overflow-hidden relative mx-auto">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#2a2a40] rounded-b-2xl z-20"></div>
              <div className="w-full h-full bg-white p-6 pt-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-[10px] text-gray-400">Olá, Maria!</p>
                    <p className="text-xs font-bold text-[#004e3a]">Consumo de Energia</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#009865] flex items-center justify-center text-white text-[10px] font-bold">M</div>
                </div>
                
                <div className="bg-[#f0faf5] rounded-2xl p-5 mb-6">
                  <p className="text-[10px] text-[#006044] mb-1">Este mês</p>
                  <p className="text-3xl font-bold text-[#004e3a]">230 <span className="text-sm font-normal">kW/h</span></p>
                </div>

                <div className="mb-6">
                  <p className="text-[10px] font-bold text-[#004e3a] mb-4">Consumo Semanal</p>
                  <div className="h-24 w-full bg-gradient-to-t from-[#e8f5e9] to-transparent rounded-lg flex items-end gap-1 px-1">
                    {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                      <div key={i} className="flex-1 bg-[#009865] rounded-t-sm" style={{ height: `${h}%`, opacity: 0.3 + (h/100) }}></div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[8px] text-gray-400">Custo Estimado</p>
                    <p className="text-xs font-bold text-[#004e3a]">R$ 145,80</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[8px] text-gray-400">Energia Solar</p>
                    <p className="text-xs font-bold text-[#009865]">54%</p>
                  </div>
                </div>
              </div>

              <div className="absolute -left-10 top-20 bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2 border border-gray-100">
                <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
                  <span className="text-yellow-600 text-[10px]">⚡</span>
                </div>
                <span className="text-[10px] font-bold text-[#004e3a]">5.8 kWh</span>
              </div>

              <div className="absolute -left-6 bottom-32 bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2 border border-gray-100">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-[10px]">✓</span>
                </div>
                <span className="text-[10px] font-bold text-[#004e3a]">Ativo</span>
              </div>
            </div>
          </motion.div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#009865] opacity-[0.03] rounded-full blur-3xl -z-0"></div>
        </div>
      </div>
    </section>
  );
}
