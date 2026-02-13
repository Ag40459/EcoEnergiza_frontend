import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Award, Zap, Coins, User } from 'lucide-react';
import { DynamicAnimation, AnimationState } from '../animations/DynamicAnimation';

interface UserProfile {
  nome: string;
  categoria: 'bronze' | 'prata' | 'ouro' | 'diamante';
  saldoEnergia: string;
  saldoMoeda: string;
  isConsultor: boolean;
}

export default function MainDashboard() {
  const [user] = useState<UserProfile>({
    nome: "Alex Silva",
    categoria: 'ouro',
    saldoEnergia: "1.245",
    saldoMoeda: "450,00",
    isConsultor: false
  });

  const getCategoryIcon = (cat: string) => {
    switch(cat) {
      case 'diamante': return <Award className="text-blue-400 w-5 h-5" />;
      case 'ouro': return <Award className="text-yellow-500 w-5 h-5" />;
      case 'prata': return <Award className="text-gray-400 w-5 h-5" />;
      default: return <Award className="text-orange-600 w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar do Dashboard - Altura reduzida conforme pedido */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 px-6">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          {/* Lado Esquerdo: Perfil */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
              <User className="text-green-600 w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-[#004e3a]">{user.nome}</span>
                {getCategoryIcon(user.categoria)}
              </div>
            </div>
          </div>

          {/* Lado Direito: Saldos Vazados */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center">
                <Zap className="text-yellow-500 w-4 h-4" />
              </div>
              <span className="text-sm font-black text-[#004e3a]">{user.saldoEnergia} <span className="text-[10px] opacity-50">kWh</span></span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                <Coins className="text-green-600 w-4 h-4" />
              </div>
              <span className="text-sm font-black text-[#004e3a]"><span className="text-[10px] opacity-50">R$</span> {user.saldoMoeda}</span>
            </div>

            <button className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-400">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="flex-1 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          
          {/* Animação 1: Geração */}
          <DynamicAnimation 
            type="generation"
            state="active"
            label="Geração de Hoje"
            value="4.2"
            unit="kWh"
            onClick={() => alert("Abrindo Modal de Geração...")}
          />

          {/* Animação 2: Consumo */}
          <DynamicAnimation 
            type="consumption"
            state="inactive"
            label="Consumo da Casa"
            value="--"
            unit="kWh"
            onClick={() => alert("Abrindo Modal de Consumo...")}
          />

          {/* Animação 3: Consultor */}
          <DynamicAnimation 
            type="consultant"
            state={user.isConsultor ? 'active' : 'inactive'}
            label={user.isConsultor ? 'Painel Consultor' : 'Ganhe Comissões'}
            value={user.isConsultor ? 'CRM' : 'Seja'}
            unit={user.isConsultor ? 'Ativo' : 'Consultor'}
            onClick={() => alert("Abrindo Fluxo de Consultor...")}
          />

        </div>
      </main>
    </div>
  );
}
