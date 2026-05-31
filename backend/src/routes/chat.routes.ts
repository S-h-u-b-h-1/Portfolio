import { Router } from "express";
import { createChatResponseController } from "../controllers/chat.controller";

export const chatRouter = Router();

chatRouter.post("/", createChatResponseController);

