import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header/Header";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { FloatingNav } from "@/components/ui/floating-navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AWE AgriTools",
  description: "AWE Power Machinery Pvt. Ltd.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    {
        name: "Home",
        link: "/",
        icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
        name: "About",
        link: "/about",
        icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
        name: "Contact",
        link: "/contact",
        icon: (
            <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
        ),
    },
];

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <FloatingNav navItems={navItems} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
