import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import LoginForm from "@/components/landing/LoginForm";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col bg-white overflow-hidden fixed inset-0">
      <Navbar />
      
      {/* 
        No Desktop (lg): 
        - O Hero ocupa a tela inteira (o login agora é via modal acionado pela Navbar)
        
        No Mobile:
        - Divisão vertical 70/30
        - Hero ocupa 70%
        - LoginForm ocupa 30% (sem textos, apenas input e botão)
      */}
      <div className="flex-1 flex flex-col lg:flex-row pt-20 lg:pt-0 overflow-hidden">
        <div className="h-[70vh] lg:h-full lg:flex-1 overflow-hidden">
          <Hero />
        </div>
        
        {/* LoginForm visível apenas no Mobile */}
        <div className="h-[30vh] lg:hidden w-full bg-white border-t border-gray-100 px-6 flex items-center justify-center overflow-hidden">
          <LoginForm isMobile={true} />
        </div>
      </div>
    </div>
  );
}
