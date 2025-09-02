import dotenv from "dotenv";
import app from "./app.js";
import mongoose from "mongoose";

dotenv.config();
const port = process.env.PORT || 3000;
const connectionString = process.env.MONGODB_URI;

// Entry point for the applicationdd
async function startServer() {
  try {
    if (!connectionString) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "MindSteps",
    });
    console.log("✅ Connected to MongoDB Atlas");

    app.listen(port, () => {
      console.log("Server running on http://0.0.0.0:3000");
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
  }
}
startServer();
