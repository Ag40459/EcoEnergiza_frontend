import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// Configuração do transportador Zoho
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "no-reply@ecolote.com.br",
    pass: "Ikg3g!gx",
  },
});

// Cache temporário para códigos (em produção usar Redis ou DB)
const codesCache = new Map<string, string>();

router.post("/send-code", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "E-mail é obrigatório" });
  }

  try {
    // Gerar código de 4 dígitos
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    codesCache.set(email, code);

    // Configuração do e-mail
    const mailOptions = {
      from: '"EcoEnergiza" <no-reply@ecolote.com.br>',
      to: email,
      subject: "Seu código de acesso EcoEnergiza",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; rounded: 10px;">
          <h2 style="color: #004e3a; text-align: center;">EcoEnergiza</h2>
          <p>Olá!</p>
          <p>Seu código de acesso instantâneo é:</p>
          <div style="background: #f4fbf8; padding: 20px; text-align: center; border-radius: 10px; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #009865;">${code}</span>
          </div>
          <p style="font-size: 12px; color: #666;">Se você não solicitou este código, ignore este e-mail.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 10px; color: #999; text-align: center;">© 2026 EcoEnergiza - O Ecossistema Energético Digital</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Código ${code} enviado para ${email}`);

    res.status(200).json({ 
      success: true, 
      message: "Código enviado com sucesso via Zoho" 
    });
  } catch (error) {
    console.error("Erro ao enviar e-mail via Zoho:", error);
    res.status(500).json({ message: "Erro ao processar envio de e-mail. Verifique as credenciais do Zoho." });
  }
});

router.post("/verify-code", async (req, res) => {
  const { email, code } = req.body;
  const storedCode = codesCache.get(email);

  if (storedCode && storedCode === code) {
    codesCache.delete(email);
    // Aqui geraria um JWT em um cenário real
    return res.status(200).json({ success: true, message: "Acesso autorizado" });
  }

  res.status(401).json({ success: false, message: "Código inválido ou expirado" });
});

export default router;
