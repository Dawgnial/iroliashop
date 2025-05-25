
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { X, Search, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { SearchResult } from "@/types/search";
import { useDebouncedCallback } from "@/hooks/use-debounce";

interface SearchBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchBox = ({ isOpen, onClose }: SearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (query: string) => {
    if (!query.trim()) return;
    
    const updatedSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  // Clear all recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Debounced search function
  const debouncedSearch = useDebouncedCallback((query: string) => {
    if (query.trim().length >= 2) {
      setIsLoading(true);
      
      // Simulate search API call
      import('../../models/Product').then(({ productsData }) => {
        const filteredProducts = productsData
          .filter(product => 
            product.title.toLowerCase().includes(query.toLowerCase()) || 
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5)
          .map(product => ({
            id: String(product.id),
            title: product.title,
            imageUrl: product.imageUrl,
            category: product.category
          }));
        
        setSearchResults(filteredProducts);
        setIsLoading(false);
      });
    } else {
      setSearchResults([]);
    }
  }, 300);

  // Update search results when query changes
  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      onClose();
      setSearchQuery('');
      toast({
        title: "جستجو انجام شد",
        description: `نتایج جستجو برای "${searchQuery}" نمایش داده می‌شود`,
      });
    }
  };

  const handleResultClick = (result: SearchResult) => {
    saveRecentSearch(result.title);
    onClose();
    setSearchQuery('');
    navigate(`/products?search=${encodeURIComponent(result.title)}`);
  };

  const handleRecentSearchClick = (query: string) => {
    navigate(`/products?search=${encodeURIComponent(query)}`);
    saveRecentSearch(query); // Move to top of recent searches
    onClose();
    toast({
      title: "جستجو انجام شد",
      description: `نتایج جستجو برای "${query}" نمایش داده می‌شود`,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="py-4 border-t border-gray-100 animate-fade-in">
      <form onSubmit={handleSearch} className="relative flex items-center">
        <div className="absolute right-2 text-gray-400">
          <Search size={20} />
        </div>
        <Input
          ref={inputRef}
          className="w-full pr-10 pl-10 py-2 rounded-lg border focus:border-primary focus:ring-primary"
          placeholder="جستجو در محصولات..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete="off"
        />
        <button
          type="button"
          onClick={onClose}
          className="absolute left-2 text-gray-400 hover:text-gray-600"
          aria-label="بستن جستجو"
        >
          <X size={20} />
        </button>
      </form>

      {/* Combined search results & suggestions */}
      {(searchResults.length > 0 || (recentSearches.length > 0 && !searchQuery)) && (
        <div className="absolute mt-2 w-full bg-white dark:bg-card rounded-md border border-border shadow-lg z-50 max-h-96 overflow-y-auto">
          {/* Recent searches */}
          {recentSearches.length > 0 && !searchQuery && (
            <div className="px-2 py-2">
              <div className="flex items-center justify-between px-2 py-1">
                <h4 className="text-sm font-medium text-primary">جستجوهای اخیر</h4>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-500 hover:text-primary"
                >
                  پاک کردن
                </button>
              </div>
              
              {recentSearches.map((query, index) => (
                <button 
                  key={`recent-${index}`}
                  className="flex items-center w-full p-2 hover:bg-muted rounded-md text-right"
                  onClick={() => handleRecentSearchClick(query)}
                >
                  <Clock className="ml-2 text-gray-400" size={16} />
                  <span className="text-sm">{query}</span>
                </button>
              ))}
              
              <div className="border-t border-border my-2"></div>
            </div>
          )}

          {/* Live search results */}
          {isLoading ? (
            <div className="flex justify-center items-center p-4">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="mr-2 text-sm text-gray-500">در حال جستجو...</span>
            </div>
          ) : (
            searchResults.length > 0 && (
              <div className="p-2">
                <h4 className="text-sm font-medium text-primary px-2 py-1">نتایج جستجو</h4>
                {searchResults.map((result) => (
                  <div 
                    key={result.id}
                    className="flex items-center p-2 hover:bg-muted rounded-md cursor-pointer transition-colors"
                    onClick={() => handleResultClick(result)}
                  >
                    <img 
                      src={result.imageUrl} 
                      alt={result.title} 
                      className="w-12 h-12 object-cover rounded-md mr-0 ml-3" 
                    />
                    <div>
                      <h4 className="text-sm font-medium">{result.title}</h4>
                      <p className="text-xs text-stone">{result.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {/* No results state */}
          {searchQuery.length >= 2 && !isLoading && searchResults.length === 0 && (
            <div className="p-4 text-center">
              <p className="text-sm text-gray-500">موردی یافت نشد.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
