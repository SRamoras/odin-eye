import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { OdinEye } from "odin-eye/always";
import "./globals.css";

const sans = localFont({
  src: "../../public/fonts/Geist-Regular.otf",
  weight: "400",
  variable: "--font-sans",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const title = "OdinEye: find page issues while you develop";
const description =
  "OdinEye is a React dev tool that marks accessibility, SEO and layout problems on your page and explains how to fix each one.";

const themeScript = `try {
  document.documentElement.classList.toggle("dark", localStorage.getItem("odin-eye-theme") !== "light");
} catch {}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://odin-eye.vercel.app"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} dark`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <OdinEye />
      </body>
    </html>
  );
}
