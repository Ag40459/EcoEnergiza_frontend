import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";

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

export default function Hero() {
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
      className="w-full lg:w-1/2 h-screen lg:h-auto flex items-center justify-center p-6 lg:p-12"
      style={{
        background: coresGradiente[corIndex],
        transition: "background 3s ease-in-out",
      }}
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="min-h-[120px] mb-8 flex items-center justify-center">
            <h1
              className="text-3xl md:text-4xl font-bold leading-tight"
              style={{ color: "#004e3a" }}
            >
              {displayedText}
              <span
                className="typing-cursor inline-block w-[2px] h-[1em] ml-1 align-baseline"
                style={{ backgroundColor: "#009865" }}
              />
            </h1>
          </div>

          <p
            className="text-sm md:text-base mb-8 leading-relaxed"
            style={{ color: "#006044" }}
          >
            Soluções sustentáveis para monitoramento e gestão do seu consumo de energia.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
