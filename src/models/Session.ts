import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true, index: true },
    steps: { type: Number, default: 0, min: 0 },
    answer: { type: String, enum: ["Bra", "Okej", "Dåligt"], default: "Okej" },
    reflection: {type: String },
    time: { type: Number, default: 0, min: 0 },
    date: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export type SessionDoc = {
  _id: mongoose.Types.ObjectId;
  deviceId: string;
  steps: number;
  answer: "Bra" | "Okej" | "Dåligt";
  reflection?: string;
  time: number;
  date: Date;
};

export const Session = mongoose.model<SessionDoc>("sessions", SessionSchema);
