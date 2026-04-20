import { Globe } from "lucide-react";

export function BrandHeader() {
  return (
    <header className="w-full border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-30">
      <div className="container max-w-3xl flex items-center justify-between h-14">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-navy text-navy-foreground flex items-center justify-center">
            <Globe className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-semibold tracking-tight text-navy">Deel</span>
            <span className="text-xs font-medium text-muted-foreground">Global Badges</span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-talent animate-pulse-soft" />
          Verified credentialing
        </div>
      </div>
    </header>
  );
}
