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

    // Försök ta bort ev. kvarvarande unikt index på deviceId (om rättigheter finns)
    try {
      const db = mongoose.connection.db;
      if (!db) throw new Error("No DB handle available yet");
      const collection = db.collection("sessions");
      const indexes = await collection.indexes();
      const deviceIdx = indexes.find(
        (i: any) => i.key && i.key.deviceId === 1 && i.unique === true
      );
      if (deviceIdx) {
        console.log(
          "⚠️ Hittade fortfarande unikt index på deviceId. Försöker droppa:",
          deviceIdx.name
        );
        try {
          if (typeof deviceIdx.name === "string") {
            await collection.dropIndex(deviceIdx.name);
          } else {
            console.warn(
              "⚠️ Kunde inte identifiera index-namn (saknar name-fält). Skippa borttagning"
            );
          }
          console.log("✅ Tog bort unikt index på deviceId");
        } catch (dropErr: any) {
          console.warn(
            "⚠️ Kunde inte ta bort unikt index (saknar kanske rättigheter). Meddela DB-ägare att köra: db.sessions.dropIndex('" +
              deviceIdx.name +
              "')"
          );
        }
      } else {
        console.log("ℹ️ Inget unikt index på deviceId kvar (bra)");
      }
    } catch (idxErr) {
      console.warn(
        "⚠️ Index-koll misslyckades (ej kritiskt). Orsak:",
        (idxErr as Error).message
      );
    }

    app.listen(port, () => {
      console.log("Server running on http://0.0.0.0:3000");
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
  }
}
startServer();
