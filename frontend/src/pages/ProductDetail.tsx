
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Heart, Share2, AlertCircle } from "lucide-react";
import { Product } from "../models/Product";
import { productApi } from "../services/productApi";
import { useBasket } from "../hooks/useBasket";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const { addToBasket } = useBasket();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('شناسه محصول معتبر نیست');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await productApi.getProduct(id);
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('خطا در دریافت اطلاعات محصول');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToBasket({
      productId: product.id,
      quantity: quantity
    });
  };

  const handleAddToFavorites = () => {
    toast({
      title: "اضافه شد",
      description: "محصول به لیست علاقه‌مندی‌ها اضافه شد.",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "کپی شد",
        description: "لینک محصول کپی شد.",
      });
    }
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container-custom py-12">
          <div className="text-center">
            <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">خطا در بارگذاری محصول</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => window.location.href = '/products'} variant="outline">
              بازگشت به محصولات
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* تصویر محصول */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* اطلاعات محصول */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-persian-blue mb-4">
                {product.title}
              </h1>
              <p className="text-2xl font-bold text-green-primary mb-4">
                {formatPrice(product.price)}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">توضیحات محصول</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="quantity" className="font-medium">
                تعداد:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-persian-blue hover:bg-persian-blue/90"
              >
                <ShoppingCart className="ml-2" size={20} />
                افزودن به سبد خرید
              </Button>
              
              <Button
                onClick={handleAddToFavorites}
                variant="outline"
                size="icon"
              >
                <Heart size={20} />
              </Button>
              
              <Button
                onClick={handleShare}
                variant="outline"
                size="icon"
              >
                <Share2 size={20} />
              </Button>
            </div>

            <div className="border-t pt-6">
              <div className="space-y-2 text-sm text-gray-600">
                <p>🚚 ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان</p>
                <p>🔄 ضمانت بازگشت ۷ روزه</p>
                <p>🎯 محصول اصل و دست‌ساز</p>
                <p>📞 پشتیبانی ۲۴ ساعته</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
