// src/routes.ts
import { Router } from "express";
import {
  createSession,
  listSessions,
  getSessionById,
  updateSession,
  deleteSession,
} from "./controllers/session.js";
import { getQuestionByCategory } from "./controllers/question.js";
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
router.post("/sessions/start", createSession); //Kvar som alias för att inte skapa problem under dev
router.get("/sessions/:id", getSessionById);
router.put("/sessions/:id", updateSession);
router.delete("/sessions/:id", deleteSession);
router.get("/questions/category/:category", getQuestionByCategory);
export default router;
