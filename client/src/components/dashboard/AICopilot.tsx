import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, Trash2, Star, Mail, ArrowRight, ChevronLeft, Sparkles, GripHorizontal } from 'lucide-react';

interface AICopilotProps {
  theme?: 'light' | 'dark';
  isConsultant?: boolean;
}

export default function AICopilot({ theme = 'light', isConsultant = false }: AICopilotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Olá! Sou a Sol, sua assistente virtual EcoEnergiza. Como posso te ajudar hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      let aiResponse = "Interessante! Posso te ajudar com mais detalhes sobre a EcoEnergiza. O que mais gostaria de saber?";
      const lower = userMsg.toLowerCase();
      
      if (lower.includes('consultor')) {
        aiResponse = "Para se tornar um consultor EcoEnergiza e ganhar comissões, clique na animação 'Consultor' no seu dashboard. Lá você encontrará o passo a passo completo!";
      } else if (lower.includes('consumo')) {
        aiResponse = "Você pode acompanhar o consumo da sua casa clicando no card 'Consumo da Casa'. Se o saldo estiver embaçado, você precisará adquirir um Smart Meter para iniciar o monitoramento real.";
      } else if (lower.includes('usina') || lower.includes('geração')) {
        aiResponse = "Nossas usinas remotas permitem que você economize até 95% na conta de luz. Clique em 'Geração de Energia' para simular seu projeto solar agora mesmo!";
      }

      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    }, 1000);
  };

  const handleEndSession = () => {
    const confirmEmail = window.confirm("Deseja receber a cópia deste atendimento por e-mail?");
    if (confirmEmail) {
      alert("Histórico enviado para seu e-mail com sucesso!");
    }
    setShowEvaluation(true);
  };

  const submitEvaluation = () => {
    alert("Obrigado pela sua avaliação!");
    setMessages([{ role: 'ai', text: 'Atendimento encerrado. Como posso te ajudar agora?' }]);
    setShowEvaluation(false);
    setRating(0);
    setComment('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-24 right-6 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            drag
            dragControls={dragControls}
            dragMomentum={false}
            dragListener={false}
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className={`absolute bottom-20 right-0 w-[90vw] max-w-[400px] h-[600px] rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden border ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}
          >
            {}
            <AnimatePresence>
              {showEvaluation && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className={`absolute inset-0 z-50 flex flex-col items-center justify-center p-10 text-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
                >
                  <Star className="w-16 h-16 text-yellow-500 mb-6" />
                  <h3 className={`text-2xl font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#004e3a]'}`}>Avalie o Atendimento</h3>
                  <p className="text-[10px] text-gray-400 font-bold mb-8 uppercase tracking-widest">Sua opinião é fundamental</p>
                  
                  <div className="flex gap-2 mb-8">
                    {[1, 2, 3, 4, 5].map(s => (
                      <button key={s} onClick={() => setRating(s)} className={`p-2 transition-colors ${rating >= s ? 'text-yellow-500' : 'text-gray-200'}`}>
                        <Star className={`w-8 h-8 ${rating >= s ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                  </div>

                  <textarea 
                    value={comment} onChange={(e) => setComment(e.target.value)}
                    placeholder="Deixe seu comentário (opcional)"
                    className={`w-full p-4 rounded-2xl border-none outline-none font-black text-xs mb-6 h-32 resize-none ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}
                  />

                  <button 
                    onClick={submitEvaluation}
                    className="w-full py-5 bg-[#009865] text-white rounded-[2rem] font-black shadow-xl"
                  >
                    Enviar Avaliação
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#009865] rounded-full flex items-center justify-center text-white shadow-2xl relative group"
      >
        <div className="absolute inset-0 rounded-full bg-[#009865] animate-ping opacity-20 group-hover:opacity-40" />
        {isOpen ? <ChevronLeft className="w-8 h-8" /> : <Sparkles className="w-8 h-8" />}
      </motion.button>
    </div>
  );
}
