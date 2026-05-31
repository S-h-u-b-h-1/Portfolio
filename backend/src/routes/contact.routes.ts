import { Router } from "express";
import { createContactMessageController } from "../controllers/contact.controller";

export const contactRouter = Router();

contactRouter.post("/", createContactMessageController);

