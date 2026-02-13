import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setShowCodeModal(true);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleCodeSubmit = () => {
    const fullCode = code.join("");
    if (fullCode.length === 4) {
      window.location.href = "/dashboard";
    }
  };

  return (
    <>
      <section
        id="login"
        className="w-full h-full flex items-center justify-center p-6 lg:p-12 bg-white"
      >
        <div className="w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <label 
                htmlFor="email" 
                className="block text-sm font-semibold mb-2" 
                style={{ color: "#004e3a" }}
              >
                Acesse sua conta
              </label>
              <p className="text-xs opacity-60" style={{ color: "#006044" }}>
                Digite seu e-mail abaixo para receber o código de acesso.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl border-2 focus:outline-none transition-all text-base"
                  style={{
                    borderColor: "#f0f0f0",
                    backgroundColor: "#f9f9f9",
                    color: "#004e3a",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#009865";
                    e.currentTarget.style.backgroundColor = "#ffffff";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#f0f0f0";
                    e.currentTarget.style.backgroundColor = "#f9f9f9";
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={!email.trim()}
                className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl font-bold text-white transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: email.trim() ? "#009865" : "#cccccc",
                }}
              >
                Enviar Código
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-xs" style={{ color: "#006044" }}>
                Ainda não tem conta?{" "}
                <a
                  href="#"
                  className="font-bold underline"
                  style={{ color: "#009865" }}
                >
                  Cadastre-se
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showCodeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
            onClick={() => setShowCodeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold" style={{ color: "#004e3a" }}>
                  Verificar Email
                </h3>
                <button
                  onClick={() => setShowCodeModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" style={{ color: "#006044" }} />
                </button>
              </div>

              <p className="text-sm mb-8 leading-relaxed" style={{ color: "#006044" }}>
                Enviamos um código de 4 dígitos para <br/>
                <span className="font-bold">{email}</span>
              </p>

              <div className="flex justify-between gap-3 mb-8">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    className="w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 focus:outline-none transition-all"
                    style={{
                      borderColor: digit ? "#009865" : "#f0f0f0",
                      backgroundColor: digit ? "#ffffff" : "#f9f9f9",
                      color: "#004e3a",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#009865";
                      e.currentTarget.style.backgroundColor = "#ffffff";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = digit ? "#009865" : "#f0f0f0";
                      e.currentTarget.style.backgroundColor = digit ? "#ffffff" : "#f9f9f9";
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleCodeSubmit}
                disabled={code.join("").length !== 4}
                className="w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  backgroundColor:
                    code.join("").length === 4 ? "#009865" : "#cccccc",
                }}
              >
                Confirmar Acesso
              </button>
              
              <button 
                className="w-full mt-4 py-2 text-xs font-semibold underline"
                style={{ color: "#009865" }}
                onClick={() => setCode(["", "", "", ""])}
              >
                Reenviar código
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
