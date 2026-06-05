import type { Request, Response } from "express";
import profile from "../data/profile.json";
import { prisma } from "../utils/prisma";

export function getProfile(_req: Request, res: Response) {
  res.json(profile);
}

export async function getProfilePhoto(_req: Request, res: Response) {
  try {
    const photo = await prisma.profilePhoto.findFirst({ orderBy: { createdAt: "desc" } });

    if (!photo) {
      // No photo in DB — return JSON hint with current static src
      res.status(404).json({ message: "No profile photo in database.", fallback: profile.photo?.src ?? null });
      return;
    }

    res.setHeader("Content-Type", photo.mime);
    res.setHeader("Content-Disposition", `inline; filename="${photo.filename}"`);
    res.send(photo.data as Buffer);
  } catch (error) {
    console.error("Error fetching profile photo:", error);
    res.status(500).json({ message: "Unable to load profile photo from database." });
  }
}

export async function uploadProfilePhoto(req: Request, res: Response) {
  try {
    const key = process.env.PROFILE_UPLOAD_KEY;
    const provided = req.get("x-profile-upload-key");

    if (!key || key === "" || provided !== key) {
      res.status(401).json({ message: "Unauthorized to upload profile photo." });
      return;
    }

    const { filename, mime, dataBase64 } = req.body ?? {};

    if (!filename || !mime || !dataBase64) {
      res.status(400).json({ message: "filename, mime, and dataBase64 are required." });
      return;
    }

    const buffer = Buffer.from(dataBase64, "base64");

    const created = await prisma.profilePhoto.create({
      data: {
        filename,
        mime,
        data: buffer
      }
    });

    res.status(201).json({ success: true, id: created.id });
  } catch (error) {
    console.error("Error uploading profile photo:", error);
    res.status(500).json({ message: "Unable to upload profile photo." });
  }
}

