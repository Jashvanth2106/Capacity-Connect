import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./workspace.css";
export const metadata: Metadata = {
  title: "Capacity Connect | Learning workspace",
  description:
    "Your organizational workspace for learning, assessments, and professional development.",
  icons: { icon: "/brand.svg" },
};
export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#101c32",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="antialiased">{children}</body>
    </html>
  );
}
