import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, Sparkles, ChevronLeft, Trash2, Mail } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AICopilotProps {
  theme?: 'light' | 'dark';
  isConsultant?: boolean;
}

export default function AICopilot({ theme = 'light', isConsultant = false }: AICopilotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialText = isConsultant 
        ? "Olá, Consultor! Estou aqui para ajudar você a gerir seus leads e otimizar suas vendas de energia. Como posso ajudar hoje?"
        : "Olá! Sou o assistente da EcoEnergiza. Posso te ajudar a entender seu consumo, contratar geração de energia ou tirar dúvidas sobre o app. O que você precisa?";
      
      setMessages([{ 
        id: '1', 
        text: initialText, 
        sender: 'ai', 
        timestamp: new Date() 
      }]);
    }
  }, [isOpen, isConsultant]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput("");

    setTimeout(() => {
      let response = "Desculpe, ainda estou aprendendo sobre isso. Pode tentar perguntar de outra forma?";
      const lowerInput = currentInput.toLowerCase();
      
      if (lowerInput.includes('consultor')) {
        response = "Para se tornar um consultor EcoEnergiza, você pode acessar a aba 'Seja Consultor' no seu dashboard. Lá explicamos todas as fases e benefícios! [Clique aqui para ir para Consultor]";
      } else if (lowerInput.includes('consumo') || lowerInput.includes('casa')) {
        response = "Você pode ver o consumo da sua casa clicando no card 'Consumo da Casa' no início do seu dashboard. Se o saldo estiver embaçado, você precisará adquirir um Smart Meter. [Ver Consumo]";
      } else if (lowerInput.includes('geração') || lowerInput.includes('usina') || lowerInput.includes('contratar')) {
        response = "Para contratar geração de energia, clique em 'Geração de Energia' no dashboard. Você poderá simular quantos kW precisa e ver um orçamento detalhado na hora! [Contratar Geração]";
      } else if (lowerInput.includes('moeda') || lowerInput.includes('eco')) {
        response = "As moedas ECO são nosso programa de recompensas. Você pode ver seu saldo e histórico clicando no ícone da carteira no topo do app. [Minha Carteira]";
      } else if (isConsultant && (lowerInput.includes('lead') || lowerInput.includes('venda'))) {
        response = "Como consultor, você tem acesso a ferramentas exclusivas de CRM e materiais de marketing no seu painel administrativo. Como posso ajudar com seus leads hoje?";
      }

      const aiMsg: Message = { id: (Date.now() + 1).toString(), text: response, sender: 'ai', timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  const handleEndChat = (action: 'clear' | 'email') => {
    if (action === 'email') {
      alert("Relatório da conversa enviado para seu e-mail com sucesso!");
    }
    setMessages([{ id: '1', text: "Chat encerrado. Como posso ajudar novamente?", sender: 'ai', timestamp: new Date() }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-24 right-6 z-[200]" ref={containerRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`absolute bottom-20 right-0 w-[350px] h-[500px] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}
          >
            {/* Header */}
            <div className="p-6 bg-[#004e3a] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#009865] rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-black text-sm block leading-none">Copiloto EcoEnergiza</span>
                  <span className="text-[8px] font-bold opacity-60 uppercase tracking-widest">{isConsultant ? 'Modo Consultor' : 'Suporte Inteligente'}</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-xs font-bold ${
                    msg.sender === 'user' 
                      ? 'bg-[#009865] text-white rounded-tr-none' 
                      : (theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-[#004e3a]') + ' rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className={`px-6 py-2 flex gap-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-50'}`}>
              <button onClick={() => handleEndChat('clear')} className="text-[9px] font-black text-gray-400 hover:text-red-400 flex items-center gap-1 uppercase">
                <Trash2 className="w-3 h-3" /> Limpar
              </button>
              <button onClick={() => handleEndChat('email')} className="text-[9px] font-black text-gray-400 hover:text-[#009865] flex items-center gap-1 uppercase">
                <Mail className="w-3 h-3" /> Enviar p/ Email
              </button>
            </div>

            {/* Input */}
            <div className={`p-4 flex items-center gap-2 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <div className="flex-1 relative">
                <textarea 
                  rows={input.length > 30 ? 2 : 1}
                  value={input} 
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                  placeholder="Digite sua dúvida..." 
                  className={`w-full border-none rounded-xl px-4 py-3 text-xs font-bold outline-none resize-none ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
                />
              </div>
              <button onClick={handleSend} className="p-3 bg-[#009865] text-white rounded-xl shadow-lg active:scale-90 transition-transform">
                <Send className="w-4 h-4" />
              </button>
            </div>
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
