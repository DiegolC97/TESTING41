import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/outfit";
import "./globals.css";

export const metadata: Metadata = {
  title: "PokéPal — Small beginnings. Big adventures.",
  description:
    "Every great adventure starts with a partner. Meet your first Pokémon and discover a world of possibilities with PokéPal, a fan-made demo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
