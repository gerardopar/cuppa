import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

export { client as openAiClient };
