import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { CursorFollower } from "@/components/layout/CursorFollower";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { RouteFallback } from "@/components/layout/RouteFallback";

export function RootLayout() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <ScrollToTop />
      <CursorFollower />
      <CommandPalette />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
      <CookieConsent />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--bg-elevated)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          },
        }}
      />
    </div>
  );
}
