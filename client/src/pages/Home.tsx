import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import LoginForm from "@/components/landing/LoginForm";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [loginAberto, setLoginAberto] = useState(false);
  const [initialStep, setInitialStep] = useState<"email" | "code" | "other">("email");

  const abrirLogin = (step: "email" | "code" | "other" = "email") => {
    setInitialStep(step);
    setLoginAberto(true);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-white overflow-hidden fixed inset-0">
      <Navbar onOpenLogin={() => abrirLogin("email")} />
      
      <div className="flex-1 flex flex-col lg:flex-row pt-20 lg:pt-0 overflow-hidden">
        <div className="h-[40vh] lg:h-full lg:flex-1 overflow-hidden">
          <Hero onStart={() => abrirLogin("email")} />
        </div>
        
        <div className="h-[60vh] lg:hidden w-full bg-white border-t border-gray-100 px-6 flex items-center justify-center overflow-hidden">
          <LoginForm 
            isMobile={true} 
            onOpenOther={() => abrirLogin("other")}
          />
        </div>
      </div>

      <AnimatePresence>
        {loginAberto && (
          <LoginForm 
            initialStep={initialStep} 
            onClose={() => setLoginAberto(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
