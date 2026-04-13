"use client";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AuthProvider } from "@/components/auth/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>{children}</AuthProvider>
    </LanguageProvider>
  );
}
