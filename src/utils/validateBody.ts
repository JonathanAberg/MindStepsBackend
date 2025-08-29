import { CreateSession } from "../types/sessionProps";

export function validateSessionInput(
  props: CreateSession
): { error: string } | null {
  const { steps, answer, deviceId, time } = props;

  if (typeof steps !== "number" || steps < 0) {
    return { error: "Invalid steps" };
  }

  if (typeof time !== "number" || time < 0) {
    return { error: "Invalid time" };
  }

  if (!["Bra", "Okej", "Dåligt"].includes(answer)) {
    return { error: "Invalid answer" };
  }

  if (!deviceId || typeof deviceId !== "string") {
    return { error: "Invalid or missing deviceId" };
  }
  return null;
}
