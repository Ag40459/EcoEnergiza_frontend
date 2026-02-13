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
      try {
        const res = await fetch('/api/auth/send-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        if (res.ok) setStep("code");
      } catch (err) {
        console.error("Erro ao enviar email", err);
        // Fallback para teste se o servidor não estiver rodando
        setStep("code");
      } finally {
        setLoading(false);
      }
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

  const content = (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      <div className="mb-6 text-center w-full">
        <h3 className="text-2xl font-black mb-2 pt-4 text-[#004e3a] dark:text-green-400">
          Acesse sua Conta
        </h3>
      </div>

      {step === "email" && (
        <form onSubmit={handleEmailSubmit} className="w-full space-y-6">
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
          <div className="mt-8 text-center">
            <button 
              type="button"
              onClick={() => onOpenOther ? onOpenOther() : setStep("other")}
              className="text-sm font-black underline text-[#009865]"
            >
              Acesse de outra forma
            </button>
          </div>
        </form>
      )}

      {step === "other" && (
        <div className="w-full space-y-4">
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
          <button onClick={() => setStep("email")} className="w-full text-xs font-black underline text-[#009865] mt-4">
            Voltar para E-mail
          </button>
        </div>
      )}

      {step === "code" && (
        <div className="w-full text-center space-y-6">
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
                className="w-14 h-14 text-center text-2xl font-black rounded-2xl border-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 outline-none dark:text-white"
              />
            ))}
          </div>
          <button onClick={handleCodeSubmit} className="w-full py-4 rounded-2xl font-black text-white bg-[#009865] shadow-xl">
            Confirmar Acesso
          </button>
        </div>
      )}
    </div>
  );

  if (embedded) return content;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 max-w-md w-full relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors z-10">
          <X className="w-6 h-6 text-gray-400" />
        </button>
        {content}
      </motion.div>
    </div>
  );
}
