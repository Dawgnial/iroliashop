
import React, { useState, useEffect } from 'react';
import { Product, productsData } from '../models/Product';
import { Button } from '@/components/ui/button';
import { History, X, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const BrowsingHistory = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    loadRecentlyViewed();
  }, []);

  const loadRecentlyViewed = () => {
    const viewed = localStorage.getItem('recentlyViewed');
    if (viewed) {
      const viewedIds = JSON.parse(viewed);
      const products = viewedIds
        .map((id: string) => productsData.find(p => p.id === id))
        .filter(Boolean)
        .slice(0, 6); // نمایش حداکثر ۶ محصول
      setRecentlyViewed(products);
      setIsVisible(products.length > 0);
    }
  };

  const addToRecentlyViewed = (productId: string) => {
    const viewed = localStorage.getItem('recentlyViewed');
    let viewedIds = viewed ? JSON.parse(viewed) : [];
    
    // حذف محصول از جایگاه قبلی (اگر وجود داشته)
    viewedIds = viewedIds.filter((id: string) => id !== productId);
    
    // اضافه کردن در ابتدای لیست
    viewedIds.unshift(productId);
    
    // نگه داشتن حداکثر ۲۰ محصول
    viewedIds = viewedIds.slice(0, 20);
    
    localStorage.setItem('recentlyViewed', JSON.stringify(viewedIds));
    loadRecentlyViewed();
  };

  const clearHistory = () => {
    localStorage.removeItem('recentlyViewed');
    setRecentlyViewed([]);
    setIsVisible(false);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  // تابع برای استفاده در سایر کامپوننت‌ها
  window.addToRecentlyViewed = addToRecentlyViewed;

  if (!isVisible || recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <History className="w-6 h-6 text-primary ml-3" />
            <div>
              <h2 className="text-2xl font-bold text-primary">
                بازدیدهای اخیر شما
              </h2>
              <p className="text-foreground/70">
                محصولاتی که اخیراً مشاهده کرده‌اید
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={clearHistory}
            className="text-sm"
          >
            <X className="w-4 h-4 ml-2" />
            پاک کردن تاریخچه
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recentlyViewed.map((product, index) => (
            <Link
              key={`${product.id}-${index}`}
              to={`/product/${product.id}`}
              className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                  <div className="bg-primary/90 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Eye className="w-3 h-3 ml-1" />
                    {index + 1}
                  </div>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-foreground text-sm line-clamp-2 mb-2">
                  {product.title}
                </h3>
                <p className="text-primary font-bold text-sm">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowsingHistory;
