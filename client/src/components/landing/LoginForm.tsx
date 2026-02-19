import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, ChevronRight, ShieldCheck, Smartphone } from "lucide-react";

interface LoginFormProps {
  initialStep: "email" | "code" | "other";
  onClose: () => void;
  onLoginSuccess: (isAdmin: boolean) => void;
  onOpenOther: () => void;
}

export default function LoginForm({ initialStep, onClose, onLoginSuccess, onOpenOther }: LoginFormProps) {
  const [step, setStep] = useState(initialStep);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const codeInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  useEffect(() => {
    if (step === "email" || step === "other") {
      setTimeout(() => {
        if (step === "email") emailInputRef.current?.focus();
        else if (step === "other") emailInputRef.current?.focus();
      }, 100);
    }
  }, [step]);

  useEffect(() => {
    if (showCodeModal) {
      setTimeout(() => {
        codeInputRefs[0].current?.focus();
      }, 100);
    }
  }, [showCodeModal]);

  useEffect(() => {
    // Bloqueia a rolagem do body ao abrir o login
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    // Adiciona estilo para esconder scrollbars globalmente enquanto o login está aberto
    const style = document.createElement('style');
    style.id = 'hide-scrollbar-style';
    style.innerHTML = `
      *::-webkit-scrollbar { display: none !important; }
      * { -ms-overflow-style: none !important; scrollbar-width: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.style.overflow = originalStyle;
      const styleElement = document.getElementById('hide-scrollbar-style');
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowCodeModal(true);
    }, 1000);
  };

  const handleCodeChange = (index: number, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = numericValue;
    setCode(newCode);

    if (numericValue && index < 3) {
      codeInputRefs[index + 1].current?.focus();
    }
  };

  const handleLoginFinal = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      
      const isAdm = email.toLowerCase() === "adm@adm.com";
      onLoginSuccess(isAdm);
      setShowCodeModal(false);
    }, 1000);
  };

  const renderContent = () => (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      <div className="mb-8 text-center w-full">
        <div className="w-16 h-16 bg-[#009865]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-10 h-10 text-[#009865]" />
        </div>
        <h2 className="text-3xl font-black text-[#004e3a] dark:text-green-400">
          {step === "other" ? "Entrar com Senha" : "Acesse sua Conta"}
        </h2>
        <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">
          {step === "other" ? "Digite suas credenciais" : "Energia Limpa e Sustentável"}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === "email" && (
          <motion.form 
            key="email-step"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            onSubmit={handleEmailSubmit} className="w-full space-y-6"
          >
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                ref={emailInputRef}
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com" required
                className="w-full pl-12 pr-4 py-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-transparent focus:border-[#009865] outline-none font-black transition-all"
              />
            </div>
            <button 
              type="submit" disabled={loading}
              className="w-full py-5 bg-[#009865] text-white rounded-[2rem] font-black shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
            >
              {loading ? "Processando..." : "Receber Código"}
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="text-center">
              <button 
                type="button" onClick={() => setStep("other")}
                className="text-xs font-black text-[#009865] uppercase tracking-widest hover:underline"
              >
                Entrar com senha
              </button>
            </div>
          </motion.form>
        )}

        {step === "other" && (
          <motion.form 
            key="other-step"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            onSubmit={(e) => { e.preventDefault(); handleLoginFinal(); }} className="w-full space-y-4"
          >
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                ref={emailInputRef}
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail" required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-transparent focus:border-[#009865] outline-none font-black"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                ref={passwordInputRef}
                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha" required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-transparent focus:border-[#009865] outline-none font-black"
              />
            </div>
            <button 
              type="submit" disabled={loading}
              className="w-full py-5 bg-[#004e3a] text-white rounded-[2rem] font-black shadow-xl active:scale-95 transition-transform"
            >
              {loading ? "Entrando..." : "Acessar Plataforma"}
            </button>
            <button 
              type="button" onClick={() => setStep("email")}
              className="w-full text-xs font-black text-[#009865] uppercase tracking-widest"
            >
              Usar código por e-mail
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden touch-none">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white dark:bg-gray-900 rounded-[3.5rem] w-full max-w-md p-6 md:p-10 relative shadow-2xl border border-white/10 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>

        {renderContent()}

        <AnimatePresence>
          {showCodeModal && (
            <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl overflow-hidden">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-900 rounded-[3.5rem] p-8 md:p-12 max-w-md w-full relative shadow-2xl border border-gray-100 dark:border-gray-800"
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={() => setShowCodeModal(false)} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
                
                <div className="text-center space-y-8">
                  <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                    <Smartphone className="w-10 h-10 text-[#009865]" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-[#004e3a] dark:text-green-400">Verificação</h3>
                    <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">Código enviado para <span className="text-[#009865]">{email}</span></p>
                  </div>
                  
                  <div className="flex justify-between gap-2">
                    {code.map((digit, idx) => (
                      <input 
                        key={idx} 
                        ref={codeInputRefs[idx]}
                        type="text" inputMode="numeric" pattern="[0-9]*" maxLength={1} value={digit}
                        onChange={(e) => handleCodeChange(idx, e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && idx === 3 && handleLoginFinal()}
                        className="w-12 h-16 text-center text-2xl font-black bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-transparent focus:border-[#009865] outline-none dark:text-white"
                      />
                    ))}
                  </div>
                  
                  <button onClick={handleLoginFinal} disabled={loading} className="w-full py-5 bg-[#009865] text-white rounded-[2rem] font-black shadow-xl active:scale-95 transition-transform">
                    {loading ? "Verificando..." : "Confirmar Código"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
