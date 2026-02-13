import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Lock, Mail, Smartphone } from "lucide-react";

interface LoginFormProps {
  onClose?: () => void;
  initialStep?: "email" | "code" | "other";
  onOpenOther?: () => void;
  onLoginSuccess?: (isAdmin: boolean) => void;
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
  const [showCodeModal, setShowCodeModal] = useState(false);

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setLoading(true);
      // Simulação de envio de código
      setTimeout(() => {
        setShowCodeModal(true);
        setLoading(false);
      }, 800);
    }
  };

  const handleCodeSubmit = () => {
    if (code.join("").length === 4) {
      // Regra: se o e-mail for adm@adm.com, loga como admin
      const isAdmin = email.toLowerCase() === "adm@adm.com";
      if (onLoginSuccess) onLoginSuccess(isAdmin);
      setShowCodeModal(false);
    }
  };

  const handlePasswordSubmit = () => {
    if (password) {
      const isAdmin = email.toLowerCase() === "adm@adm.com";
      if (onLoginSuccess) onLoginSuccess(isAdmin);
    }
  };

  const renderContent = () => (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      <div className="mb-6 text-center w-full">
        <h3 className="text-2xl font-black text-[#004e3a] dark:text-green-400">
          Bem-vindo de volta!
        </h3>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Acesse sua conta segura</p>
      </div>

      <AnimatePresence mode="wait">
        {step === "email" && (
          <motion.form 
            key="email-step"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            onSubmit={handleEmailSubmit} className="w-full space-y-4"
          >
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#009865] transition-colors" />
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-5 rounded-[2rem] border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#009865] outline-none font-bold dark:text-white transition-all shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full flex items-center justify-center gap-3 px-4 py-5 rounded-[2rem] font-black text-white bg-[#009865] shadow-xl disabled:opacity-40 active:scale-95 transition-transform"
            >
              {loading ? "Enviando..." : "Entrar com Código"} <ArrowRight className="w-5 h-5" />
            </button>
            <div className="text-center">
              <button 
                type="button"
                onClick={() => onOpenOther ? onOpenOther() : setStep("other")}
                className="text-xs font-black underline text-[#009865] hover:text-[#004e3a] transition-colors"
              >
                Acesse com senha
              </button>
            </div>
          </motion.form>
        )}

        {step === "other" && (
          <motion.div 
            key="other-step"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="w-full space-y-4"
          >
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 font-bold dark:text-white"
            />
            <input
              type="password"
              placeholder="Sua Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 font-bold dark:text-white"
            />
            <button onClick={handlePasswordSubmit} className="w-full py-5 rounded-[2rem] font-black text-white bg-[#009865] shadow-xl active:scale-95 transition-transform">
              Confirmar Acesso
            </button>
            <button onClick={() => setStep("email")} className="w-full text-xs font-black underline text-[#009865] mt-2">
              Voltar para E-mail
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Código - Forçado em modal conforme pedido */}
      <AnimatePresence>
        {showCodeModal && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-[3.5rem] p-10 max-w-sm w-full relative shadow-2xl border border-gray-100 dark:border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowCodeModal(false)} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>
              
              <div className="text-center space-y-8">
                <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-10 h-10 text-[#009865]" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#004e3a] dark:text-green-400">Verificação</h3>
                  <p className="text-xs font-bold text-gray-400 mt-2">Enviamos um código para <br/> <span className="text-[#009865]">{email}</span></p>
                </div>
                
                <div className="flex justify-center gap-3">
                  {code.map((digit, index) => (
                    <input 
                      key={index} 
                      id={`code-input-${index}`} 
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
                        if (val && index < 3) document.getElementById(`code-input-${index+1}`)?.focus();
                      }}
                      className="w-14 h-16 text-center text-3xl font-black rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 outline-none focus:border-[#009865] dark:text-white transition-all shadow-inner"
                    />
                  ))}
                </div>
                
                <button onClick={handleCodeSubmit} className="w-full py-5 bg-[#009865] text-white rounded-[2rem] font-black shadow-xl active:scale-95 transition-transform">
                  Confirmar Código
                </button>
                
                <button onClick={() => setShowCodeModal(false)} className="text-xs font-black underline text-gray-400 hover:text-[#009865] transition-colors">
                  Não recebi o código
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  if (embedded) return renderContent();

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="bg-white dark:bg-gray-900 rounded-[3.5rem] p-10 max-w-md w-full relative shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>
        {renderContent()}
      </motion.div>
    </div>
  );
}
