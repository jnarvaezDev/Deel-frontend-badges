import { describe, expect, it } from "vitest";
import { getBrazilBrandingOverride, isBrazilCountry } from "./branding";

describe("branding helpers", () => {
  it("recognizes Brazil country values used by the manual form", () => {
    expect(isBrazilCountry("BR")).toBe(true);
    expect(isBrazilCountry("Brazil")).toBe(true);
    expect(isBrazilCountry("Brasil")).toBe(true);
    expect(isBrazilCountry("Argentina")).toBe(false);
  });

  it("supports safe URL overrides for Nomad branding", () => {
    expect(getBrazilBrandingOverride("?brand=nomad")).toBe("BR");
    expect(getBrazilBrandingOverride("?country=BR")).toBe("BR");
    expect(getBrazilBrandingOverride("?brand=deel&country=AR")).toBeNull();
  });
});
