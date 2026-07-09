import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  getBrazilBrandingOverride,
  getStoredBrazilBranding,
  USER_COUNTRY_STORAGE_KEY,
} from "@/lib/branding";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AppFlow from "./pages/AppFlow.tsx";
import VerifyPage from "./pages/VerifyPage";
import Badges from "./pages/Badges.tsx";
import TermsDisclaimers from "./pages/TermsDisclaimers.tsx";

const queryClient = new QueryClient();
const GEO_BRANDING_TIMEOUT_MS = 3000;
const API_URL = import.meta.env.VITE_API_URL ?? "";

type GeoBrandingResponse = {
  country?: string | null;
  isBrazil?: boolean;
};

const App = () => {
  const [brandingReady, setBrandingReady] = useState(() => {
    const overrideCountry = getBrazilBrandingOverride(window.location.search);
    if (overrideCountry) {
      localStorage.setItem(USER_COUNTRY_STORAGE_KEY, overrideCountry);
      return true;
    }

    return getStoredBrazilBranding();
  });

  useEffect(() => {
    if (brandingReady) return;

    let isMounted = true;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), GEO_BRANDING_TIMEOUT_MS);
    const geoApiUrl = `${API_URL.replace(/\/$/, "")}/api/geo`;

    fetch(geoApiUrl, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: GeoBrandingResponse | null) => {
        if (!isMounted) return;

        if (data?.isBrazil) {
          localStorage.setItem(USER_COUNTRY_STORAGE_KEY, data.country ?? "BR");
        }
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.warn("[geo] Failed to detect visitor country", error);
      })
      .finally(() => {
        window.clearTimeout(timeoutId);
        if (isMounted) setBrandingReady(true);
      });

    return () => {
      isMounted = false;
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [brandingReady]);

  if (!brandingReady) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/app" element={<AppFlow />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/terms-disclaimers" element={<TermsDisclaimers />} />
            <Route path="/verify/:id" element={<VerifyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
