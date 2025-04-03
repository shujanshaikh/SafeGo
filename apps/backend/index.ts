import express from "express";
import { weatherRouter } from "./routes/weather";

const app = express();
app.use(express.json());

app.use("/api/v1", weatherRouter);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});