"use client";

import React from "react";
import { Filter, RotateCcw, Sparkles } from "lucide-react";
import { Category, FilterState } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface ProductFilterProps {
  categories: Category[];
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalProductsCount: number;
}

const workTypesList = [
  "All",
  "Zari",
  "Brocade",
  "Embroidery",
  "Zardozi",
  "Sequins",
  "Mirror Work",
  "Block Print",
  "Gota Patti",
];

const fabricsList = [
  "All",
  "Kanchipuram Silk",
  "Banarasi Silk",
  "Mysore Silk",
  "Organza",
  "Georgette",
  "Cotton",
  "Raw Silk",
  "Crepe",
  "Velvet",
];

const sortOptions = [
  { label: "Featured First", value: "featured" },
  { label: "Newest Arrivals", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
];

export function ProductFilter({
  categories,
  filters,
  onFilterChange,
  onReset,
  totalProductsCount,
}: ProductFilterProps) {
  const selectedCat = filters.categorySlug || "all";
  const selectedWork = filters.workType || "all";
  const selectedFabric = filters.fabric || "all";
  const selectedSort = filters.sortBy || "featured";

  return (
    <div className="space-y-6">
      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() =>
            onFilterChange({ ...filters, categorySlug: "all" })
          }
          className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
            selectedCat === "all"
              ? "bg-maroon-900 text-gold-100 shadow-md ring-2 ring-gold-400/40"
              : "bg-champagne-200/70 text-maroon-950 hover:bg-champagne-300"
          }`}
        >
          All Collection
        </button>
        {categories.map((cat) => {
          const isActive = selectedCat === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() =>
                onFilterChange({ ...filters, categorySlug: cat.slug })
              }
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-maroon-900 text-gold-100 shadow-md ring-2 ring-gold-400/40"
                  : "bg-champagne-200/70 text-maroon-950 hover:bg-champagne-300"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Secondary Filters Bar */}
      <div className="rounded-2xl border border-gold-300/40 bg-champagne-100/60 p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Filter Groups */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Work Type */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-maroon-900 uppercase tracking-wider">
                Work:
              </span>
              <select
                value={selectedWork}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    workType: e.target.value === "all" ? undefined : e.target.value,
                  })
                }
                className="rounded-lg border border-maroon-900/20 bg-white px-3 py-1.5 text-xs font-medium text-maroon-950 focus:border-gold-500 focus:outline-none"
              >
                <option value="all">All Work Types</option>
                {workTypesList.slice(1).map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>

            {/* Fabric */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-maroon-900 uppercase tracking-wider">
                Fabric:
              </span>
              <select
                value={selectedFabric}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    fabric: e.target.value === "all" ? undefined : e.target.value,
                  })
                }
                className="rounded-lg border border-maroon-900/20 bg-white px-3 py-1.5 text-xs font-medium text-maroon-950 focus:border-gold-500 focus:outline-none"
              >
                <option value="all">All Fabrics</option>
                {fabricsList.slice(1).map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-maroon-900 uppercase tracking-wider">
                Sort:
              </span>
              <select
                value={selectedSort}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    sortBy: e.target.value as any,
                  })
                }
                className="rounded-lg border border-maroon-900/20 bg-white px-3 py-1.5 text-xs font-medium text-maroon-950 focus:border-gold-500 focus:outline-none"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Counts & Reset */}
          <div className="flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-gold-300/30">
            <span className="text-xs font-serif font-bold text-maroon-950">
              Showing <span className="text-gold-700">{totalProductsCount}</span> designs
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="h-8 gap-1.5 text-xs font-medium text-maroon-900 border-maroon-900/20 hover:bg-champagne-200/80"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset Filters</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
