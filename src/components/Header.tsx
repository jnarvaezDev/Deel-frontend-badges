import { Link } from "react-router-dom";
import deelLogo from "@/assets/deel-logo.svg";
import nomadLogo from "@/assets/Nomad_idByCy3wYR_1.svg";
import { getStoredBrazilBranding } from "@/lib/branding";

interface HeaderProps {
  isBrazilBranding?: boolean;
}

const Header = ({ isBrazilBranding }: HeaderProps) => {
  const brazilBranding = isBrazilBranding ?? getStoredBrazilBranding();

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_LINKEDIN_URI}`;
  };

  return (
    <header
      className="shadow-[0_2px_12px_rgba(0,0,0,0.06)] sticky top-0 z-50"
      style={{ backgroundColor: brazilBranding ? "rgb(255, 206, 0)" : undefined }}
    >
      <div className="deel-container flex items-center justify-between h-[72px] gap-2">
        <Link to="/" className="flex items-center gap-3">
          <img src={deelLogo} alt="Deel" className="h-6 sm:h-7" />
          {brazilBranding && <img src={nomadLogo} alt="Nomad" className="h-6 sm:h-7" />}
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to={`/badges`}
            className={`h-[44px] sm:h-[48px] px-3 sm:px-6 rounded-full border text-[13px] sm:text-sm font-semibold transition-colors flex items-center ${
              brazilBranding
                ? "border-black bg-black text-white hover:opacity-90"
                : "border-deel-border bg-background text-foreground hover:bg-muted"
            }`}
          >
            SEE MY BADGES
          </Link>
          <Link
            to={`/app`}
            className={`h-[44px] sm:h-[48px] px-3 sm:px-6 rounded-full border text-[13px] sm:text-sm font-semibold transition-colors flex items-center ${
              brazilBranding
                ? "border-black bg-black text-white hover:opacity-90"
                : "border-deel-border bg-background text-foreground hover:bg-muted"
            }`}
          >
            GET YOUR BADGE
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
