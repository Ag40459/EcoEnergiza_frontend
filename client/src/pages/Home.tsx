import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import LoginForm from "@/components/landing/LoginForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navbar />
      
      {/* 
        No Mobile: 
        - Flex column (cima e baixo)
        - Hero ocupa 70% da altura visível (h-[70vh])
        - LoginForm ocupa o restante (flex-1)
        
        No Desktop (lg):
        - Flex row (lado a lado)
        - Hero ocupa 100% da altura da viewport (h-screen) e 1/2 da largura (w-1/2)
        - LoginForm ocupa o restante (w-1/2)
      */}
      <div className="flex-1 flex flex-col lg:flex-row pt-16 lg:pt-0">
        <div className="h-[70vh] lg:h-screen lg:w-1/2 overflow-hidden">
          <Hero />
        </div>
        <div className="flex-1 lg:h-screen lg:w-1/2 overflow-hidden bg-white">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
