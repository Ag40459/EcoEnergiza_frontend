import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import LoginForm from "@/components/landing/LoginForm";
import MainDashboard from "@/components/dashboard/MainDashboard";
import ConsultantModal from "@/components/modals/ConsultantModal";
import AICopilot from "@/components/dashboard/AICopilot";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginAberto, setLoginAberto] = useState(false);
  const [initialStep, setInitialStep] = useState<"email" | "code" | "other">("email");
  const [consultantModalOpen, setConsultantModalOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);

  const abrirLogin = (step: "email" | "code" | "other" = "email") => {
    setInitialStep(step);
    setLoginAberto(true);
  };

  const handleLoginSuccess = (isAdm: boolean) => {
    setIsLoggedIn(true);
    setIsAdmin(isAdm);
    setLoginAberto(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  if (isLoggedIn) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <MainDashboard 
          onLogout={handleLogout} 
          theme={theme} 
          toggleTheme={toggleTheme}
          onOpenConsultant={() => setConsultantModalOpen(true)}
          isAdmin={isAdmin}
        />
        
        <ConsultantModal 
          isOpen={consultantModalOpen} 
          onClose={() => setConsultantModalOpen(false)} 
        />
        
        <AICopilot 
          theme={theme}
          isConsultant={false} // Pode ser dinâmico baseado no perfil do usuário
        />
      </div>
    );
  }

  return (
    <div className={`h-screen w-screen flex flex-col overflow-hidden fixed inset-0 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar 
        onOpenLogin={() => abrirLogin("email")} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      
      <div className="flex-1 overflow-hidden">
        <Hero onStart={() => abrirLogin("email")} />
      </div>

      <AnimatePresence>
        {loginAberto && (
          <LoginForm 
            initialStep={initialStep} 
            onClose={() => setLoginAberto(false)} 
            onLoginSuccess={handleLoginSuccess}
            onOpenOther={() => setInitialStep("other")}
          />
        )}
      </AnimatePresence>

      <AICopilot theme={theme} />
    </div>
  );
}
