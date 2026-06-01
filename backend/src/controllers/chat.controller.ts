import type { NextFunction, Request, Response } from "express";
import { createChatResponse } from "../services/chat.service";

export async function createChatResponseController(req: Request, res: Response, next: NextFunction) {
  try {
    const rawMessage = req.body?.message ?? req.body?.question;

    if (typeof rawMessage !== "string" || rawMessage.trim().length === 0) {
      res.status(400).json({ error: "Message is required." });
      return;
    }

    const message = rawMessage.trim();

    if (message.length > 1000) {
      res.status(400).json({ error: "Message must be 1000 characters or fewer." });
      return;
    }

    const response = await createChatResponse(message);
    res.json(response);
  } catch (error) {
    next(error);
  }
}
