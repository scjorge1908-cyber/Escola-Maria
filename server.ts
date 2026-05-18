import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: AI Assistant for Maria Eduarda
  app.post("/api/assistant", async (req, res) => {
    try {
      const { message, context } = req.body;
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY!,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `Você é um tutor de matemática gentil e divertido para Maria Eduarda, uma menina de 8 anos.
      Ela está aprendendo: Ordem Crescente/Decrescente, Arredondamento, Regularidade, Mais/Menos (problemas interpretativos), Composição de Números e Sequência Numérica.
      
      Maria tem dificuldade de interpretação de texto, então use histórias simples e palavras acolhedoras.
      
      Contexto atual: ${context}
      Mensagem da Maria: ${message}
      
      Responda de forma curta, incentivadora e lúdica.`;

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });

      res.json({ response: result.text });
    } catch (error) {
      console.error("AI Error:", error);
      res.status(500).json({ error: "Erro ao falar com o assistente." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
