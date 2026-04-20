import { Link } from "react-router-dom";
import deelLogo from "@/assets/deel-logo.svg";
import { getUser } from "@/utils/user";

const Header = () => {

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_LINKEDIN_URI}`;
  };

  const { email, name } = getUser();

  return (
    <header className="bg-background shadow-[0_2px_12px_rgba(0,0,0,0.06)] sticky top-0 z-50">
      <div className="deel-container flex items-center justify-between h-[72px]">
        <Link to="/">
          <img src={deelLogo} alt="Deel" className="h-7" />
        </Link>
        <div className="flex items-center gap-3">
          {email && (
          <Link
            to={`/badges?email=${email}`}
            className="h-[48px] px-6 rounded-full border border-deel-border bg-background text-foreground text-sm font-semibold hover:bg-muted transition-colors flex items-center"
          >
            SEE MY BADGES
          </Link>
          )}
          <button
            onClick={handleLogin}
            className="h-[48px] px-6 rounded-full border border-deel-border bg-background text-foreground text-sm font-semibold hover:bg-muted transition-colors"
          >
            GET YOUR BADGE
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
