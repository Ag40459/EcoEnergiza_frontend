import express from "express";

const router = express.Router();

// Esta rota será chamada pelo frontend para enviar o código
router.post("/send-code", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "E-mail é obrigatório" });
  }

  try {
    // Aqui implementaremos a lógica real com as credenciais que você fornecer
    // Exemplo de como funcionará:
    // 1. Gerar código de 4 dígitos
    // 2. Usar SMTP ou API de e-mail institucional
    // 3. Enviar e-mail para o usuário
    
    console.log(`Simulando envio de código para: ${email}`);
    
    // Por enquanto, devolvemos sucesso para o frontend continuar o fluxo
    res.status(200).json({ 
      success: true, 
      message: "Código enviado com sucesso (Simulação)" 
    });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).json({ message: "Erro ao processar envio de e-mail" });
  }
});

export default router;
