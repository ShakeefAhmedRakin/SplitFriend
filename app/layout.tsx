import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "@/components/query-provider";
import Navbar from "@/components/navbar";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SplitFriend",
  description:
    "This app simplifies group expense management, allowing users to create groups and add team members (without any invitation required for logged-in members). Each team member can add expenses, and the dashboard calculates the balance, showing who owes whom to settle the expenses equally—making it an effortless bill-splitting solution for groups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-4`}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="bottom-right" richColors />
            <main>
              <Navbar></Navbar>
              <div className="max-w-6xl min-h-[60vh] mx-auto">{children}</div>
            </main>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
