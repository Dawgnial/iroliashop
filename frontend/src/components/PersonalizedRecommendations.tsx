
import React, { useState, useEffect } from 'react';
import { Product, productsData } from '../models/Product';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { Sparkles, TrendingUp, Eye } from 'lucide-react';

interface RecommendationSection {
  title: string;
  icon: React.ComponentType<any>;
  products: Product[];
  description: string;
}

const PersonalizedRecommendations = () => {
  const [recommendations, setRecommendations] = useState<RecommendationSection[]>([]);
  const { addToCart, cart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    // شبیه‌سازی الگوریتم پیشنهاد محصولات
    const generateRecommendations = () => {
      const recentlyViewed = getRecentlyViewedProducts();
      const cartCategories = getCartCategories();
      const popularProducts = getPopularProducts();
      
      const sections: RecommendationSection[] = [];

      // محصولات مرتبط با سبد خرید
      if (cartCategories.length > 0) {
        const relatedProducts = productsData
          .filter(p => cartCategories.includes(p.category) && !cart.some(c => c.id === p.id))
          .slice(0, 4);
        
        if (relatedProducts.length > 0) {
          sections.push({
            title: 'محصولات مرتبط با سبد خرید شما',
            icon: Sparkles,
            products: relatedProducts,
            description: 'بر اساس محصولات موجود در سبد خرید شما'
          });
        }
      }

      // محصولات پربازدید
      sections.push({
        title: 'محصولات پربازدید',
        icon: TrendingUp,
        products: popularProducts,
        description: 'محصولاتی که بیشترین توجه را جلب کرده‌اند'
      });

      // محصولات مشابه آخرین بازدید
      if (recentlyViewed.length > 0) {
        const lastViewed = recentlyViewed[0];
        const similarProducts = productsData
          .filter(p => p.category === lastViewed.category && p.id !== lastViewed.id)
          .slice(0, 4);
        
        if (similarProducts.length > 0) {
          sections.push({
            title: `محصولات مشابه ${lastViewed.title}`,
            icon: Eye,
            products: similarProducts,
            description: 'بر اساس آخرین محصول بازدید شده'
          });
        }
      }

      setRecommendations(sections);
    };

    generateRecommendations();
  }, [cart]);

  const getRecentlyViewedProducts = (): Product[] => {
    // شبیه‌سازی محصولات بازدید شده اخیر از localStorage
    const viewed = localStorage.getItem('recentlyViewed');
    if (viewed) {
      const viewedIds = JSON.parse(viewed);
      return viewedIds.map((id: string) => productsData.find(p => p.id === id)).filter(Boolean);
    }
    return [];
  };

  const getCartCategories = (): string[] => {
    return [...new Set(cart.map(item => item.category))];
  };

  const getPopularProducts = (): Product[] => {
    // شبیه‌سازی محصولات محبوب بر اساس قیمت (در یک سیستم واقعی از آمار واقعی استفاده می‌شود)
    return [...productsData]
      .sort((a, b) => b.price - a.price)
      .slice(0, 4);
  };

  const handleFavoriteToggle = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-16">
      {recommendations.map((section, sectionIndex) => (
        <section key={sectionIndex} className="py-8">
          <div className="container-custom">
            <div className="flex items-center mb-8">
              <section.icon className="w-8 h-8 text-primary ml-3" />
              <div>
                <h2 className="text-2xl font-bold text-primary">
                  {section.title}
                </h2>
                <p className="text-foreground/70 mt-1">
                  {section.description}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {section.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => addToCart(product)}
                  isFavorite={isFavorite(product.id)}
                  onFavoriteToggle={() => handleFavoriteToggle(product)}
                />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default PersonalizedRecommendations;
