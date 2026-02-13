import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Lock, Mail } from "lucide-react";

interface LoginFormProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export default function LoginForm({ isMobile = false, onClose }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code" | "other">("email");
  const [code, setCode] = useState(["", "", "", ""]);
  
  // Estados para o formulário "Acesse de outra forma"
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setStep("code");
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 3) {
        document.getElementById(`code-${index + 1}`)?.focus();
      }
    }
  };

  const handleCodeSubmit = () => {
    if (code.join("").length === 4) {
      window.location.href = "/dashboard";
    }
  };

  const renderEmailStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm"
    >
      {!isMobile && (
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold" style={{ color: "#004e3a" }}>Acesse sua conta</h2>
        </div>
      )}
      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-4 rounded-xl border-2 bg-gray-50 focus:bg-white focus:outline-none transition-all text-base"
          style={{ borderColor: "#f0f0f0" }}
          onFocus={(e) => e.currentTarget.style.borderColor = "#009865"}
          onBlur={(e) => e.currentTarget.style.borderColor = "#f0f0f0"}
        />
        <button
          type="submit"
          disabled={!email.trim()}
          className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl font-bold text-white transition-all shadow-md disabled:opacity-40"
          style={{ backgroundColor: email.trim() ? "#009865" : "#cccccc" }}
        >
          Enviar Código
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
      <div className="mt-4 text-center">
        <button 
          onClick={() => setStep("other")}
          className="text-xs font-bold underline" 
          style={{ color: "#009865" }}
        >
          Acesse de outra forma
        </button>
      </div>
    </motion.div>
  );

  const renderCodeStep = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-sm text-center"
    >
      <h3 className="text-xl font-bold mb-4" style={{ color: "#004e3a" }}>Verificar Email</h3>
      <p className="text-xs mb-6 opacity-70">Digite os 4 dígitos enviados para {email}</p>
      <div className="flex justify-center gap-3 mb-8">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleCodeChange(index, e.target.value)}
            className="w-12 h-12 text-center text-xl font-bold rounded-xl border-2 bg-gray-50 focus:bg-white focus:outline-none transition-all"
            style={{ borderColor: digit ? "#009865" : "#f0f0f0" }}
          />
        ))}
      </div>
      <button
        onClick={handleCodeSubmit}
        disabled={code.join("").length !== 4}
        className="w-full py-4 rounded-xl font-bold text-white shadow-lg disabled:opacity-40"
        style={{ backgroundColor: code.join("").length === 4 ? "#009865" : "#cccccc" }}
      >
        Confirmar Acesso
      </button>
    </motion.div>
  );

  const renderOtherStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full max-w-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold" style={{ color: "#004e3a" }}>Login Alternativo</h3>
        <button onClick={() => setStep("email")} className="text-xs font-bold underline" style={{ color: "#009865" }}>Voltar</button>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 bg-gray-50 focus:outline-none text-sm"
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
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 bg-gray-50 focus:outline-none text-sm"
            style={{ borderColor: "#f0f0f0" }}
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 bg-gray-50 focus:outline-none text-sm"
            style={{ borderColor: "#f0f0f0" }}
          />
        </div>
        <button
          className="w-full py-4 rounded-xl font-bold text-white shadow-md"
          style={{ backgroundColor: "#009865" }}
          onClick={() => window.location.href = "/dashboard"}
        >
          Entrar
        </button>
      </div>
    </motion.div>
  );

  if (isMobile) {
    return (
      <div className="w-full px-4 flex flex-col items-center">
        {step === "email" && renderEmailStep()}
        {step === "code" && renderCodeStep()}
        {step === "other" && renderOtherStep()}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[2rem] p-10 max-w-md w-full relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>
        {step === "email" && renderEmailStep()}
        {step === "code" && renderCodeStep()}
        {step === "other" && renderOtherStep()}
      </motion.div>
    </div>
  );
}
