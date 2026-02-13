import { useState, useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import LoginForm from "@/components/landing/LoginForm";
import MainDashboard from "@/components/dashboard/MainDashboard";
import AICopilot from "@/components/dashboard/AICopilot";
import ConsultantModal from "@/components/modals/ConsultantModal";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [loginAberto, setLoginAberto] = useState(false);
  const [initialStep, setInitialStep] = useState<"email" | "code" | "other">("email");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [consultantModalOpen, setConsultantModalOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const abrirLogin = (step: "email" | "code" | "other" = "email") => {
    setInitialStep(step);
    setLoginAberto(true);
  };

  if (isLoggedIn) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <MainDashboard onLogout={() => setIsLoggedIn(false)} theme={theme} toggleTheme={toggleTheme} onOpenConsultant={() => setConsultantModalOpen(true)} />
        <AICopilot theme={theme} />
        <ConsultantModal 
          isOpen={consultantModalOpen} 
          onClose={() => setConsultantModalOpen(false)} 
        />
      </div>
    );
  }

  return (
    <div className={`h-screen w-screen flex flex-col overflow-hidden fixed inset-0 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar onOpenLogin={() => abrirLogin("email")} theme={theme} toggleTheme={toggleTheme} />
      
      <div className="flex-1 flex flex-col pt-20 overflow-hidden">
        {/* Parte Superior: Texto Digitado / Hero */}
        <div className="flex-1 overflow-hidden">
          <Hero onStart={() => abrirLogin("email")} />
        </div>
        
        {/* Parte Inferior: Input de Login Dividindo a Tela */}
        <div className="h-[350px] border-t border-gray-100 dark:border-gray-800 flex items-center justify-center p-8 bg-gray-50/50 dark:bg-gray-800/30">
          <LoginForm 
            initialStep={initialStep}
            onLoginSuccess={() => setIsLoggedIn(true)}
            onOpenOther={() => setInitialStep("other")}
            embedded={true}
          />
        </div>
      </div>

      <AnimatePresence>
        {loginAberto && !isLoggedIn && (
          <div className="lg:hidden">
            <LoginForm 
              initialStep={initialStep} 
              onClose={() => setLoginAberto(false)} 
              onLoginSuccess={() => setIsLoggedIn(true)}
              onOpenOther={() => setInitialStep("other")}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
