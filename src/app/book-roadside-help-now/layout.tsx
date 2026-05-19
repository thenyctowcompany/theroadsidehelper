import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Book Roadside Help Now — 24/7 Dispatch at $100/hr | (888) 944-3001",
  description:
    "Book roadside help: jump-starts, flat tires, lockouts, fuel, tow, winch-outs. Flat $100/hr, 24/7. No membership. Call (888) 944-3001 for immediate dispatch.",
  path: "/book-roadside-help-now",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
