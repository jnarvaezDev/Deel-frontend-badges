import type {
  SubmissionPayload,
  PathKey,
  AiValidationResult,
} from "./types";

const WEBHOOK_URL =
  import.meta.env.VITE_WEBHOOK_URL ?? "";

const VALIDATION_URL =
  import.meta.env.VITE_VALIDATION_URL ?? "";

/**
 * Lead capture / analytics webhook
 */
export async function submitToWebhook(
  payload: SubmissionPayload
): Promise<{ ok: boolean }> {

  if (!WEBHOOK_URL) {
    console.warn("[deel-badges] WEBHOOK_URL not configured");
    return { ok: true };
  }

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return { ok: res.ok };

  } catch (err) {
    console.error("[deel-badges] webhook error:", err);

    return { ok: false };
  }
}

/**
 * AI consistency validation
 */
export async function validateOpenText(payload: {
  path: PathKey;
  entryAnswer: string;
  answers: Record<
    string,
    {
      label: string;
      points: number;
      flag?: string;
    }
  >;
  openText: string;
}): Promise<AiValidationResult> {

  // fallback if validation endpoint not configured
  if (!VALIDATION_URL) {
    console.warn("[deel-badges] VALIDATION_URL not configured");

    return {
      level: "high",
      scoreModifier: 1,
      shouldRetry: false,
      notes: "Validation disabled",
    };
  }

  try {
    const res = await fetch(VALIDATION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Validation failed");
    }

    const data = await res.json();

    return {
      level: data.level,
      scoreModifier: data.scoreModifier,
      shouldRetry: data.shouldRetry,
      notes: data.notes,
    };

  } catch (err) {
    console.error("[deel-badges] validation error:", err);

    // fail-open strategy
    return {
      level: "high",
      scoreModifier: 1,
      shouldRetry: false,
      notes: "Validation unavailable",
    };
  }
}
