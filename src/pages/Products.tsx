
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { productsData, Product } from "../models/Product";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import ProductCard from "../components/ProductCard";
import { Input } from "@/components/ui/input";
import ScrollToTop from "../components/ScrollToTop";
import LoadingScreen from '../components/LoadingScreen';
import { ProductFilters } from '../components/ProductFilters';

// Type for filter state
type FilterState = {
  priceRange: [number, number];
  categories: string[];
  isNew: boolean;
  isSpecialOffer: boolean;
  availableOnly: boolean;
};

const Products = () => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [localSearchTerm, setLocalSearchTerm] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 2000000],
    categories: [],
    isNew: false,
    isSpecialOffer: false,
    availableOnly: false
  });
  const location = useLocation();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    const category = params.get('category');
    
    if (search) {
      setSearchTerm(search);
      setLocalSearchTerm(search);
    } else {
      setSearchTerm(null);
    }
    
    if (category) {
      setSelectedCategory(category);
      // Also add to filter categories
      setFilters(prev => ({
        ...prev,
        categories: [category]
      }));
    } else {
      setSelectedCategory(null);
    }
    
    // Simulate loading
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [location.search]);

  // Filter and sort products
  useEffect(() => {
    const filterProducts = () => {
      const results = productsData.filter(product => {
        // Category filter (from URL parameter)
        const matchesSelectedCategory = selectedCategory ? product.category === selectedCategory : true;
        
        // Text search filter
        const matchesSearch = searchTerm || localSearchTerm
          ? product.title.toLowerCase().includes((searchTerm || localSearchTerm).toLowerCase()) ||
            product.description.toLowerCase().includes((searchTerm || localSearchTerm).toLowerCase())
          : true;
        
        // Price range filter
        const matchesPriceRange = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
        
        // Category filter (from filter component)
        const matchesCategories = filters.categories.length > 0 
          ? filters.categories.includes(product.category)
          : true;

        // Available only filter - Only show available products when filter is active
        const matchesAvailability = filters.availableOnly ? product.price > 0 : true;

        return matchesSelectedCategory && matchesSearch && matchesPriceRange && matchesCategories && matchesAvailability;
      });
      
      // Sort products
      const sortedResults = sortProducts(results, sortBy);
      setFilteredProducts(sortedResults);
    };
    
    filterProducts();
  }, [selectedCategory, searchTerm, localSearchTerm, filters, sortBy]);

  // Sort products based on sortBy parameter
  const sortProducts = (products: Product[], sortType: string): Product[] => {
    const sorted = [...products];
    
    switch(sortType) {
      case 'priceAsc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'popular':
        // This would typically use a popularity metric, using price as placeholder
        return sorted.sort((a, b) => b.price - a.price);
      case 'viewed':
        // This would typically use view count, using id as placeholder
        return sorted.sort((a, b) => Number(b.id) - Number(a.id));
      case 'newest':
      default:
        // Using id as proxy for newest (assuming higher id = newer product)
        return sorted.sort((a, b) => Number(b.id) - Number(a.id));
    }
  };

  // Live search debounce effect
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (localSearchTerm !== searchTerm) {
        setSearchTerm(localSearchTerm);
      }
    }, 300);
    
    return () => clearTimeout(debounceTimer);
  }, [localSearchTerm, searchTerm]);

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };
  
  const handleFavoriteToggle = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  // All 12 categories from the homepage
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

  return (
    <div className="min-h-screen bg-background dark:bg-background transition-colors duration-300">
      <Navbar />
      {loading ? (
        <LoadingScreen timeout={500} />
      ) : (
        <main className="container-custom py-12">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {searchTerm ? `نتایج جستجو برای "${searchTerm}"` : 
              selectedCategory ? `محصولات دسته ${selectedCategory}` : 
              "محصولات ایرولیا شاپ"}
            </h1>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              مجموعه‌ای بی‌نظیر از محصولات هنری با کیفیت برتر برای زیباتر کردن فضای زندگی شما
            </p>
            
            {/* Live search field */}
            <div className="max-w-md mx-auto mt-6">
              <Input
                placeholder="جستجوی محصولات..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                className="w-full focus:border-primary focus:ring-primary transition-all"
              />
            </div>
          </div>
          
          {/* Advanced filters */}
          <ProductFilters 
            products={productsData}
            onFilterChange={handleFiltersChange}
            onSortChange={handleSortChange}
          />
          
          {/* Category Filter - Updated to include all 12 categories */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex flex-nowrap space-x-2 space-x-reverse pb-2">
              <Button 
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className="whitespace-nowrap hover-scale"
              >
                همه محصولات
              </Button>
              {allCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap hover-scale"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={() => addToCart(product)}
                isFavorite={isFavorite(product.id)}
                onFavoriteToggle={() => handleFavoriteToggle(product)}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-10 animate-fade-in">
              <p className="text-xl text-foreground/70">هیچ محصولی یافت نشد.</p>
            </div>
          )}
        </main>
      )}
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Products;
