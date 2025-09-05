import { CreateSession } from "../types/sessionProps";

export function validateSessionInput(
  props: CreateSession
): { error: string } | null {
  const { steps, answer, reflection, deviceId, time } = props;

  if (steps !== undefined && (typeof steps !== "number" || steps < 0) ){
    return { error: "Invalid steps" };
  }

  if (time !== undefined && (typeof time !== "number" || time < 0)) {
    return { error: "Invalid time" };
  }

  if (answer !== undefined && (!["Bra", "Okej", "Dåligt"].includes(answer)) ){
    return { error: "Invalid answer" };
  }
    if (reflection !== undefined && typeof reflection !== "string") {
    return { error: "Invalid reflection" };
  }

  if (!deviceId || typeof deviceId !== "string") {
    return { error: "Invalid or missing deviceId" };
  }
  return null;
}
