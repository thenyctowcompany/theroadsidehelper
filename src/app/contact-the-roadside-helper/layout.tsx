import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact The Roadside Helper — 24/7 at $100/hr | (888) 944-3001",
  description: "Contact The Roadside Helper for fleet inquiries, partnerships, feedback. For immediate roadside dispatch at flat $100/hr, call (888) 944-3001 24/7.",
  alternates: { canonical: "/contact-the-roadside-helper" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
