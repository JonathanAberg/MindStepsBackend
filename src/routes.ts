// src/routes.ts
import { Router } from "express";
import {
  createSession,
  listSessions,
  getSessionById,
  updateSession,
  deleteSession,
} from "./controllers/session.js";

const router = Router();

// We define routes here with a handler function for each route
router.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

router.get("/health", (req, res) => {
  res.json({ ok: true, status: "up" });
});

// Add routes for session management
router.get("/sessions", listSessions);
router.post("/sessions", createSession);
router.get("/sessions/:id", getSessionById);
router.put("/sessions/:id", updateSession);
router.delete("/sessions/:id", deleteSession);


export default router;
