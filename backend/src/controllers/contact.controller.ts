import type { NextFunction, Request, Response } from "express";
import { createContactMessage } from "../services/contact.service";
import { optionalString, requiredEmail, requiredString } from "../utils/validation";

export async function createContactMessageController(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, company, message, purpose } = req.body ?? {};

    const savedMessage = await createContactMessage({
      name: requiredString(name, "name", { max: 120 }),
      email: requiredEmail(email),
      company: optionalString(company, "company", { max: 160 }),
      purpose: requiredString(purpose, "purpose", { max: 120 }),
      message: requiredString(message, "message", { min: 10, max: 4000 })
    });

    res.status(201).json({
      success: true,
      id: savedMessage.id,
      message: "Message received."
    });
  } catch (error) {
    next(error);
  }
}
