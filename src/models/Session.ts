import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true, index: true },
    steps: { type: Number, required: true, min: 0 },
    answer: { type: String, required: true, enum: ["Bra", "Okej", "Dåligt"] },
    reflection: {type: String, required: false},
    time: { type: Number, required: true, min: 0 },
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
