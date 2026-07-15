import type { EmploymentStatus } from "./types";

export async function captureLead(payload: {
  firstName: string;
  lastName: string;
  email: string;
  employmentStatus: EmploymentStatus;
  currentJobTitle: string;
  currentCountry: string;
}) {

  const API_URL = import.meta.env.VITE_API_URL;

  try {
    await fetch(`${API_URL}/api/leads`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    });

  } catch (error) {
    console.error("[captureLead]", error);
  }
}
