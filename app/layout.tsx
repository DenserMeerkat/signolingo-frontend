import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { Fredoka } from "next/font/google";
import { Providers } from "./providers";
import clsx from "clsx";
import { Navbar } from "@/components/navbar";
import AuthDialog from "@/components/auth/auth-dialog";

const fredoka = Fredoka({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={clsx("min-h-screen bg-background", fredoka.className)}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <main>
            <Navbar />
            <AuthDialog />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
