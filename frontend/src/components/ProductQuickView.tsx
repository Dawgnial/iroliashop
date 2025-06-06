
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, X } from "lucide-react";
import { Product } from "../models/Product";

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

const ProductQuickView = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart, 
  isFavorite, 
  onFavoriteToggle 
}: ProductQuickViewProps) => {
  if (!product) return null;

  const isAvailable = product.price > 0;

  const formatPrice = (price: number) => {
    if (price === 0) {
      return 'ناموجود';
    }
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-gray-800/90 rounded-full p-2 hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-lg"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="relative h-96 md:h-[600px] overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-terracotta hover:bg-terracotta text-white">
                  {product.category}
                </Badge>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-8 bg-gradient-to-br from-offwhite to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <DialogHeader className="text-right mb-6">
                <DialogTitle className="text-2xl md:text-3xl font-bold text-terracotta mb-2">
                  {product.title}
                </DialogTitle>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                    <span className="text-sm text-stone mr-2">(4.2)</span>
                  </div>
                  <div className={`text-2xl font-bold ${isAvailable ? 'text-terracotta' : 'text-red-600'}`}>
                    {formatPrice(product.price)}
                  </div>
                </div>
              </DialogHeader>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">توضیحات محصول</h3>
                <p className="text-stone leading-relaxed text-justify">
                  {product.description}
                </p>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-3">مشخصات</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <span className="text-stone">دسته‌بندی:</span>
                    <span className="font-medium text-foreground mr-2">{product.category}</span>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <span className="text-stone">کد محصول:</span>
                    <span className="font-medium text-foreground mr-2">{product.id}</span>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <span className="text-stone">وضعیت:</span>
                    <span className={`font-medium mr-2 ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                      {isAvailable ? 'موجود' : 'ناموجود'}
                    </span>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <span className="text-stone">ارسال:</span>
                    <span className="font-medium text-foreground mr-2">سریع</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={onAddToCart}
                  disabled={!isAvailable}
                  className={`flex-1 font-medium py-3 ${isAvailable 
                    ? 'bg-terracotta hover:bg-terracotta/90 text-white' 
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="ml-2" size={18} />
                  {isAvailable ? 'افزودن به سبد خرید' : 'ناموجود'}
                </Button>
                <Button 
                  onClick={onFavoriteToggle}
                  variant="outline"
                  className={`px-4 py-3 ${isFavorite ? 'text-red-500 border-red-500' : 'text-stone border-stone'}`}
                >
                  <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                </Button>
              </div>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <div className="flex flex-wrap gap-4 text-xs text-stone">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full ml-2"></div>
                    گارانتی اصالت
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full ml-2"></div>
                    ارسال سریع
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-purple-500 rounded-full ml-2"></div>
                    پشتیبانی ۲۴/۷
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
