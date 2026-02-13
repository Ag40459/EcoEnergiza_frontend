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
        className="w-full lg:w-1/2 h-screen lg:h-auto flex items-center justify-center p-6 bg-white"
      >
        <div className="w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-2" style={{ color: "#004e3a" }}>
              Bem-vindo
            </h2>
            <p className="text-sm mb-8" style={{ color: "#006044" }}>
              Digite seu email para acessar sua conta
            </p>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
                  style={{
                    borderColor: "#e0e0e0",
                    color: "#004e3a",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#009865")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#e0e0e0")}
                />
              </div>

              <button
                type="submit"
                disabled={!email.trim()}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: email.trim() ? "#009865" : "#cccccc",
                }}
              >
                Enviar Código
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 text-center">
              <a
                href="#"
                className="text-sm underline"
                style={{ color: "#009865" }}
              >
                Logar diferente
              </a>
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
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCodeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold" style={{ color: "#004e3a" }}>
                  Verificar Email
                </h3>
                <button
                  onClick={() => setShowCodeModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" style={{ color: "#006044" }} />
                </button>
              </div>

              <p className="text-sm mb-6" style={{ color: "#006044" }}>
                Digite os 4 dígitos enviados para {email}
              </p>

              <div className="flex gap-3 mb-8">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    className="w-12 h-12 text-center text-lg font-bold rounded-lg border-2 focus:outline-none transition-colors"
                    style={{
                      borderColor: digit ? "#009865" : "#e0e0e0",
                      color: "#004e3a",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#009865")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = digit
                        ? "#009865"
                        : "#e0e0e0")
                    }
                  />
                ))}
              </div>

              <button
                onClick={handleCodeSubmit}
                disabled={code.join("").length !== 4}
                className="w-full py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor:
                    code.join("").length === 4 ? "#009865" : "#cccccc",
                }}
              >
                Confirmar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
