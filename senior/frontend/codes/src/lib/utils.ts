import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildSearchParams(
  fields: Record<string, string>,
  allowedFields: string[] = [],
): string {
  const params = new URLSearchParams();

  const keysToUse = allowedFields.length === 0 ? Object.keys(fields) : allowedFields;

  for (const key of keysToUse) {
    const value = fields[key];
    if (value) {
      params.append(key, value);
    }
  }

  return params.toString();
}


export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "…";
}
