import express from "express";
import { weatherRouter } from "./routes/weather";
import cors from "cors";
import { crimeRateRouter } from "./routes/crimerate";
import { chatbotRouter } from "./routes/chatbot";
import { authRouter } from "./routes/auth";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", weatherRouter);
app.use("/api/v1", crimeRateRouter);
app.use("/api/v1", chatbotRouter);
app.use("/api/v1", authRouter);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});