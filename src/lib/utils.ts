import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const navItems = [
  { href: "/jobs", label: "Jobs" },
  { href: "/roadmaps", label: "Roadmaps" },
  { href: "/companies", label: "Companies" },
  { href: "/dsa-sheets", label: "DSA Sheets" },
];
export const isActive = (href: string, pathname: string) =>
  pathname === href ? "text-primary" : "text-muted-foreground";


export const getTwoAlphabets = (name: string): string => {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2).toUpperCase()
};
