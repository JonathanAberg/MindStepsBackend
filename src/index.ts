
import dotenv from "dotenv";
import app from "./app.js";
import mongoose from "mongoose";
dotenv.config();
const port = process.env.PORT || 3000;


// Entry point for the application
async function startServer() {
    try {
     await mongoose.connect(process.env.MONGODB_URI || "");
     console.log("✅ Connected to MongoDB Atlas");

	app.listen(port, () => {
		console.log(`🚀 Server running on http://localhost:${port}`);
	});
    } catch (err) {
    console.error('❌ Server failed to start:', err);

    }
	
}
startServer();
