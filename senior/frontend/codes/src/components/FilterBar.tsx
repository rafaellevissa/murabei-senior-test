"use client";

import { useFilterStore } from "@/lib/store";
import { ChangeEvent } from "react";
import { filterOptions } from "@/lib/filters";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function FilterBar() {
  const { filters, setFilter, selectedField, setSelectedField } = useFilterStore();

  const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(selectedField, e.target.value);
  };

  const handleSelectChange = (newField: typeof selectedField) => {
    setSelectedField(newField);
  };

  const handleOnClickRemoveFilter = (field: typeof selectedField) => {
    setFilter(field, "");
  }

  return (
    <div className="w-full">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
            />
          </svg>
        </div>

        <Input
          type="text"
          placeholder={`Pesquisar por ${selectedField}`}
          value={filters[selectedField] || ""}
          onChange={handleInputOnChange}
          className="pl-10 pr-28"
        />

        <Select value={selectedField} onValueChange={handleSelectChange}>
          <SelectTrigger
            className="absolute top-1/2 right-2 w-24 transform -translate-y-1/2 bg-transparent border-none shadow-none px-2 py-1 text-sm focus:ring-0 focus:outline-none"
          >
            <SelectValue placeholder="Campo" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {Object.entries(filters).map(([field, value]) =>
          value ? (
            <div
              key={field}
              className="flex items-center rounded-md bg-gray-200 px-3 py-1 text-sm"
            >
              <span className="capitalize">{field}:</span>&nbsp;
              <span className="font-medium">{value}</span>
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 p-0"
                onClick={() => handleOnClickRemoveFilter(field as typeof selectedField)}
              >
                ×
              </Button>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
