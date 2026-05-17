import { Link } from "react-router-dom";
import deelLogo from "@/assets/deel-logo.svg";

const Header = () => {

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_LINKEDIN_URI}`;
  };

  return (
    <header className="bg-background shadow-[0_2px_12px_rgba(0,0,0,0.06)] sticky top-0 z-50">
      <div className="deel-container flex items-center justify-between h-[72px] gap-2">
        <Link to="/">
          <img src={deelLogo} alt="Deel" className="h-6 sm:h-7" />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to={`/badges`}
            className="h-[44px] sm:h-[48px] px-3 sm:px-6 rounded-full border border-deel-border bg-background text-foreground text-[13px] sm:text-sm font-semibold hover:bg-muted transition-colors flex items-center"
          >
            SEE MY BADGES
          </Link>
          <Link
            to={`/app`}
            className="h-[44px] sm:h-[48px] px-3 sm:px-6 rounded-full border border-deel-border bg-background text-foreground text-[13px] sm:text-sm font-semibold hover:bg-muted transition-colors flex items-center"
          >
            GET YOUR BADGE
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
