import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
interface Product {
  id: string;
  name: string;
  artist: string;
  price: number;
  discountPrice?: number;
  image: string;
  rating: number;
  isNew?: boolean;
  isSpecialOffer?: boolean;
  category?: string;
}
const products: Product[] = [{
  id: "1",
  name: "کاسه سفالی نقش برجسته",
  artist: "استاد محمدی",
  price: 540000,
  discountPrice: 480000,
  image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  rating: 4.8,
  isNew: true,
  category: "سفال"
}, {
  id: "2",
  name: "گلدان میناکاری شده",
  artist: "استاد رضایی",
  price: 890000,
  image: "https://images.unsplash.com/photo-1612196808214-b7e239b5db0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  rating: 4.6,
  category: "میناکاری"
}, {
  id: "3",
  name: "تابلو فرش نفیس",
  artist: "استاد احمدی",
  price: 1250000,
  discountPrice: 1100000,
  image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  rating: 4.9,
  isSpecialOffer: true,
  category: "فرش"
}, {
  id: "4",
  name: "قلمدان خاتم کاری",
  artist: "استاد کریمی",
  price: 670000,
  image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  rating: 4.7,
  isNew: true,
  category: "خاتم‌کاری"
}, {
  id: "5",
  name: "ظرف مسی قلمزنی شده",
  artist: "استاد جعفری",
  price: 780000,
  discountPrice: 680000,
  image: "https://images.unsplash.com/photo-1608279313954-d0f7c4056f9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  rating: 4.5,
  isSpecialOffer: true,
  category: "قلمزنی"
}, {
  id: "6",
  name: "گلیم دستباف سنتی",
  artist: "استاد حسینی",
  price: 920000,
  image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  rating: 4.6,
  category: "فرش"
}, {
  id: "7",
  name: "کوزه سفالی نقاشی شده",
  artist: "استاد علیزاده",
  price: 450000,
  image: "https://images.unsplash.com/photo-1578749556568-bc2c481b931b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  rating: 4.4,
  category: "سفال"
}, {
  id: "8",
  name: "جعبه جواهرات خاتم",
  artist: "استاد موسوی",
  price: 860000,
  discountPrice: 750000,
  image: "https://images.unsplash.com/photo-1567361672830-41a9847d8784?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  rating: 4.8,
  isSpecialOffer: true,
  category: "خاتم‌کاری"
}];

// Prepare product for favorites/cart
const productToModelProduct = (product: Product) => {
  return {
    id: product.id,
    title: product.name,
    price: product.discountPrice || product.price,
    description: `اثر هنری ${product.name} ساخته ${product.artist}`,
    category: product.category || "متفرقه",
    imageUrl: product.image
  };
};

// Format price in Toman
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
};

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleAddToCart = (product: Product) => {
    addToCart(productToModelProduct(product));
  };

  const handleFavoriteToggle = (product: Product) => {
    const modelProduct = productToModelProduct(product);
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(modelProduct);
    }
  };

  const handleViewAllProducts = () => {
    navigate('/products');
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <section id="products" className="py-16 bg-texture-medium">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-persian-dark mb-4 text-shadow-md">محصولات ویژه</h2>
          <p className="text-lg text-persian-dark/80 max-w-2xl mx-auto font-vazir">
            برترین صنایع دستی و آثار هنری ایرانی، ساخته شده توسط استادان برجسته سراسر ایران
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <Card 
              key={product.id} 
              className="group overflow-hidden border border-persian-light/40 hover:border-persian-medium hover:shadow-md transition-all duration-300 bg-white/90 backdrop-blur-sm"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <button 
                  className={`absolute top-3 left-3 bg-white p-2 rounded-full ${
                    isFavorite(product.id) ? 'text-red-500' : 'text-persian-dark hover:text-persian-medium'
                  } transition-colors shadow-sm`} 
                  onClick={() => handleFavoriteToggle(product)}
                >
                  <Heart size={20} fill={isFavorite(product.id) ? "currentColor" : "none"} />
                </button>
                
                {/* Product badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge className="bg-persian-medium hover:bg-persian-medium text-white shadow-sm">جدید</Badge>
                  )}
                  {product.isSpecialOffer && (
                    <Badge className="bg-persian-dark hover:bg-persian-dark text-white shadow-sm">پیشنهاد ویژه</Badge>
                  )}
                </div>
              </div>
              
              <CardContent className="pt-4">
                <h3 className="font-semibold text-persian-dark mb-1 text-shadow-sm">{product.name}</h3>
                <p className="text-sm text-persian-dark/80 mb-2 font-vazir">هنرمند: {product.artist}</p>
                
                <div className="flex items-center mb-3">
                  <div className="flex text-persian-light">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} className="text-gray-300" />
                  </div>
                  <span className="text-sm text-persian-dark/80 mr-1">{product.rating}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    {product.discountPrice ? (
                      <>
                        <span className="text-persian-dark font-bold">{formatPrice(product.discountPrice)}</span>
                        <span className="text-gray-400 text-sm line-through mr-2">{formatPrice(product.price)}</span>
                      </>
                    ) : (
                      <span className="text-persian-dark font-bold">{formatPrice(product.price)}</span>
                    )}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button 
                  className="w-full bg-persian-dark hover:bg-persian-medium text-white shadow-sm" 
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="ml-2" size={18} />
                  افزودن به سبد
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            className="bg-persian-medium hover:bg-persian-dark text-white shadow-sm" 
            onClick={handleViewAllProducts}
          >
            مشاهده همه محصولات
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
