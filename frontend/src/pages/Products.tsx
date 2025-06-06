
import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { ProductFilters } from "../components/ProductFilters";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { useBasket } from "../hooks/useBasket";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import type { FilterState } from "../components/ProductFilters";

const Products = () => {
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();
  const { addToBasket } = useBasket();
  
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000000],
    categories: [],
    isNew: false,
    isSpecialOffer: false,
    availableOnly: false,
  });
  const [sortBy, setSortBy] = useState<string>("newest");

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // فیلتر بر اساس دسته‌بندی
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => filters.categories.includes(product.category));
    }

    // فیلتر بر اساس قیمت
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // فیلتر فقط موجود
    if (filters.availableOnly) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    // مرتب‌سازی
    switch (sortBy) {
      case "priceAsc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // newest - بر اساس آیدی
        filtered.sort((a, b) => b.id.localeCompare(a.id));
    }

    return filtered;
  }, [products, filters, sortBy]);

  const handleAddToCart = (productId: string) => {
    addToBasket({
      productId,
      quantity: 1
    });
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (productsError) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container-custom py-12">
          <div className="text-center">
            <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">خطا در بارگذاری محصولات</h2>
            <p className="text-gray-600 mb-6">{productsError}</p>
            <Button onClick={handleRetry} variant="outline">
              تلاش مجدد
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-persian-blue mb-4">محصولات</h1>
          <p className="text-gray-600">مجموعه کاملی از محصولات دست‌ساز ایرانی</p>
        </div>

        <ProductFilters
          products={products}
          onFilterChange={setFilters}
          onSortChange={setSortBy}
        />

        <div className="mt-8">
          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  {filteredProducts.length} محصول یافت شد
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => handleAddToCart(product.id)}
                    isFavorite={false}
                    onFavoriteToggle={() => {}}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">هیچ محصولی یافت نشد</p>
              <p className="text-gray-400">فیلترهای خود را تغییر دهید و دوباره تلاش کنید</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
