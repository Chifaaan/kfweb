import React, { useState, useEffect } from "react";

export default function Filters({ onFilterChange }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [selectedOrderUnits, setSelectedOrderUnits] = useState([]);

  const categories = ["Obat", "Vitamin & Suplemen", "Antibiotik"];
  const packages = ["PCS", "BOTOL", "Tablet", "STRIP"];
  // ini sebaiknya didapat dari API products, tapi sementara hardcode
  const orderUnits = ["BOX", "DUS"];

  // toggle category
  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  // toggle package
  const togglePackage = (pack) => {
    if (selectedPackages.includes(pack)) {
      setSelectedPackages(selectedPackages.filter((p) => p !== pack));
    } else {
      setSelectedPackages([...selectedPackages, pack]);
    }
  };

  // toggle orderUnit
  const toggleOrderUnit = (unit) => {
    if (selectedOrderUnits.includes(unit)) {
      setSelectedOrderUnits(selectedOrderUnits.filter((u) => u !== unit));
    } else {
      setSelectedOrderUnits([...selectedOrderUnits, unit]);
    }
  };

  // clear all filters
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPackages([]);
    setSelectedOrderUnits([]);
  };

  // kirim ke parent setiap kali filter berubah
  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      packages: selectedPackages,
      orderUnits: selectedOrderUnits,
    });
  }, [selectedCategories, selectedPackages, selectedOrderUnits]);

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

      {/* Category */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Categories</h3>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Packaging */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Packaging</h3>
        <ul className="space-y-1">
          {packages.map((pack) => (
            <li key={pack}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedPackages.includes(pack)}
                  onChange={() => togglePackage(pack)}
                />
                {pack}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Order Units */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Order Units</h3>
        <ul className="space-y-1">
          {orderUnits.map((unit) => (
            <li key={unit}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedOrderUnits.includes(unit)}
                  onChange={() => toggleOrderUnit(unit)}
                />
                {unit}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Harga */}
      <div>
        <h3 className="font-semibold mb-2">Range Harga</h3>
        <input type="range" min="0" max="1000000" className="w-full" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>0</span>
          <span>1.000.000</span>
        </div>
      </div>
    </div>
  );
}
