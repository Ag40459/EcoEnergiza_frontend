import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Lock, Mail } from "lucide-react";

interface LoginFormProps {
  onClose?: () => void;
  initialStep?: "email" | "code" | "other";
  onOpenOther?: () => void;
  onLoginSuccess?: () => void;
  embedded?: boolean;
}

export default function LoginForm({ 
  onClose, 
  initialStep = "email", 
  onOpenOther,
  onLoginSuccess,
  embedded = false
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code" | "other">(initialStep);
  const [code, setCode] = useState(["", "", "", ""]);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setLoading(true);
      // Simulação de delay para feedback visual
      setTimeout(() => {
        setStep("code");
        setLoading(false);
      }, 800);
    }
  };

  const handleCodeSubmit = () => {
    if (code.join("").length === 4) {
      if (onLoginSuccess) onLoginSuccess();
    }
  };

  const handlePasswordSubmit = () => {
    if (email === "adm@adm.com" && password === "0000") {
      if (onLoginSuccess) onLoginSuccess();
    }
  };

  const renderContent = () => (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      <div className="mb-4 text-center w-full">
        <h3 className="text-xl font-black text-[#004e3a] dark:text-green-400">
          Acesse sua Conta
        </h3>
      </div>

      <AnimatePresence mode="wait">
        {step === "email" && (
          <motion.form 
            key="email-step"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            onSubmit={handleEmailSubmit} className="w-full space-y-4"
          >
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 rounded-2xl border-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-700 outline-none text-center font-bold dark:text-white"
            />
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl font-black text-white bg-[#009865] shadow-xl disabled:opacity-40"
            >
              {loading ? "Enviando..." : "Enviar Código"} <ArrowRight className="w-5 h-5" />
            </button>
            <div className="text-center">
              <button 
                type="button"
                onClick={() => onOpenOther ? onOpenOther() : setStep("other")}
                className="text-xs font-black underline text-[#009865]"
              >
                Acesse de outra forma
              </button>
            </div>
          </motion.form>
        )}

        {step === "other" && (
          <motion.div 
            key="other-step"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className="w-full space-y-4"
          >
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 rounded-2xl border-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-center font-bold dark:text-white"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 rounded-2xl border-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-center font-bold dark:text-white"
            />
            <button onClick={handlePasswordSubmit} className="w-full py-4 rounded-2xl font-black text-white bg-[#009865] shadow-xl">
              Confirmar
            </button>
            <button onClick={() => setStep("email")} className="w-full text-xs font-black underline text-[#009865] mt-2">
              Voltar para E-mail
            </button>
          </motion.div>
        )}

        {step === "code" && (
          <motion.div 
            key="code-step"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className="w-full text-center space-y-6"
          >
            <p className="text-xs font-bold text-gray-400">Insira os 4 dígitos enviados para {email}</p>
            <div className="flex justify-center gap-3">
              {code.map((digit, index) => (
                <input 
                  key={index} 
                  id={`code-${index}`} 
                  type="text" 
                  inputMode="numeric" 
                  pattern="[0-9]*"
                  maxLength={1} 
                  value={digit}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    const newCode = [...code];
                    newCode[index] = val;
                    setCode(newCode);
                    if (val && index < 3) document.getElementById(`code-${index+1}`)?.focus();
                  }}
                  className="w-12 h-12 text-center text-xl font-black rounded-xl border-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 outline-none dark:text-white"
                />
              ))}
            </div>
            <button onClick={handleCodeSubmit} className="w-full py-4 rounded-2xl font-black text-white bg-[#009865] shadow-xl">
              Confirmar Acesso
            </button>
            <button onClick={() => setStep("email")} className="w-full text-xs font-black underline text-[#009865]">
              Reenviar código
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (embedded) return renderContent();

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 max-w-md w-full relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors z-10">
          <X className="w-6 h-6 text-gray-400" />
        </button>
        {renderContent()}
      </motion.div>
    </div>
  );
}
