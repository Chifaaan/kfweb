import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { router } from "@inertiajs/react";
import {
  Pill,
  Tablets,
  SmilePlus,
  Milk,
  Columns3,
  HelpCircle,
  Package, // Fallback icon
} from "lucide-react";

// You should have this utility function from your ShadCN setup
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

// --- Step 1: Update the FilterCard Component for new design and colors ---
const FilterCard = ({ icon: Icon, label, isSelected, onClick, color = "gray" }) => {
  const colorStyles = {
    red: {
      base: "border-red-500/30 text-red-800 bg-red-50 hover:bg-red-100",
      selected: "bg-red-100 border-red-500 ring-2 ring-red-500/50",
      icon: "text-red-500",
    },
    yellow: {
      base: "border-yellow-500/30 text-yellow-800 bg-yellow-50 hover:bg-yellow-100",
      selected: "bg-yellow-100 border-yellow-500 ring-2 ring-yellow-500/50",
      icon: "text-yellow-500",
    },
    green: {
      base: "border-green-500/30 text-green-800 bg-green-50 hover:bg-green-100",
      selected: "bg-green-100 border-green-500 ring-2 ring-green-500/50",
      icon: "text-green-500",
    },
    gray: {
      base: "border-border text-card-foreground",
      selected: "bg-primary/10 border-primary ring-2 ring-primary/50",
      icon: "text-primary",
    },
  };

  const styles = colorStyles[color] || colorStyles.gray;

  return (
    <Card
      onClick={onClick}
      className={cn(
        "flex items-center w-full p-2 gap-4 cursor-pointer transition-all duration-200",
        "hover:bg-accent",
        styles.base,
        isSelected && styles.selected
      )}
    >
      <Icon className={cn("h-6 w-6 flex-shrink-0", styles.icon)} />
      <span className="text-sm font-semibold">{label}</span>
    </Card>
  );
};

FilterCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.oneOf(["red", "yellow", "green", "gray"]),
};

// --- Step 2: Create detailed Icon and Color Mappings ---
const categoryConfig = {
  "Obat": { icon: Pill, color: "red" },
  "Vitamin & Suplemen": { icon: Tablets, color: "yellow" },
  "Perawatan Tubuh": { icon: SmilePlus, color: "green" },
  default: { icon: HelpCircle, color: "gray" },
};

const packageIcons = {
  "PCS": Pill,
  "Tablet": Tablets,
  "BOTOL": Milk,
  "STRIP": Columns3,
  default: Package,
};

// --- Step 3: Update the Main Filters Component ---
export default function Filters({
  onFilterChange,
  categories: propCategories,
  packages: propPackages,
}) {
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategories = urlParams.getAll("categories[]");
  const initialPackages = urlParams.getAll("packages[]");

  const [selectedCategories, setSelectedCategories] = useState(initialCategories);
  const [selectedPackages, setSelectedPackages] = useState(initialPackages);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? [] : [cat]
    );
  };

  const togglePackage = (pack) => {
    setSelectedPackages((prev) =>
      prev.includes(pack) ? [] : [pack]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPackages([]);
  };

  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      packages: selectedPackages,
    });
  }, [selectedCategories, selectedPackages]);

  return (
    <div className="lg:w-64 w-full p-4 border rounded-lg shadow-sm bg-card text-card-foreground">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Filters</h2>
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-500 hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Category - Refactored with full-width cards and colors */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="flex flex-col gap-2"> 
          {propCategories.map((cat) => {
            const config = categoryConfig[cat] || categoryConfig.default;
            return (
              <FilterCard
                key={cat}
                label={cat}
                icon={config.icon}
                color={config.color}
                isSelected={selectedCategories.includes(cat)}
                onClick={() => toggleCategory(cat)}
              />
            );
          })}
        </div>
      </div>

      {/* Packaging - Refactored with full-width cards */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Packaging</h3>
        <div className="flex flex-col gap-2"> 
          {propPackages.map((pack) => (
            <FilterCard
              key={pack}
              label={pack}
              icon={packageIcons[pack] || packageIcons.default}
              isSelected={selectedPackages.includes(pack)}
              onClick={() => togglePackage(pack)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

Filters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  packages: PropTypes.arrayOf(PropTypes.string).isRequired,
};