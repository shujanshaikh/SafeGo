import prisma from "@repo/db";
import { Router } from "express";
import Groq from "groq-sdk";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.mjs";
import { middleware } from "../middleware";
import { SAFETY_PROMPT } from "../prompts/safetyprompts";

export const chatbotRouter = Router();
const groq = new Groq({ apiKey: Bun.env.GROQ_API_KEY });

chatbotRouter.post("/chat", async (req, res) => {

    try {
        const userId = req.userId!;
        const prompt = req.body.prompt;
        if (!prompt) {
            res.status(400).json({
                message: "Invalid Data"
            })
            return
        }
        await prisma.messages.create({
            data: {
                message: prompt,
                role: "USER",
                userId
            }
        })

        const previousMessages = await prisma.messages.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: "asc"
            }
        })
        
        const convo: ChatCompletionMessageParam[] = [
            { role: "system", content: SAFETY_PROMPT },
            ...previousMessages.map((p: any) => ({
                role: p.role.toLowerCase() as "user" | "assistant" | "system",
                content: p.message || ""
            })),
            { role: "user", content: prompt }
        ]

        const response = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: convo
        })

        const assistantMessage = response.choices[0].message.content;


        await prisma.messages.create({
            data: {
                message: assistantMessage!,
                role: "SYSTEM",
                userId
            }
        })
        res.json({ message: assistantMessage! });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

});