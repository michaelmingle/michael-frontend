import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { queryClient } from "@/lib/queryClient";
import { ThemeProvider } from "@/hooks/useTheme";
import { CommandPaletteProvider } from "@/hooks/useCommandPalette";
import { AuthProvider } from "@/hooks/useAuth";

export function AppProviders({ children }) {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <CommandPaletteProvider>{children}</CommandPaletteProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
