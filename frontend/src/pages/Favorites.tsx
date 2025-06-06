
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useFavorites } from "../context/FavoritesContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container-custom py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-persian-blue mb-4">علاقه‌مندی‌های من</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            محصولاتی که به لیست علاقه‌مندی‌های خود اضافه کرده‌اید
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <AlertCircle className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-500 mb-4">لیست علاقه‌مندی‌های شما خالی است</h2>
            <p className="text-gray-500 mb-8">برای افزودن محصول به این لیست، روی آیکون قلب در صفحه محصولات کلیک کنید</p>
            <Button asChild className="bg-persian-blue hover:bg-persian-blue/90">
              <Link to="/products">مشاهده محصولات</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="bg-white/70 hover:bg-white/90 rounded-full text-red-500"
                      onClick={() => removeFromFavorites(product.id)}
                    >
                      <Heart size={18} fill="currentColor" />
                    </Button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-sm font-medium">{product.category}</span>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{product.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                  <p className="mt-2 font-bold text-persian-blue">{formatPrice(product.price)}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => addToCart(product)} 
                    className="w-full bg-persian-blue hover:bg-persian-blue/90"
                  >
                    <ShoppingCart className="ml-2" size={18} />
                    افزودن به سبد خرید
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
