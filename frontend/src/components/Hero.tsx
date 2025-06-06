
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Clock, X } from 'lucide-react';
import { SearchResult } from "@/types/search";
import { useDebouncedCallback } from "@/hooks/use-debounce";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // Images for the background slideshow - using uploaded pottery images
  const backgroundImages = [
    '/lovable-uploads/5d5f8301-8d6f-43d8-aa02-c8f6b80e1bc2.png',
    '/lovable-uploads/e0404461-abc0-46b3-a22e-31800e6f1eee.png',
    '/lovable-uploads/b22800d2-e73c-4166-a7af-cb01f94be66e.png'
  ];

  // Animation effect on load
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-rotate slideshow
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === backgroundImages.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);
    
    return () => clearInterval(slideInterval);
  }, []);

  // Debounced search function
  const debouncedSearch = useDebouncedCallback((query: string) => {
    if (query.trim().length >= 2) {
      setIsLoading(true);
      setShowResults(true);
      
      // Simulate search API call
      import('../models/Product').then(({ productsData }) => {
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
      setShowResults(false);
    }
  }, 300);

  // Update search results when query changes
  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setShowResults(false);
    setSearchQuery('');
    navigate(`/products?search=${encodeURIComponent(result.title)}`);
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background slideshow */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1500 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        
        {/* Enhanced gradient overlay with pottery/Persian theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/95 via-orange-800/80 to-red-900/70 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10"></div>
      </div>
      
      {/* Slide indicators with proper spacing and higher z-index */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-30">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
              currentSlide === index 
                ? 'bg-amber-300 border-amber-300 scale-125 shadow-lg shadow-amber-300/30' 
                : 'bg-transparent border-amber-200/60 hover:border-amber-200 hover:bg-amber-200/20'
            }`}
            aria-label={`رفتن به اسلاید ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Decorative elements with pottery theme colors */}
      <div className="absolute top-16 left-10 w-32 h-32 bg-amber-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-24 right-10 w-40 h-40 bg-orange-700/30 rounded-full blur-3xl animate-pulse delay-700"></div>
      
      {/* Content with animation */}
      <div className={`container-custom relative z-20 flex flex-col items-center text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 text-shadow-md leading-tight">
          هنر ایرانی در <span className="text-amber-200">خانه‌ی شما</span>
        </h1>
        <p className="text-xl md:text-2xl text-amber-100/90 mb-10 max-w-3xl font-vazir leading-relaxed">
          صنایع دستی و آثار هنری منحصر به فرد از هنرمندان برجسته‌ی ایرانی
        </p>
        
        {/* Search bar with enhanced styling and instant search - higher z-index */}
        <div className="w-full max-w-2xl mb-12 backdrop-blur-md rounded-full relative z-40">
          <form onSubmit={handleSearch} className="relative">
            <Input 
              type="text" 
              className="w-full py-7 px-8 pr-12 rounded-full shadow-2xl text-lg font-vazir border-amber-200/20 bg-white/15 text-white placeholder:text-amber-100/70 focus:border-amber-300 transition-all" 
              placeholder="جستجو میان هزاران محصول هنری..." 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
              onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
            />
            <Button 
              type="submit" 
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          {/* Search Results Dropdown with highest z-index */}
          {showResults && (searchResults.length > 0 || isLoading) && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-card rounded-md border border-border shadow-lg z-[9999] max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between px-4 py-2 border-b">
                <h4 className="text-sm font-medium text-primary">نتایج جستجو</h4>
                <button
                  onClick={() => setShowResults(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center p-4">
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="mr-2 text-sm text-gray-500">در حال جستجو...</span>
                </div>
              ) : (
                <div className="p-2">
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
              )}

              {!isLoading && searchResults.length === 0 && searchQuery.length >= 2 && (
                <div className="p-4 text-center">
                  <p className="text-sm text-gray-500">موردی یافت نشد.</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Features with improved styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl z-20 relative">
          {[
            {
              icon: "box",
              title: "صنایع دستی اصیل",
              desc: "محصولات دست‌ساز با کیفیت از هنرمندان برجسته سراسر ایران"
            },
            {
              icon: "truck",
              title: "ارسال سریع",
              desc: "تحویل سریع و مطمئن به سراسر کشور با بسته‌بندی استاندارد"
            },
            {
              icon: "shield",
              title: "ضمانت اصالت",
              desc: "تضمین کیفیت و اصالت تمامی محصولات با گارانتی برگشت وجه"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white/15 backdrop-blur-md p-6 rounded-xl shadow-xl border border-amber-200/20 hover-lift group transition-all duration-300"
            >
              <div className="w-16 h-16 bg-amber-200/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-200">
                  {feature.icon === "box" && <>
                    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
                    <path d="M16.5 9.4 7.55 4.24"></path>
                    <polyline points="3.29 7 12 12 20.71 7"></polyline>
                    <line x1="12" y1="22" x2="12" y2="12"></line>
                    <circle cx="18.5" cy="15.5" r="2.5"></circle>
                    <path d="M20.27 17.27 22 19"></path>
                  </>}
                  {feature.icon === "truck" && <>
                    <rect width="16" height="10" x="4" y="6" rx="2" />
                    <path d="M4 10h16" />
                    <circle cx="8" cy={19} r={2} />
                    <circle cx={16} r={2} cy={19} />
                    <path d="M10 19h4" />
                  </>}
                  {feature.icon === "shield" && <>
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </>}
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-white group-hover:scale-105 transition-all">{feature.title}</h3>
              <p className="text-amber-100/90 text-center font-vazir leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
