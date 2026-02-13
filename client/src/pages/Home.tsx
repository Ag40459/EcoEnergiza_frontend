import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import LoginForm from "@/components/landing/LoginForm";

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <Navbar />
      
      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 overflow-hidden">
          <Hero />
        </div>
        <div className="w-1/2 overflow-hidden">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
