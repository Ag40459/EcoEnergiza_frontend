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
  const [isMobileInputOpen, setIsMobileInputOpen] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsMobileInputOpen(false);
        // O estado 'input' é mantido, preservando o que foi digitado
      }
    };

    if (isOpen || isMobileInputOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isMobileInputOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    
    if (isMobileInputOpen) {
      setIsMobileInputOpen(false);
      setIsOpen(true);
    }

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
    setShowEvaluation(true);
  };

  const submitEvaluation = () => {
    setMessages([{ role: 'ai', text: 'Atendimento encerrado. Como posso te ajudar agora?' }]);
    setShowEvaluation(false);
    setRating(0);
    setComment('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-24 right-6 z-[9999] flex items-center justify-end" ref={containerRef}>
      {/* Mobile Input Expansion */}
      <AnimatePresence>
        {isMobileInputOpen && (
          <motion.div
            initial={{ width: 64, opacity: 0, x: 0 }}
            animate={{ width: 'calc(100vw - 48px)', opacity: 1, x: 0 }}
            exit={{ width: 64, opacity: 0, x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden absolute right-0 flex items-center bg-white dark:bg-gray-900 rounded-full shadow-2xl border border-[#009865]/20 overflow-hidden h-16"
          >
            {/* Input Field */}
            <input
              autoFocus
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
	              placeholder="Como Posso Te Ajudar?"
	              className="flex-1 bg-transparent border-none outline-none pl-16 pr-16 py-3 text-sm font-bold text-[#004e3a] dark:text-white placeholder:text-gray-400"
	            />
            
            {/* Send Button (at the original position of the icon) */}
            <button
              onClick={handleSend}
              className="absolute right-2 w-12 h-12 bg-[#009865] text-white rounded-full flex items-center justify-center shadow-lg"
            >
              <Send className="w-5 h-5" />
            </button>

            {/* Attendant Profile (moving to the left) */}
            <motion.div 
              initial={{ x: 0 }}
              animate={{ x: 'calc(-100vw + 108px)' }}
              exit={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-2 w-12 h-12 rounded-full bg-[#009865] border-2 border-white dark:border-gray-800 shadow-lg overflow-hidden flex items-center justify-center"
            >
              <img src="https://i.pravatar.cc/100?img=12" alt="Atendente" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
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
            {/* Header */}
            <div 
              onPointerDown={(e) => dragControls.start(e)}
              className={`p-6 flex items-center justify-between cursor-grab active:cursor-grabbing ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#009865] flex items-center justify-center text-white">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-sm font-black ${theme === 'dark' ? 'text-white' : 'text-[#004e3a]'}`}>Sol Copilot</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Online Agora</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleEndSession} 
                  className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline"
                >
                  Finalizar Chat
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-medium shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#009865] text-white rounded-tr-none' 
                      : theme === 'dark' ? 'bg-gray-800 text-gray-200 rounded-tl-none' : 'bg-gray-100 text-[#004e3a] rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className={`p-6 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
              <div className={`flex items-center gap-2 p-2 rounded-[1.5rem] ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Pergunte qualquer coisa..."
                  className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-sm font-bold"
                />
                <button 
                  onClick={handleSend}
                  className="w-10 h-10 bg-[#009865] text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Evaluation Overlay */}
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

      {/* Main Copilot Button */}
      {!isMobileInputOpen && (
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (window.innerWidth < 768) {
              if (isOpen) {
                setIsOpen(false);
              } else {
                setIsMobileInputOpen(true);
              }
            } else {
              setIsOpen(!isOpen);
            }
          }}
          className="w-16 h-16 bg-[#009865] rounded-full flex items-center justify-center text-white shadow-2xl relative group shrink-0"
        >
          <div className="absolute inset-0 rounded-full bg-[#009865] animate-ping opacity-20 group-hover:opacity-40" />
          {isOpen ? <X className="w-8 h-8" /> : <Sparkles className="w-8 h-8" />}
        </motion.button>
      )}
    </div>
  );
}
