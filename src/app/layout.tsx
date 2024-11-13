import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code Capture - Write, Capture, and Share Code Snippets",
  description: "Write, Capture, and Share Code Snippets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </body>
      </ThemeProvider>
    </html>
  );
}
