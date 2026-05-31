import type { Request, Response } from "express";
import projects from "../data/projects.json";

export function getProjects(_req: Request, res: Response) {
  res.json(projects);
}

