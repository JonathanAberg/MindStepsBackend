import express from "express";
import cors from "cors";
import router from "./routes";


// Middleware setup
const app = express();

app.use(cors({ origin: "*", methods: ["GET","POST","PUT","DELETE","PATCH"], credentials: true }));
app.use(express.json());
app.use(router);

export default app;
