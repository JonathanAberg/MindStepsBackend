import mongoose from "mongoose";

// Simple schema for a session (walking session)
const SessionSchema = new mongoose.Schema(
  {
    steps: { type: Number, required: true, min: 0 },
    answer: { type: String, required: true, enum: ["Bra", "Okej", "Dåligt"] },
    date: { type: Date, default: Date.now },
    deviceId: { type: String, required: true },
  },
  { versionKey: false }
);

export type SessionDoc = {
  _id: mongoose.Types.ObjectId;
  steps: number;
  answer: "Bra" | "Okej" | "Dåligt";
  date: Date;
  deviceId: string;
};

export const Session = mongoose.model<SessionDoc>("sessions", SessionSchema);
