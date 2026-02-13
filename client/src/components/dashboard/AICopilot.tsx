import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Trash2, Mail, Sparkles, ChevronLeft, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AICopilot({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Olá! Sou seu Copiloto IA. Como posso ajudar com seus leads ou orçamentos hoje?", sender: 'ai', timestamp: new Date() }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Fechar ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulação de resposta da IA conforme as regras
    setTimeout(() => {
      let response = "Interessante! Estou analisando os dados para te dar a melhor resposta.";
      if (input.toLowerCase().includes("solar")) {
        response = "Aqui está um script para cliente comercial: 'Olá! Notei que sua empresa tem um custo fixo alto com energia. Sabia que a usina remota da Ecolote pode reduzir isso em até 30% sem investimento inicial?'";
      } else if (input.toLowerCase().includes("follow-up")) {
        response = "O João viu o orçamento há 2 dias. Recomendo um follow-up via WhatsApp agora!";
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
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <span className="font-black text-sm">Copiloto IA</span>
              </div>
              <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
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
                {input && (
                  <button onClick={() => setInput("")} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              <button onClick={handleSend} className="p-3 bg-[#009865] text-white rounded-xl shadow-lg">
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
