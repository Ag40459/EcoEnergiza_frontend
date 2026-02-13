import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Unlock, CheckCircle2, Play, WifiOff, ArrowRight, User, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

interface ConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultantModal({ isOpen, onClose }: ConsultantModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [lockedSteps, setLockedSteps] = useState<number[]>([]);
  const [hasInternet] = useState(true); // Simulação de status de rede

  const steps = [
    { id: 1, title: "Bem-vindo à Oportunidade", subtitle: "Confirmação Inicial" },
    { id: 2, title: "Conheça o Programa", subtitle: "Apresentação da Oportunidade" },
    { id: 3, title: "Seus Benefícios", subtitle: "Benefícios Listados" },
    { id: 4, title: "Está Pronto?", subtitle: "Call-to-Action" },
    { id: 5, title: "Informações Básicas", subtitle: "Formulário de Inscrição" },
    { id: 6, title: "Sucesso!", subtitle: "Confirmação Final" },
  ];

  const toggleLock = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLockedSteps(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleStepClick = (id: number) => {
    if (id > activeStep && !lockedSteps.includes(id)) return;
    setActiveStep(id);
  };

  const renderStepContent = (id: number) => {
    switch(id) {
      case 1:
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              O programa de consultores da Ecolote permite que você ajude pessoas a economizarem energia enquanto ganha comissões recorrentes.
            </p>
            <button 
              onClick={() => setActiveStep(2)}
              className="w-full py-3 bg-[#009865] text-white rounded-xl font-bold shadow-md"
            >
              Confirmar e Continuar
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
              {hasInternet ? (
                <>
                  <div className="absolute inset-0 bg-black/20" />
                  <Play className="w-12 h-12 text-white z-10" />
                  <p className="absolute bottom-4 left-4 text-[10px] text-white font-bold">VÍDEO EXPLICATIVO (60s)</p>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <WifiOff className="w-8 h-8" />
                  <span className="text-xs font-bold">Falha na conexão</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['IA Ativa', 'CRM Integrado', 'Altas Comissões', 'Suporte 24h'].map(item => (
                <div key={item} className="p-2 bg-green-50 rounded-lg text-[10px] font-bold text-[#009865] text-center">
                  {item}
                </div>
              ))}
            </div>
            <button 
              onClick={() => setActiveStep(3)}
              className="w-full py-3 bg-[#009865] text-white rounded-xl font-bold"
            >
              Próximo
            </button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-3">
            {[
              "Comissão por venda",
              "Ferramentas de IA para ajudar",
              "Suporte da equipe",
              "Acesso a materiais de marketing",
              "Agenda e CRM integrados"
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-[#009865]" />
                <span className="text-xs font-medium text-gray-700">{b}</span>
              </div>
            ))}
            <button 
              onClick={() => setActiveStep(4)}
              className="w-full py-3 bg-[#009865] text-white rounded-xl font-bold mt-2"
            >
              Próximo
            </button>
          </div>
        );
      case 4:
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-[#009865]" />
            </div>
            <h4 className="font-bold text-[#004e3a]">Sua jornada começa aqui!</h4>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setActiveStep(5)}
                className="w-full py-4 bg-[#009865] text-white rounded-xl font-bold shadow-lg"
              >
                Quero Ser Consultor
              </button>
              <button className="text-xs font-bold text-[#009865] underline">Saber Mais</button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input placeholder="Nome Completo" className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none text-sm" />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input placeholder="Email" className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none text-sm" />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input placeholder="Telefone (WhatsApp)" className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none text-sm" />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input placeholder="Região de Atuação" className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none text-sm" />
              </div>
            </div>
            <button 
              onClick={() => setActiveStep(6)}
              className="w-full py-4 bg-[#009865] text-white rounded-xl font-bold"
            >
              Enviar Inscrição
            </button>
          </div>
        );
      case 6:
        return (
          <div className="text-center space-y-6 py-4">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-[#004e3a]">Inscrição Enviada!</h4>
              <p className="text-xs text-gray-500">Obrigado por se inscrever! Nossa equipe entrará em contato em breve via telefone ou email.</p>
            </div>
            <button 
              onClick={onClose}
              className="w-full py-4 bg-[#004e3a] text-white rounded-xl font-bold"
            >
              Voltar para Home
            </button>
          </div>
        );
      default: return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-[2.5rem] w-full max-w-md relative shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: '90vh' }}
          >
            {/* Header */}
            <div className="p-8 pb-4 border-b border-gray-50 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-[#004e3a]">Torne-se um Consultor</h3>
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Ganhe comissões, seja nosso consultor</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Steps List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {steps.map((step) => {
                const isExpanded = activeStep === step.id || lockedSteps.includes(step.id);
                const isLocked = lockedSteps.includes(step.id);
                const isAvailable = step.id <= activeStep || lockedSteps.includes(step.id);

                return (
                  <div 
                    key={step.id}
                    className={`rounded-2xl border transition-all duration-300 ${
                      isExpanded ? 'border-green-100 bg-white shadow-sm' : 'border-gray-100 bg-gray-50/50'
                    } ${!isAvailable && 'opacity-50 grayscale cursor-not-allowed'}`}
                    onClick={() => handleStepClick(step.id)}
                  >
                    <div className="p-4 flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isAvailable ? 'bg-[#009865] text-white' : 'bg-gray-200 text-gray-500'
                        }`}>
                          {step.id}
                        </div>
                        <div>
                          <h5 className={`text-xs font-bold ${isExpanded ? 'text-[#004e3a]' : 'text-gray-500'}`}>{step.title}</h5>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => toggleLock(e, step.id)}
                        className={`p-1.5 rounded-lg transition-colors ${isLocked ? 'bg-green-100 text-[#009865]' : 'hover:bg-gray-100 text-gray-300'}`}
                      >
                        {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-0">
                            {renderStepContent(step.id)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
