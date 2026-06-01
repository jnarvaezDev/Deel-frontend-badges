import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import deelLogo from "@/assets/deel-logo.svg";
import nomadLogo from "@/assets/Nomad_idByCy3wYR_1.svg";
import { getStoredBrazilBranding } from "@/lib/branding";

interface HeaderProps {
  isBrazilBranding?: boolean;
}

const Header = ({ isBrazilBranding }: HeaderProps) => {
  const brazilBranding = isBrazilBranding ?? getStoredBrazilBranding();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const ctaClass = `h-[48px] px-6 rounded-full border text-sm font-semibold transition-colors flex items-center justify-center ${
    brazilBranding
      ? "border-black bg-black text-white hover:opacity-90"
      : "border-deel-border bg-background text-foreground hover:bg-muted"
  }`;

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className="shadow-[0_2px_12px_rgba(0,0,0,0.06)] sticky top-0 z-50"
      style={{ backgroundColor: brazilBranding ? "rgb(255, 206, 0)" : "#FFFFFF" }}
    >
      <div className="deel-container relative flex items-center justify-between h-[72px] gap-3">
        <Link to="/" className="flex items-center gap-3 sm:gap-4">
          <img src={deelLogo} alt="Deel" className="h-6 sm:h-7" />
          {brazilBranding && <img src={nomadLogo} alt="Nomad" className="h-6 sm:h-7" />}
        </Link>

        <div className="hidden sm:flex items-center gap-3">
          <Link to="/badges" className={ctaClass}>
            SEE MY BADGES
          </Link>
          <Link to="/app" className={ctaClass}>
            GET YOUR BADGE
          </Link>
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className={`sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border transition-colors ${
            brazilBranding
              ? "border-black bg-black text-white"
              : "border-deel-border bg-background text-foreground"
          }`}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {isMobileMenuOpen && (
          <div
            className="sm:hidden absolute left-0 right-0 top-[72px] z-50 border-t shadow-md"
            style={{ backgroundColor: brazilBranding ? "rgb(255, 206, 0)" : "#FFFFFF" }}
          >
            <div className="px-4 py-3 flex flex-col gap-2">
              <Link to="/badges" className={ctaClass} onClick={closeMenu}>
                SEE MY BADGES
              </Link>
              <Link to="/app" className={ctaClass} onClick={closeMenu}>
                GET YOUR BADGE
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
