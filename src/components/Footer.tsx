import deelLogo from "@/assets/deel-logo-white.svg";
import nomadLogo from "@/assets/Nomad_idByCy3wYR_1.svg";
import { getStoredBrazilBranding } from "@/lib/branding";
import { Link } from "react-router-dom";

interface FooterProps {
  isBrazilBranding?: boolean;
}

const legalLinks = [
  { label: "Privacy Policy", href: "https://www.deel.com/legal/privacy-policy/" },
  { label: "LLM Info", href: "https://www.deel.com/llm-info/" },
  { label: "Disclosures", href: "https://www.deel.com/legal/disclosures/" },
  { label: "Legal Hub", href: "https://www.deel.com/legal/" },
  { label: "Licenses and Compliance", href: "https://www.deel.com/legal/licenses/" },
];

const termsAndDisclaimersLink = {
  label: "Terms & Disclaimers",
  href: "/terms-disclaimers",
};

const NOMAD_URL = "https://www.nomadglobal.com";

const Footer = ({ isBrazilBranding }: FooterProps) => {
  const brazilBranding = isBrazilBranding ?? getStoredBrazilBranding();

  return (
    <footer style={{ backgroundColor: "#0B0B0B" }}>
      <div
        className="mx-auto w-full flex flex-col"
        style={{
          maxWidth: 1440,
          padding: "64px 80px 48px",
          gap: 40,
        }}
      >
        {/* Top: Logo + Social stacked */}
        <div className="flex flex-col gap-4">
          <div className={`flex items-center ${brazilBranding ? "gap-5 sm:gap-7" : "gap-3"}`}>
            <Link to="/" aria-label="Go to home">
              <img src={deelLogo} alt="Deel" className="h-7 w-auto self-start" />
            </Link>
            {brazilBranding && (
              <a href={NOMAD_URL} target="_blank" rel="noopener noreferrer" aria-label="Visit Nomad Global">
                <img
                  src={nomadLogo}
                  alt="Nomad"
                  className="h-6 w-auto self-start"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </a>
            )}
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: "100%", height: 1, backgroundColor: "#1F1F1F" }} />

        {/* Bottom: Copyright + Legal */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <span style={{ fontSize: 12, color: "#6B6B6B" }}>
            © Copyright 2026. All Rights Reserved.
          </span>
          <div className="flex flex-col items-start gap-3">
            <Link
              to={termsAndDisclaimersLink.href}
              className="transition-colors duration-200 font-semibold"
              style={{ fontSize: 14, color: "#FFFFFF", textDecoration: "underline" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#D1D1D1")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#FFFFFF")}
            >
              {termsAndDisclaimersLink.label}
            </Link>

            <div className="flex flex-wrap gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200"
                style={{ fontSize: 12, color: "#6B6B6B", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6B6B6B")}
              >
                {link.label}
              </a>
            ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
