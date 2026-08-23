"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface ProductSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

export function ProductSearch({
  searchQuery,
  onSearchChange,
  placeholder = "Search by name, product code (e.g. SS-2026-101), fabric or work...",
}: ProductSearchProps) {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Search className="h-5 w-5 text-maroon-900/60" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full rounded-full border border-gold-400/40 bg-white py-3.5 pl-12 pr-10 text-sm text-maroon-950 placeholder:text-maroon-800/40 shadow-sm transition-all focus:border-maroon-900 focus:outline-none focus:ring-2 focus:ring-maroon-900/20"
      />
      {searchQuery && (
        <button
          onClick={() => onSearchChange("")}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-maroon-900/60 hover:text-maroon-900"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
