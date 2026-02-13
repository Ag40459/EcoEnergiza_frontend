import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Lock, Mail, AlertCircle } from "lucide-react";

interface LoginFormProps {
  isMobile?: boolean;
  onClose?: () => void;
  initialStep?: "email" | "code" | "other";
  onOpenOther?: () => void;
  onLoginSuccess?: () => void;
}

export default function LoginForm({ 
  isMobile = false, 
  onClose, 
  initialStep = "email", 
  onOpenOther,
  onLoginSuccess 
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code" | "other">(initialStep);
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [showSmartInfo, setShowSmartInfo] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (email.includes("@") && !showSmartInfo) {
      setShowSmartInfo(true);
    } else if (!email.includes("@") && showSmartInfo) {
      setShowSmartInfo(false);
    }
  }, [email, showSmartInfo]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Simulação de envio via API
      setStep("code");
      setError("");
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
    } else {
      setError("Credenciais inválidas");
    }
  };

  const renderEmailStep = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-black mb-2 pt-4" style={{ color: "#004e3a" }}>
          Acesse sua Conta
        </h3>
        {showSmartInfo && (
          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            className="text-xs font-bold leading-relaxed mt-4 p-3 rounded-xl bg-green-50 border border-green-100" 
            style={{ color: "#007a52" }}
          >
            Caso não tenha cadastro, ele será feito automaticamente. Se já for usuário, este também é o seu local.
          </motion.p>
        )}
      </div>

      <form onSubmit={handleEmailSubmit} className="space-y-6">
        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-4 rounded-2xl border-2 bg-gray-50 focus:bg-white focus:outline-none transition-all text-lg text-center font-bold"
          style={{ borderColor: "#f0f0f0", color: "#004e3a" }}
        />
        <button
          type="submit"
          disabled={!email.trim()}
          className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl font-black text-white transition-all shadow-xl disabled:opacity-40"
          style={{ backgroundColor: "#009865" }}
        >
          Enviar Código <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      <div className="mt-12 mb-4 text-center">
        <button 
          onClick={() => onOpenOther ? onOpenOther() : setStep("other")}
          className="text-sm font-black underline opacity-60 hover:opacity-100 transition-opacity" 
          style={{ color: "#009865" }}
        >
          Acesse de outra forma
        </button>
      </div>
    </motion.div>
  );

  const renderOtherStep = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-black" style={{ color: "#004e3a" }}>Login com Senha</h3>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 bg-gray-50 focus:outline-none text-center font-bold"
            style={{ borderColor: "#f0f0f0" }}
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 bg-gray-50 focus:outline-none text-center font-bold"
            style={{ borderColor: "#f0f0f0" }}
          />
        </div>
        {error && <p className="text-red-500 text-xs text-center font-bold">{error}</p>}
        <button
          onClick={handlePasswordSubmit}
          className="w-full py-4 mt-4 rounded-2xl font-black text-white shadow-xl"
          style={{ backgroundColor: "#009865" }}
        >
          Confirmar
        </button>
        <div className="mt-6 text-center">
          <button onClick={() => setStep("email")} className="text-xs font-black underline opacity-60" style={{ color: "#009865" }}>
            Não tenho cadastro
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[3rem] p-10 max-w-md w-full relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10">
          <X className="w-6 h-6 text-gray-400" />
        </button>
        <div className="flex flex-col items-center">
          {step === "email" && renderEmailStep()}
          {step === "other" && renderOtherStep()}
          {step === "code" && (
            <div className="w-full max-w-sm text-center">
               <h3 className="text-2xl font-black mb-4" style={{ color: "#004e3a" }}>Verificar Email</h3>
               <div className="flex justify-center gap-3 mb-10">
                {code.map((digit, index) => (
                  <input key={index} id={`code-${index}`} type="text" maxLength={1} value={digit}
                    onChange={(e) => {
                      const newCode = [...code];
                      newCode[index] = e.target.value;
                      setCode(newCode);
                      if (e.target.value && index < 3) document.getElementById(`code-${index+1}`)?.focus();
                    }}
                    className="w-14 h-14 text-center text-2xl font-black rounded-2xl border-2 bg-gray-50 focus:bg-white outline-none"
                    style={{ borderColor: digit ? "#009865" : "#f0f0f0" }}
                  />
                ))}
              </div>
              <button onClick={handleCodeSubmit} className="w-full py-4 rounded-2xl font-black text-white shadow-xl" style={{ backgroundColor: "#009865" }}>
                Confirmar Acesso
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
