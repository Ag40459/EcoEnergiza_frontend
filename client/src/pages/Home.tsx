import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import LoginForm from "@/components/landing/LoginForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navbar />
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
