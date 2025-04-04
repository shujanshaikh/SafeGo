import { Router } from "express";
import { middleware } from "../middleware";
import { locationSchema } from "@repo/common";
import Groq from 'groq-sdk';
import { SYSTEM_PROMPT } from "../prompts/systemprompt";


export const crimeRateRouter = Router();
const groq = new Groq({ apiKey: Bun.env.GROQ_API_KEY });


crimeRateRouter.post("/crimerate", middleware, async (req, res) => {
    try {
        const parsedData = locationSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({
                message: "Invalid Data"
            })
            return
        }
        const userPrompt = `Give me an overview of the route from ${parsedData.data.locationA} to ${parsedData.data.locationB}, including crime risks or any important safety-related insights.`;

        const completion = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userPrompt },
          ],
        });
    
        const summary = completion.choices[0].message.content;
        res.json({ summary });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})