
import { useProducts } from "../hooks/useProducts";
import { useBasket } from "../hooks/useBasket";
import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const FeaturedProducts = () => {
  const { products, loading, error } = useProducts();
  const { addToBasket } = useBasket();

  // نمایش ۶ محصول اول به عنوان محصولات ویژه
  const featuredProducts = products.slice(0, 6);

  const handleAddToCart = (productId: string) => {
    addToBasket({
      productId,
      quantity: 1
    });
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
              variant="outline"
            >
              تلاش مجدد
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-persian-blue mb-4">
            محصولات ویژه
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            بهترین محصولات دست‌ساز ایرانی را از صنعتگران ماهر کشور کشف کنید
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group">
              <ProductCard 
                product={product}
                onAddToCart={() => handleAddToCart(product.id)}
                isFavorite={false}
                onFavoriteToggle={() => {}}
              />
            </div>
          ))}
        </div>

        {products.length > 6 && (
          <div className="text-center mt-12">
            <Button 
              className="bg-persian-blue hover:bg-persian-blue/90 px-8 py-3"
              onClick={() => window.location.href = '/products'}
            >
              <ShoppingCart className="ml-2" size={20} />
              مشاهده تمام محصولات
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
