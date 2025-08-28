import { Request, Response } from "express";
import { Session } from "../models/Session.js";
import { validateSessionInput } from "../utils/validateBody.js";
export async function createSession(req: Request, res: Response) {
  console.log("[createSession] Request body:", req.body);
  const { steps, answer, date, deviceId, time } = req.body || {};

  const validationError = validateSessionInput({
    steps,
    answer,
    time,
    deviceId,
  });
  try {
    const doc = await Session.create({ steps, answer, date, deviceId });
    console.log("[createSession] Session created:", doc);
    res.status(201).json(doc);
  } catch (error) {
    console.error("[createSession] Error creating session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function listSessions(req: Request, res: Response) {
  const { deviceId } = req.query;
  console.log("[listSessions] Fetching sessions for deviceId:", deviceId);

  if (!deviceId || typeof deviceId !== "string") {
    console.error("[listSessions] Invalid or missing deviceId:", deviceId);
    return res.status(400).json({ error: "Invalid or missing deviceId" });
  }

  try {
    const docs = await Session.find({ deviceId }).sort({ date: -1 }).lean();
    console.log("[listSessions] Sessions fetched:", docs);
    res.json(docs);
  } catch (error) {
    console.error("[listSessions] Error fetching sessions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getSessionById(req: Request, res: Response) {
  const { id } = req.params;
  console.log("[getSessionById] Fetching session with ID:", id);
  try {
    const session = await Session.findById(id).lean();
    if (!session) {
      console.warn("[getSessionById] Session not found:", id);
      return res.status(404).json({ error: "Session not found" });
    }
    console.log("[getSessionById] Session fetched:", session);
    res.json(session);
  } catch (error) {
    console.error("[getSessionById] Error fetching session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateSession(req: Request, res: Response) {
  const { id } = req.params;
  const { steps, answer, date } = req.body;
  console.log(
    "[updateSession] Updating session with ID:",
    id,
    "Data:",
    req.body
  );
  try {
    const updatedSession = await Session.findByIdAndUpdate(
      id,
      { steps, answer, date },
      { new: true, runValidators: true }
    ).lean();
    if (!updatedSession) {
      console.warn("[updateSession] Session not found:", id);
      return res.status(404).json({ error: "Session not found" });
    }
    console.log("[updateSession] Session updated:", updatedSession);
    res.json(updatedSession);
  } catch (error) {
    console.error("[updateSession] Error updating session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteSession(req: Request, res: Response) {
  const { id } = req.params;
  console.log("[deleteSession] Deleting session with ID:", id);
  try {
    const deletedSession = await Session.findByIdAndDelete(id).lean();
    if (!deletedSession) {
      console.warn("[deleteSession] Session not found:", id);
      return res.status(404).json({ error: "Session not found" });
    }
    console.log("[deleteSession] Session deleted:", deletedSession);
    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("[deleteSession] Error deleting session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
