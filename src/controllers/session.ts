import { Request, Response } from "express";
import { Session } from "../models/Session.js";
import { validateSessionInput } from "../utils/validateBody.js";

export async function createSession(req: Request, res: Response) {
  console.log("[createSession] Incoming body:", req.body);
  const { steps, answer, reflection, deviceId, time, date } = req.body || {};

  const validationError = validateSessionInput({ steps, answer, reflection, time, deviceId });
  if (validationError?.error) {
    console.warn("[createSession] Validation failed:", validationError.error);
    return res.status(400).json({ error: validationError.error });
  }

  try {
    const payload = {
      steps,
      answer,
      reflection,
      deviceId,
      time,
      date: date ? new Date(date) : new Date(),
    };
    console.log("[createSession] Creating with payload:", payload);
    const doc = await Session.create(payload);
    console.log("[createSession] Created session _id=", doc._id);
    return res.status(201).json(doc);
  } catch (err: any) {
    if (err?.code === 11000) {
      console.error("[createSession] Duplicate key error:", err?.keyValue);
      return res.status(409).json({ error: "Duplicate key (remove unique index on deviceId if unintended)", key: err?.keyValue });
    }
    if (err?.name === "ValidationError") {
      console.error("[createSession] Mongoose validation error:", err?.errors);
      return res.status(400).json({ error: "Schema validation failed", details: Object.keys(err.errors || {}) });
    }
    console.error("[createSession] Unhandled error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function listSessions(req: Request, res: Response) {
  const { deviceId } = req.query;
  console.log("[listSessions] Fetching sessions for deviceId:", deviceId);

  if (!deviceId || typeof deviceId !== "string") {
    console.error("[listSessions] Invalid or missing deviceId:", deviceId);
    return res.status(400).json({ error: "Invalid or missing deviceId" });
  }
  console.log(typeof deviceId, deviceId);
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
  const { steps, answer, reflection, date, time } = req.body;
  console.log("[updateSession] Update request id=", id, "body=", req.body);

  const update: any = {};
  if (typeof steps === "number") update.steps = steps;
  if (typeof time === "number") update.time = time;
  if (answer) update.answer = answer;
  if (reflection !== undefined) update.reflection = reflection;
  if (date) update.date = new Date(date);

  try {
    const updatedSession = await Session.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).lean();
    if (!updatedSession) {
      console.warn("[updateSession] Not found id=", id);
      return res.status(404).json({ error: "Session not found" });
    }
    console.log("[updateSession] Updated _id=", updatedSession._id);
    return res.json(updatedSession);
  } catch (err) {
    console.error("[updateSession] Error:", err);
    return res.status(500).json({ error: "Internal server error" });
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
