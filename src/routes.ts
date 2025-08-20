// src/routes.ts
import { Router } from "express";
import { createSession, listSessions } from "./controllers/session.js";

const router = Router();


// We define routes here with a handler function for each route
router.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

router.get("/health", (req,res)=> {
   res.json({ ok: true, status: "up" });
});


router.get("/session", listSessions);
router.post("/session", createSession);

export default router;
