# Brainstorm de Design - Landing Page EcoEnergiza

## Contexto
Landing page clean e moderna para apresentar a plataforma EcoEnergiza - ecossistema energético digital e inteligente. Foco em hero section com digitação animada, gradiente suave, modal de soluções e responsividade completa.

---

<response>
<idea>

## Abordagem 1: "Glassmorphism Verde"

**Design Movement**: Glassmorphism com tons naturais
**Core Principles**:
1. Transparência e profundidade com efeitos de vidro fosco
2. Paleta verde esmeralda com fundos translúcidos
3. Minimalismo extremo - apenas o essencial
4. Tipografia bold com contraste forte

**Color Philosophy**: Verde esmeralda (#009865) como cor de destaque, fundo branco/cinza muito claro (#f7f9f8), gradientes suaves de verde claro para branco. A cor verde transmite sustentabilidade e confiança.

**Layout Paradigm**: Layout assimétrico com hero ocupando 100vh. Texto à esquerda, mockup do app à direita. Sem scroll necessário para a ação principal.

**Signature Elements**:
1. Cards com efeito glassmorphism (backdrop-blur + borda translúcida)
2. Gradiente animado no fundo que transiciona entre tons de verde claro

**Interaction Philosophy**: Hover suave nos botões com scale, modal de soluções com backdrop blur

**Animation**: Digitação de texto com cursor piscante, gradiente de fundo transitando suavemente entre 3-4 tons de verde/branco

**Typography System**: Poppins Bold para títulos, Poppins Regular para corpo. Hierarquia clara com tamanhos 48px/24px/16px.

</idea>
<probability>0.08</probability>
<text>Abordagem glassmorphism com transparências e profundidade visual, usando verde esmeralda como destaque principal.</text>
</response>

<response>
<idea>

## Abordagem 2: "Clean Orgânico"

**Design Movement**: Design orgânico minimalista inspirado em natureza
**Core Principles**:
1. Espaços amplos e respiráveis
2. Formas suaves e orgânicas (bordas arredondadas generosas)
3. Paleta verde com acentos de cinza quente
4. Foco total no conteúdo textual animado

**Color Philosophy**: Fundo que transiciona suavemente entre verde menta (#e8f5e9), verde água (#e0f2f1), e branco neve (#fafafa). Verde escuro (#004e3a) para textos. Botão CTA em verde vibrante (#009865). As cores remetem à natureza e energia limpa.

**Layout Paradigm**: Layout centralizado vertical com hero full-height. Texto centralizado no topo, mockup do app centralizado abaixo. Em desktop: lado a lado com texto à esquerda.

**Signature Elements**:
1. Fundo com gradiente animado que muda de cor suavemente (ciclo de 8-10 segundos)
2. Texto digitado com cursor verde piscante

**Interaction Philosophy**: Transições suaves em tudo. Modal de soluções desliza de cima para baixo. Botões com hover que escurece levemente.

**Animation**: Efeito typewriter no texto principal com apagamento e reescrita. Fundo com gradiente radial que se move lentamente. Mockup do app com leve flutuação (float).

**Typography System**: DM Sans Bold para títulos, DM Sans Regular para corpo. Tamanhos 52px/20px/14px. Itálico para destaques.

</idea>
<probability>0.06</probability>
<text>Abordagem orgânica minimalista com foco em espaços amplos, cores naturais e animações suaves de digitação.</text>
</response>

<response>
<idea>

## Abordagem 3: "Flat Elegante"

**Design Movement**: Flat design moderno com toques de profundidade sutil
**Core Principles**:
1. Superfícies planas com sombras muito sutis
2. Hierarquia visual através de peso tipográfico
3. Cores sólidas sem gradientes complexos
4. Micro-interações precisas e elegantes

**Color Philosophy**: Fundo cinza claro (#f5f5f5) com seções em branco puro. Verde (#009865) apenas para CTAs e destaques pontuais. Texto em cinza escuro (#1a1a2e). Abordagem monocromática com verde como único acento.

**Layout Paradigm**: Grid assimétrico 60/40. Texto ocupa 60% à esquerda, mockup 40% à direita. Navbar minimalista com logo e poucos links.

**Signature Elements**:
1. Botão CTA com sombra verde sutil e hover com elevação
2. Navbar com blur no scroll

**Interaction Philosophy**: Precisão cirúrgica nas interações. Cada clique tem feedback visual imediato. Modal com overlay escuro e card centralizado.

**Animation**: Typewriter com velocidade variável (mais rápido em palavras comuns, mais lento em palavras-chave). Fundo com transição de cor sólida (sem gradiente, apenas fade entre cores).

**Typography System**: Plus Jakarta Sans Bold para títulos, Plus Jakarta Sans Regular para corpo. Tamanhos 56px/18px/14px.

</idea>
<probability>0.05</probability>
<text>Abordagem flat elegante com superfícies limpas, verde como único acento e micro-interações precisas.</text>
</response>

---

## Abordagem Escolhida: **Clean Orgânico (Abordagem 2)**

### Justificativa:
- Mais alinhada com o design atual da Ecolote (fundo verde claro, espaços amplos)
- O gradiente animado no fundo combina com a ideia de "fundo que muda de cor suavemente"
- DM Sans é uma fonte moderna e legível que funciona bem em português
- Layout flexível que funciona bem tanto em mobile quanto desktop
- Estilo clean que o usuário pediu explicitamente

### Design System Final:
- **Fonte**: DM Sans (Bold + Regular)
- **Cor Primária**: #009865 (verde esmeralda)
- **Cor Texto**: #004e3a (verde escuro)
- **Fundo Animado**: Ciclo entre #e8f5e9 → #e0f2f1 → #f1f8e9 → #fafafa
- **CTA**: #009865 com texto branco
- **Bordas**: 16px radius
- **Sombras**: Muito sutis (0 4px 20px rgba(0,0,0,0.06))
