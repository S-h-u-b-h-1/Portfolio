import type { NextFunction, Request, Response } from "express";
import { createChatResponse } from "../services/chat.service";
import { requiredString } from "../utils/validation";

export async function createChatResponseController(req: Request, res: Response, next: NextFunction) {
  try {
    const question = requiredString(req.body?.question, "question", { max: 1000 });
    const response = await createChatResponse(question);
    res.json(response);
  } catch (error) {
    next(error);
  }
}
