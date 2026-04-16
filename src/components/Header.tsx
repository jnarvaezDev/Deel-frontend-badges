import deelLogo from "@/assets/deel-logo.svg";

const Header = () => {

  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/linkedin";
  };

  return (
    <header className="bg-background shadow-[0_2px_12px_rgba(0,0,0,0.06)] sticky top-0 z-50">
      <div className="deel-container flex items-center justify-between h-[72px]">
        <img src={deelLogo} alt="Deel" className="h-7" />
        <button
          onClick={handleLogin}
          className="h-[48px] px-6 rounded-full border border-deel-border bg-background text-foreground text-sm font-semibold hover:bg-muted transition-colors"
        >
          GET YOUR BADGE
        </button>
      </div>
    </header>
  );
};

export default Header;
