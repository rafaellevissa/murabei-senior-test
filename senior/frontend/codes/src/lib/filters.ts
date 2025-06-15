import { buildSearchParams } from "@/lib/utils";

export const filterOptions = [
    { label: "Título", value: "title" },
    { label: "Autor", value: "author" },
    { label: "Biografia", value: "author_bio" },
];

export const allowedFilterFields = filterOptions.map(opt => opt.value);

export const buildFilterQuery = (filters: Record<string, string>) =>
  buildSearchParams(filters, allowedFilterFields)
