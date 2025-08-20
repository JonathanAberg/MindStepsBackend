import { Request, Response } from "express";
import { Session } from "../models/Session.js";

export async function createSession(req: Request, res: Response) {
  const { steps, answer, date } = req.body || {};

  console.log(req.body);
  if (typeof steps !== "number" || steps < 0) return res.status(400).json({ error: "invalid steps" });
  if (!["Bra", "Okej", "Dåligt"].includes(answer)) return res.status(400).json({ error: "invalid answer" });
  const doc = await Session.create({ steps, answer, date });
  res.status(201).json(doc);
}

export async function listSessions(_req: Request, res: Response) {
  const docs = await Session.find().sort({ date: -1 }).lean();
  res.json(docs);
}
