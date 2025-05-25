
import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Product } from "../models/Product";
import { useDebouncedCallback } from "../hooks/use-debounce";
import { Filter, X, RotateCcw, ChevronRight } from "lucide-react";

export type FilterState = {
  priceRange: [number, number];
  categories: string[];
  isNew: boolean;
  isSpecialOffer: boolean;
  availableOnly: boolean;
};

type ProductFiltersProps = {
  products: Product[];
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sortOption: string) => void;
};

export function ProductFilters({ products, onFilterChange, onSortChange }: ProductFiltersProps) {
  const [minMaxPrices, setMinMaxPrices] = useState<[number, number]>([0, 0]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [availableOnly, setAvailableOnly] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("newest");
  const [showCategories, setShowCategories] = useState<boolean>(false);

  // Find min/max prices on component mount
  useEffect(() => {
    if (products.length > 0) {
      const availableProducts = products.filter(product => product.price > 0);
      if (availableProducts.length > 0) {
        const prices = availableProducts.map((product) => product.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        setMinMaxPrices([min, max]);
        setPriceRange([min, max]);
      }
    }
  }, [products]);

  const allCategories = [
    "انواع گل",
    "انواع استین", 
    "انواع لعاب براشینگ",
    "انواع لاستر",
    "انواع اکسیدهای فلزات",
    "انواع اندرگلیز",
    "انواع ترانسفر",
    "انواع دوغاب ها",
    "انواع ابزار هنری",
    "انواع قالب ها",
    "انواع لعاب",
    "انواع محصولات نسوز"
  ];

  // Function to call filter change immediately
  const applyFilters = () => {
    console.log('Applying filters:', { priceRange, selectedCategories, availableOnly });
    const newFilters: FilterState = {
      priceRange,
      categories: selectedCategories,
      isNew: false,
      isSpecialOffer: false,
      availableOnly,
    };
    onFilterChange(newFilters);
  };

  // Debounced filter change handler for price range
  const debouncedFilterChange = useDebouncedCallback(() => {
    applyFilters();
  }, 300);

  const handlePriceRangeChange = (values: number[]) => {
    const newRange: [number, number] = [values[0] || 0, values[1] || 0];
    setPriceRange(newRange);
    debouncedFilterChange();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];
      
      // Apply filters immediately for category changes
      setTimeout(() => {
        const newFilters: FilterState = {
          priceRange,
          categories: newCategories,
          isNew: false,
          isSpecialOffer: false,
          availableOnly,
        };
        onFilterChange(newFilters);
      }, 0);
      
      return newCategories;
    });
  };

  const removeCategoryFilter = (category: string) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.filter((c) => c !== category);
      
      // Apply filters immediately
      setTimeout(() => {
        const newFilters: FilterState = {
          priceRange,
          categories: newCategories,
          isNew: false,
          isSpecialOffer: false,
          availableOnly,
        };
        onFilterChange(newFilters);
      }, 0);
      
      return newCategories;
    });
  };

  const handleAvailableOnlyChange = (checked: boolean) => {
    console.log('Available only changed to:', checked);
    setAvailableOnly(checked);
    
    // Apply filters immediately for availability changes
    setTimeout(() => {
      const newFilters: FilterState = {
        priceRange,
        categories: selectedCategories,
        isNew: false,
        isSpecialOffer: false,
        availableOnly: checked,
      };
      console.log('Sending filters:', newFilters);
      onFilterChange(newFilters);
    }, 0);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    onSortChange(value);
  };

  const handleResetFilters = () => {
    setPriceRange(minMaxPrices);
    setSelectedCategories([]);
    setAvailableOnly(false);
    
    const resetFilters: FilterState = {
      priceRange: minMaxPrices,
      categories: [],
      isNew: false,
      isSpecialOffer: false,
      availableOnly: false,
    };
    onFilterChange(resetFilters);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  const hasActiveFilters = selectedCategories.length > 0 || availableOnly || 
    (priceRange[0] !== minMaxPrices[0] || priceRange[1] !== minMaxPrices[1]);

  return (
    <div className="w-full max-w-7xl mx-auto mb-8">
      <Card className="overflow-hidden bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-0 shadow-2xl">
        <div className="bg-gradient-to-r from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-pink-900/20 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Filter className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  فیلترهای پیشرفته
                </h2>
                {hasActiveFilters && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {(selectedCategories.length + (availableOnly ? 1 : 0) + (priceRange[0] !== minMaxPrices[0] || priceRange[1] !== minMaxPrices[1] ? 1 : 0))} فیلتر فعال
                  </p>
                )}
              </div>
            </div>
            
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                onClick={handleResetFilters}
                className="bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm"
              >
                <RotateCcw className="w-4 h-4 ml-2" />
                پاک کردن فیلترها
              </Button>
            )}
          </div>

          {/* Main Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sort */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                مرتب‌سازی
              </label>
              <Select value={sortOption} onValueChange={handleSortChange}>
                <SelectTrigger className="bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700 h-12 rounded-xl shadow-sm hover:shadow-md transition-all">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl shadow-xl">
                  <SelectItem value="newest">جدیدترین</SelectItem>
                  <SelectItem value="priceAsc">قیمت: کم به زیاد</SelectItem>
                  <SelectItem value="priceDesc">قیمت: زیاد به کم</SelectItem>
                  <SelectItem value="popular">محبوب‌ترین</SelectItem>
                  <SelectItem value="viewed">پربازدیدترین</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                محدوده قیمت
              </label>
              <div className="bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
                <Slider
                  defaultValue={[minMaxPrices[0], minMaxPrices[1]]}
                  value={[priceRange[0], priceRange[1]]}
                  max={minMaxPrices[1]}
                  min={minMaxPrices[0]}
                  step={1000}
                  onValueChange={handlePriceRangeChange}
                  className="mb-4"
                />
                <div className="flex justify-between text-xs">
                  <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg font-medium">
                    {formatPrice(priceRange[0])}
                  </span>
                  <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg font-medium">
                    {formatPrice(priceRange[1])}
                  </span>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                دسته‌بندی
              </label>
              <Button
                variant="outline"
                onClick={() => setShowCategories(!showCategories)}
                className="w-full justify-between bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700 h-12 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <span className="font-medium">
                  {selectedCategories.length > 0 
                    ? `${selectedCategories.length} دسته انتخاب شده` 
                    : "انتخاب دسته‌بندی"
                  }
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${showCategories ? 'rotate-90' : ''}`} />
              </Button>
            </div>

            {/* Available Only */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                وضعیت موجودی
              </label>
              <div className="flex items-center space-x-3 space-x-reverse bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 h-12 shadow-sm">
                <Checkbox
                  id="available-only"
                  checked={availableOnly}
                  onCheckedChange={handleAvailableOnlyChange}
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <label
                  htmlFor="available-only"
                  className="cursor-pointer text-sm font-medium mr-2"
                >
                  فقط محصولات موجود
                </label>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {selectedCategories.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">فیلترهای فعال:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <Badge 
                    key={category} 
                    variant="secondary" 
                    className="pl-1 pr-3 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 rounded-lg hover:from-blue-500/20 hover:to-purple-500/20 transition-all"
                  >
                    {category}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1 ml-1 hover:bg-blue-500/20 rounded-full"
                      onClick={() => removeCategoryFilter(category)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Categories Dropdown */}
          {showCategories && (
            <div className="mt-6 bg-white/95 dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {allCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-3 space-x-reverse hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl p-3 transition-all group">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                      className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="cursor-pointer text-sm font-medium mr-2 flex-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
