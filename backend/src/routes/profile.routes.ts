import { Router } from "express";
import { getProfile, getProfilePhoto, uploadProfilePhoto } from "../controllers/profile.controller";

export const profileRouter = Router();

profileRouter.get("/", getProfile);
profileRouter.get("/photo", getProfilePhoto);
profileRouter.post("/photo", uploadProfilePhoto);

