import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Lock, Mail } from "lucide-react";

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
      setTimeout(() => {
        setShowCodeModal(true);
        setLoading(false);
      }, 800);
    }
  };

  const handleCodeSubmit = () => {
    if (code.join("").length === 4) {
      const isAdmin = email === "adm@adm.com";
      if (onLoginSuccess) onLoginSuccess(isAdmin);
      setShowCodeModal(false);
    }
  };

  const handlePasswordSubmit = () => {
    if (email === "adm@adm.com" && password === "0000") {
      if (onLoginSuccess) onLoginSuccess(true);
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
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            onSubmit={handleEmailSubmit} className="w-full space-y-4"
          >
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#009865] outline-none text-center font-bold dark:text-white transition-all"
            />
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl font-black text-white bg-[#009865] shadow-xl disabled:opacity-40 active:scale-95 transition-transform"
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
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="w-full space-y-4"
          >
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-center font-bold dark:text-white"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-center font-bold dark:text-white"
            />
            <button onClick={handlePasswordSubmit} className="w-full py-4 rounded-2xl font-black text-white bg-[#009865] shadow-xl active:scale-95 transition-transform">
              Confirmar
            </button>
            <button onClick={() => setStep("email")} className="w-full text-xs font-black underline text-[#009865] mt-2">
              Voltar para E-mail
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Código */}
      <AnimatePresence>
        {showCodeModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 max-w-sm w-full relative shadow-2xl border border-gray-100 dark:border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowCodeModal(false)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>
              
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-[#009865]" />
                </div>
                <h3 className="text-xl font-black text-[#004e3a] dark:text-green-400">Verificação</h3>
                <p className="text-xs font-bold text-gray-400">Insira os 4 dígitos enviados para <br/> <span className="text-[#009865]">{email}</span></p>
                
                <div className="flex justify-center gap-3">
                  {code.map((digit, index) => (
                    <input 
                      key={index} 
                      id={`code-modal-${index}`} 
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
                        if (val && index < 3) document.getElementById(`code-modal-${index+1}`)?.focus();
                      }}
                      className="w-14 h-14 text-center text-2xl font-black rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 outline-none focus:border-[#009865] dark:text-white transition-all"
                    />
                  ))}
                </div>
                
                <button onClick={handleCodeSubmit} className="w-full py-4 rounded-2xl font-black text-white bg-[#009865] shadow-xl active:scale-95 transition-transform">
                  Confirmar Acesso
                </button>
                
                <button onClick={() => setShowCodeModal(false)} className="text-xs font-black underline text-gray-400 hover:text-[#009865] transition-colors">
                  Reenviar código
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]" onClick={onClose}>
      <motion.div
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 max-w-md w-full relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>
        {renderContent()}
      </motion.div>
    </div>
  );
}
