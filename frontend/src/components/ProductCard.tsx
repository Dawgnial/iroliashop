
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Product } from "../models/Product";
import { useToast } from "@/hooks/use-toast";
import ProductQuickView from "./ProductQuickView";

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

const ProductCard = ({ product, onAddToCart, isFavorite, onFavoriteToggle }: ProductCardProps) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const { toast } = useToast();
  
  const isAvailable = product.price > 0;
  
  const formatPrice = (price: number) => {
    if (price === 0) {
      return 'ناموجود';
    }
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const handleAddToCart = () => {
    if (!isAvailable) {
      toast({
        title: "محصول ناموجود",
        description: `${product.title} در حال حاضر موجود نیست.`,
        variant: "destructive",
      });
      return;
    }
    onAddToCart();
    toast({
      title: "محصول به سبد خرید اضافه شد",
      description: `${product.title} به سبد خرید شما اضافه شد.`,
      variant: "default",
    });
  };

  const handleFavoriteToggle = () => {
    onFavoriteToggle();
    if (!isFavorite) {
      toast({
        title: "به علاقه‌مندی‌ها اضافه شد",
        description: `${product.title} به لیست علاقه‌مندی‌های شما اضافه شد.`,
        variant: "default",
      });
    }
  };

  // Clean description from extra text
  const cleanDescription = (description: string) => {
    const unwantedTexts = [
      "این محصول با استفاده از مواد اولیه مرغوب و توسط هنرمندان ماهر ایرانی تولید شده است. طرح و نقش منحصر به فرد آن الهام گرفته از هنر اصیل ایرانی بوده و برای تزئین فضاهای داخلی مناسب می‌باشد.",
      "ویژگی‌های محصول",
      "ساخت دست هنرمندان ایرانی",
      "استفاده از مواد اولیه با کیفیت",
      "طراحی منحصر به فرد و اصیل",
      "مناسب برای هدیه و دکوراسیون"
    ];
    
    let cleanedDescription = description;
    unwantedTexts.forEach(text => {
      cleanedDescription = cleanedDescription.replace(text, '').trim();
    });
    
    // Remove extra whitespace and line breaks
    cleanedDescription = cleanedDescription.replace(/\s+/g, ' ').trim();
    
    return cleanedDescription;
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-offwhite dark:bg-gray-800 hover-lift">
        <div className="relative h-56 overflow-hidden group">
          <img 
            src={product.imageUrl} 
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {!isAvailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-lg font-bold bg-red-600 px-3 py-1 rounded">ناموجود</span>
            </div>
          )}
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`bg-white/70 hover:bg-white/90 dark:bg-gray-700/70 dark:hover:bg-gray-700/90 rounded-full ${isFavorite ? 'text-red-500' : 'text-terracotta'} hover-scale`}
              onClick={handleFavoriteToggle}
            >
              <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-white/70 hover:bg-white/90 dark:bg-gray-700/70 dark:hover:bg-gray-700/90 rounded-full text-terracotta hover-scale"
              onClick={() => setShowQuickView(true)}
            >
              <Eye size={18} />
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <span className="text-white text-sm font-medium">{product.category}</span>
          </div>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-foreground">{product.title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-stone line-clamp-2">{cleanDescription(product.description)}</p>
          <p className={`mt-2 font-bold ${isAvailable ? 'text-terracotta' : 'text-red-600'}`}>
            {formatPrice(product.price)}
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleAddToCart} 
            disabled={!isAvailable}
            className={`w-full ${isAvailable 
              ? 'bg-terracotta hover:bg-terracotta/90 hover-scale' 
              : 'bg-gray-400 cursor-not-allowed opacity-50'
            }`}
          >
            <ShoppingCart className="ml-2" size={18} />
            {isAvailable ? 'افزودن به سبد خرید' : 'ناموجود'}
          </Button>
        </CardFooter>
      </Card>

      {/* Quick View Modal */}
      <ProductQuickView
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
        onAddToCart={handleAddToCart}
        isFavorite={isFavorite}
        onFavoriteToggle={handleFavoriteToggle}
      />
    </>
  );
};

export default ProductCard;
