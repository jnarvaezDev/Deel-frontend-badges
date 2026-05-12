export async function captureLead(payload: {
  name: string;
  email: string;
  job: string;
  company: string;
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