import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Lock, Mail, AlertCircle } from "lucide-react";

interface LoginFormProps {
  isMobile?: boolean;
  onClose?: () => void;
  initialStep?: "email" | "code" | "other";
  onOpenOther?: () => void;
}

export default function LoginForm({ isMobile = false, onClose, initialStep = "email", onOpenOther }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code" | "other">(initialStep);
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [showSmartInfo, setShowSmartInfo] = useState(false);
  
  const [password, setPassword] = useState("");

  // Efeito para detectar o @ e mostrar informação de cadastro automático
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
      // Aqui entrará a lógica de verificar se usuário existe
      setStep("code");
      setError("");
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
      alert("Acesso autorizado! Redirecionando para a plataforma (Em breve)...");
    }
  };

  const renderEmailStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm"
    >
      <div className="mb-8 text-center">
        {/* Título simplificado conforme pedido */}
        <h3 className="text-xl font-bold mb-2" style={{ color: "#004e3a" }}>
          Acesse sua conta...
        </h3>
        {/* Descrição removida conforme pedido, mantendo apenas se houver info inteligente */}
        {showSmartInfo && (
          <motion.p 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-sm font-medium leading-relaxed mt-4 p-3 rounded-lg bg-green-50" 
            style={{ color: "#007a52" }}
          >
            Caso você não tenha cadastro, ele será feito automaticamente. Se já for usuário, basta inserir seu e-mail aqui.
          </motion.p>
        )}
      </div>

      <form onSubmit={handleEmailSubmit} className="space-y-6">
        <div className="space-y-1">
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // Texto centralizado conforme pedido
            className="w-full px-4 py-4 rounded-xl border-2 bg-gray-50 focus:bg-white focus:outline-none transition-all text-base text-center"
            style={{ borderColor: "#f0f0f0" }}
            onFocus={(e) => e.currentTarget.style.borderColor = "#009865"}
            onBlur={(e) => e.currentTarget.style.borderColor = "#f0f0f0"}
          />
          {error && (
            <div className="flex items-center gap-1 text-red-500 text-xs mt-1 px-1">
              <AlertCircle className="w-3 h-3" />
              {error}
            </div>
          )}
        </div>

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

      <div className="mt-8 text-center">
        <button 
          onClick={() => {
            if (isMobile && onOpenOther) {
              onOpenOther();
            } else {
              setStep("other");
            }
          }}
          className="text-sm font-bold underline opacity-60 hover:opacity-100 transition-opacity" 
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
      <p className="text-sm mb-8 opacity-70">Digite os 4 dígitos enviados para <br/><span className="font-bold">{email}</span></p>
      
      <div className="flex justify-center gap-3 mb-10">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleCodeChange(index, e.target.value)}
            className="w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 bg-gray-50 focus:bg-white focus:outline-none transition-all"
            style={{ borderColor: digit ? "#009865" : "#f0f0f0" }}
          />
        ))}
      </div>

      <button
        onClick={handleCodeSubmit}
        disabled={code.join("").length !== 4}
        className="w-full py-4 rounded-xl font-bold text-white shadow-lg disabled:opacity-40 transition-all"
        style={{ backgroundColor: code.join("").length === 4 ? "#009865" : "#cccccc" }}
      >
        Confirmar Acesso
      </button>

      {/* Botão de voltar removido conforme pedido */}
    </motion.div>
  );

  const renderOtherStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full max-w-sm"
    >
      <div className="mb-8">
        <h3 className="text-xl font-bold text-center" style={{ color: "#004e3a" }}>Login com Senha</h3>
      </div>
      <div className="space-y-5">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 bg-gray-50 focus:outline-none text-sm text-center"
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
            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 bg-gray-50 focus:outline-none text-sm text-center"
            style={{ borderColor: "#f0f0f0" }}
          />
        </div>
        <button
          className="w-full py-4 mt-4 rounded-xl font-bold text-white shadow-md transition-all"
          style={{ backgroundColor: "#009865" }}
          onClick={() => {
            if (email === "adm@adm.com" && password === "0000") {
              alert("Acesso ADM autorizado!");
            } else {
              alert("Login com senha (Em breve)...");
            }
          }}
        >
          Confirmar
        </button>
        <div className="mt-4 text-center">
          <button 
            onClick={() => setStep("email")}
            className="text-xs font-bold underline opacity-60 hover:opacity-100 transition-opacity" 
            style={{ color: "#009865" }}
          >
            Não tenho cadastro
          </button>
        </div>
      </div>
    </motion.div>
  );

  if (isMobile && step === "email") {
    return (
      <div className="w-full px-4 flex flex-col items-center">
        {renderEmailStep()}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[2.5rem] p-10 max-w-md w-full relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ajuste do X: descer o título se necessário ou posicionar X corretamente */}
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10">
          <X className="w-6 h-6 text-gray-400" />
        </button>
        <div className="mt-4">
          {step === "email" && renderEmailStep()}
          {step === "code" && renderCodeStep()}
          {step === "other" && renderOtherStep()}
        </div>
      </motion.div>
    </div>
  );
}
