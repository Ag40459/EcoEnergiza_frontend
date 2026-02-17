import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar as CalendarIcon, 
  Users, 
  Target, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  MapPin,
  Search,
  Zap,
  Star
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";

// Mock de dados para os leads disponíveis
const LEADS_DISPONIVEIS = [
  { id: 1, nome: "João Silva", bairro: "Itaim Bibi", tipo: "Residencial", economia: "R$ 450/mês", score: 95 },
  { id: 2, nome: "Maria Oliveira", bairro: "Vila Mariana", tipo: "Comercial", economia: "R$ 1.200/mês", score: 88 },
  { id: 3, nome: "Carlos Souza", bairro: "Pinheiros", tipo: "Residencial", economia: "R$ 380/mês", score: 92 },
  { id: 4, nome: "Padaria Delícia", bairro: "Moema", tipo: "Comercial", economia: "R$ 2.500/mês", score: 98 },
];

// Mock de compromissos do dia
const COMPROMISSOS = [
  { id: 101, hora: "09:30", titulo: "Reunião com Sr. Ricardo", local: "Café da Esquina", status: "pendente" },
  { id: 102, hora: "14:00", titulo: "Visita Técnica: Condomínio Solar", local: "Av. Paulista, 1000", status: "confirmado" },
];

const FRASES_MOTIVACIONAIS = [
  "Bom dia! Hoje é um ótimo dia para bater sua meta de economia.",
  "Cada lead é uma oportunidade de transformar o planeta e seu bolso.",
  "Foco no objetivo: faltam apenas 3 contratos para sua bonificação!",
  "A energia que você coloca no trabalho hoje é o lucro de amanhã."
];

export default function Dashboard() {
  const [frase, setFrase] = useState("");
  const [meusLeads, setMeusLeads] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  useEffect(() => {
    setFrase(FRASES_MOTIVACIONAIS[Math.floor(Math.random() * FRASES_MOTIVACIONAIS.length)]);
  }, []);

  const assumirLead = (id: number) => {
    setMeusLeads([...meusLeads, id]);
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] flex flex-col overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1 pt-24 px-6 lg:px-12 max-w-7xl mx-auto w-full pb-12">
        {/* Header Motivacional */}
        <header className="mb-10">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div>
              <h1 className="text-3xl font-bold text-[#004e3a] mb-2">Olá, Consultor! 👋</h1>
              <p className="text-[#006044] opacity-80 font-medium italic">"{frase}"</p>
            </div>
            
            {/* Mini Calendário */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-2">
              {[selectedDate - 2, selectedDate - 1, selectedDate, selectedDate + 1, selectedDate + 2].map((dia) => (
                <button 
                  key={dia}
                  onClick={() => setSelectedDate(dia)}
                  className={`w-10 h-14 rounded-xl flex flex-col items-center justify-center transition-all ${
                    dia === selectedDate ? "bg-[#009865] text-white shadow-lg" : "bg-gray-50 text-[#004e3a] hover:bg-gray-100"
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold opacity-60">
                    {dia === selectedDate ? "Hoje" : "Dia"}
                  </span>
                  <span className="text-lg font-bold">{dia}</span>
                  {dia === selectedDate && <div className="w-1 h-1 bg-white rounded-full mt-1"></div>}
                  {dia === selectedDate + 1 && <div className="w-1 h-1 bg-[#009865] rounded-full mt-1"></div>}
                </button>
              ))}
              <button className="w-10 h-14 flex items-center justify-center text-[#009865]">
                <CalendarIcon className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna da Esquerda: Compromissos e Metas */}
          <div className="lg:col-span-1 space-y-8">
            {/* Card de Metas */}
            <section className="bg-gradient-to-br from-[#004e3a] to-[#009865] p-6 rounded-[2rem] text-white shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <Target className="w-8 h-8 opacity-80" />
                <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">Nível Prata</span>
              </div>
              <p className="text-sm opacity-80 mb-1">Meta Mensal</p>
              <h3 className="text-2xl font-bold mb-4">R$ 12.500,00 / R$ 20k</h3>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "62.5%" }}
                  className="h-full bg-white"
                />
              </div>
              <p className="text-[10px] mt-4 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> 15% a mais que o mês passado
              </p>
            </section>

            {/* Compromissos do Dia */}
            <section>
              <h2 className="text-lg font-bold text-[#004e3a] mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" /> Compromissos de Hoje
              </h2>
              <div className="space-y-4">
                {COMPROMISSOS.map((comp) => (
                  <div key={comp.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex gap-4 hover:shadow-md transition-all">
                    <div className="font-bold text-[#009865] border-r pr-4 border-gray-100 flex flex-col justify-center">
                      {comp.hora}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-[#004e3a]">{comp.titulo}</h4>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" /> {comp.local}
                      </p>
                    </div>
                    {comp.status === "confirmado" && <CheckCircle2 className="w-5 h-5 text-green-500 self-center" />}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Coluna da Direita: Radar de Leads */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#004e3a] flex items-center gap-2">
                <Zap className="w-6 h-6 text-[#009865]" /> Radar de Leads Disponíveis
              </h2>
              <button className="text-sm font-bold text-[#009865] flex items-center gap-1">
                Ver todos <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {LEADS_DISPONIVEIS.filter(l => !meusLeads.includes(l.id)).map((lead) => (
                  <motion.div 
                    key={lead.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 bg-[#009865]/10 px-4 py-1 rounded-bl-2xl text-[#009865] text-[10px] font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#009865]" /> {lead.score}% Match
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-[#004e3a]">{lead.nome}</h3>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {lead.bairro} • {lead.tipo}
                      </p>
                    </div>

                    <div className="bg-[#f0faf5] p-3 rounded-xl mb-6">
                      <p className="text-[10px] text-[#006044] opacity-70">Potencial de Economia</p>
                      <p className="text-lg font-bold text-[#009865]">{lead.economia}</p>
                    </div>

                    <button 
                      onClick={() => assumirLead(lead.id)}
                      className="w-full py-3 rounded-xl bg-[#004e3a] text-white text-sm font-bold flex items-center justify-center gap-2 group-hover:bg-[#009865] transition-all"
                    >
                      Assumir Lead <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State se todos os leads forem pegos */}
            {meusLeads.length === LEADS_DISPONIVEIS.length && (
              <div className="bg-white p-12 rounded-[2rem] border-2 border-dashed border-gray-100 text-center">
                <div className="w-16 h-16 bg-[#f0faf5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#009865]" />
                </div>
                <h3 className="text-lg font-bold text-[#004e3a]">Todos os leads foram assumidos!</h3>
                <p className="text-sm text-gray-400 mt-2">Aguarde novos leads ou foque nos seus compromissos agendados.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Botão Flutuante de Ajuda/Lead Rápido */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#009865] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50">
        <Search className="w-6 h-6" />
      </button>
    </div>
  );
}
