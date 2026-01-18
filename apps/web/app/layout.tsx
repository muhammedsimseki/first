import "./globals.css";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Providers } from "./providers";

export const metadata = {
  title: "Shop MVP",
  description: "Minimal e-commerce MVP"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
