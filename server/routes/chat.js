import express from 'express';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Load portfolio data
const portfolioDataPath = path.join(__dirname, '..', 'portfolio_data.json');
const portfolioData = JSON.parse(fs.readFileSync(portfolioDataPath, 'utf8'));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
    baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
});

router.post('/', async (req, res) => {
    const { message } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are Abhibot, a professional and helpful assistant for Abhi's (Abhilash R) portfolio. 
                    Use the following portfolio data to answer questions accurately. 
                    If a user asks about something not in the data, be polite and say you don't have that specific information but can talk about Abhi's skills, projects, and education.
                    
                    Portfolio Data:
                    ${JSON.stringify(portfolioData, null, 2)}

                    Format your responses using Markdown. Use lists, code blocks, and bold text to make it structured and easy to read. 
                    Keep answers concise but informative.`
                },
                { role: "user", content: message }
            ],
            model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

export default router;
