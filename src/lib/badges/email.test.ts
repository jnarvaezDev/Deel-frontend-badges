import { describe, expect, it } from "vitest";
import { isBlockedPublicEmail, requiresProfessionalEmail } from "./email";

describe("email helpers", () => {
  it("detects blocked public email domains", () => {
    expect(isBlockedPublicEmail("person@gmail.com")).toBe(true);
    expect(isBlockedPublicEmail("person@acme.com")).toBe(false);
  });

  it("requires professional email only for employed users", () => {
    expect(requiresProfessionalEmail("employed")).toBe(true);
    expect(requiresProfessionalEmail("unemployed")).toBe(false);
  });
});
