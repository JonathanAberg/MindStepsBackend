// src/routes.ts
import { Router } from "express";
import { createSession, listSessions } from "./controllers/session.js";
import { getQuestionByCategory } from "./controllers/question.js";
const router = Router();


// We define routes here with a handler function for each route
router.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

router.get("/health", (req,res)=> {
   res.json({ ok: true, status: "up" });
});

router.get("/questions/:category", getQuestionByCategory);  

router.get("/session", listSessions);
router.post("/session", createSession);

export default router;
