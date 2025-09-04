export type CreateSession = {
  time: number; // seconds (numeric)
  steps: number;
  answer: string; // "Bra" | "Okej" | "Dåligt"
  deviceId: string;
};
