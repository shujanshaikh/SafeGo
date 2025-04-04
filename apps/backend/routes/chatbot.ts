import { Router } from "express";

export const chatbotRouter = Router();

chatbotRouter.post("/chat", async (req, res) => {
   try {
    const prompt = req.body.prompt;
   } catch (error) {
    
   }

});