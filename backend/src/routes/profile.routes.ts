import { Router } from "express";
import {
	getProfile,
	getProfilePhoto,
	uploadProfilePhoto,
	getResume,
	uploadResume
} from "../controllers/profile.controller";

export const profileRouter = Router();

profileRouter.get("/", getProfile);
profileRouter.get("/photo", getProfilePhoto);
profileRouter.post("/photo", uploadProfilePhoto);
profileRouter.get("/resume", getResume);
profileRouter.post("/resume", uploadResume);

