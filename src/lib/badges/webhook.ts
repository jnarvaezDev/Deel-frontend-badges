import type { SubmissionPayload } from "./types";

/**
 * Webhook endpoint for AI text validation & lead capture.
 * Replace WEBHOOK_URL with your real endpoint, or wire up via env.
 */
const WEBHOOK_URL = ""; // e.g. "https://api.example.com/deel-badges/submit"

export async function submitToWebhook(payload: SubmissionPayload): Promise<{ ok: boolean }> {
  if (!WEBHOOK_URL) {
    // Webhook not configured — log locally so the flow still completes.
    if (typeof console !== "undefined") {
      //console.info("[deel-badges] submission (no webhook configured):", payload);
    }
    return { ok: true };
  }
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok };
  } catch (err) {
    console.error("[deel-badges] webhook error:", err);
    return { ok: false };
  }
}
