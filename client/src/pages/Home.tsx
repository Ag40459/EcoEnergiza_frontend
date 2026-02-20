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
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("isAdmin") === "true";
  });
  const [loginAberto, setLoginAberto] = useState(false);
  const [initialStep, setInitialStep] = useState<"email" | "code" | "other">("email");
  const [consultantModalOpen, setConsultantModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
    localStorage.setItem("isAdmin", isAdmin.toString());
  }, [isLoggedIn, isAdmin]);

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
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("activeTab"); 
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
          isConsultant={false} 
        />
      </div>
    );
  }

  return (
    <div className={`h-full w-full flex flex-col relative overflow-hidden ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar 
        onOpenLogin={() => abrirLogin("email")} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      
      <main className="flex-1 overflow-hidden">
        <Hero onStart={() => abrirLogin("email")} />
      </main>

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
