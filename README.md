# 🌿 EcoEnergiza - Plataforma de Energia Inteligente

Bem-vindo à documentação oficial da **EcoEnergiza**. Este documento foi estruturado para facilitar o entendimento do fluxo de trabalho, regras de negócio e arquitetura tanto para desenvolvedores Front-end quanto Back-end.

---

## 🗺️ Mapa de Navegação

### 1. [Landing Page (Pública)](./client/src/pages/Home.tsx)
- **Home Desktop:** Layout limpo, sem divisões, com foco em conversão.
- **Modais de Acesso:**
  - `Comece Agora`: Fluxo de cadastro via e-mail e código.
  - `Acessar Conta`: Login via e-mail/senha ou código.
- **Soluções:** Seção detalhada com as dores e soluções da EcoEnergiza.

### 2. [Dashboard do Usuário](./client/src/components/dashboard/MainDashboard.tsx)
- **Animações Dinâmicas:** 
  - `Geração`: Sol pulsante e placas solares.
  - `Consumo`: Casa com monitoramento e barra de progresso de instalação.
  - `Usina Particular`: Gestão de equipamentos de terceiros.
  - `Renda Extra`: Atalho para o programa de consultores.
- **Navbar:** Bordas arredondadas e saldos de energia/ECO Moedas lado a lado.
- **Footer Interativo:** Sistema de "gaveta" para personalização de ícones em tempo real.

### 3. [Portal do Consultor & CRM](./client/src/components/dashboard/MainDashboard.tsx)
- **Dashboard de Performance:** Métricas de leads, conversão e comissões.
- **CRM de Leads:** Gestão completa de funil de vendas.
- **Agenda Inteligente:** Controle diário de atividades sincronizado com o CRM.

### 4. [Painel Administrativo (ADM)](./client/src/components/dashboard/MainDashboard.tsx)
- **Acesso Restrito:** E-mail `adm@adm.com` / Senha `0000`.
- **Funcionalidades:** Edição de textos, gestão global de leads e configurações do sistema.

---

## ⚙️ Regras de Negócio & Funcionalidades

### 📊 Calculadora Solar Inteligente
Implementada com base na lógica `calc3.js`, permitindo orçamentos precisos com:
- Dimensionamento de kW necessário.
- Quantidade de placas e inversores.
- Payback estimado e economia mensal.
- Integração com checkout (Pix, Cartão, Financiamento Santander).

### 🤖 Copiloto IA (Sol)
Assistente virtual com contexto completo da plataforma:
- **Fluxo de Atendimento:** Início amigável -> Suporte técnico -> Encerramento com envio de log por e-mail -> Avaliação.

### 📱 Experiência Mobile (PWA)
A plataforma está configurada como **Progressive Web App**:
- Suporte a "Adicionar à Tela de Início".
- Experiência fluida em dispositivos móveis.
- Carregamento otimizado.

---

## 🛠️ Guia para Desenvolvedores

### Front-end (React + Tailwind)
- **Componentes:** Localizados em `client/src/components`.
- **Estilização:** Tailwind CSS com suporte a Dark Mode.
- **Animações:** Framer Motion para transições suaves e estados dinâmicos.

### Back-end (Sugestões de Integração)
- **Endpoints Necessários:**
  - `POST /auth/send-code`: Envio de código de verificação.
  - `GET /user/balance`: Recuperação de saldos de energia e moedas.
  - `POST /leads/schedule`: Sincronização de leads com a agenda.
  - `GET /admin/content`: Recuperação de textos editáveis do dashboard.

---

## 🚀 Como Executar Localmente

1. Clone o repositório: `git clone <url-do-repo>`
2. Instale as dependências: `npm install`
3. Inicie o servidor de desenvolvimento: `npm run dev`

---

*Documento gerado automaticamente para garantir a sincronia entre as equipes de design e engenharia.*
