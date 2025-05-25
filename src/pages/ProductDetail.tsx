import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Product, productsData } from "../models/Product";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { Heart, ShoppingCart, Share2, ChevronLeft, Star, Check, Truck, ShieldCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { GuestCheckout } from "@/components/GuestCheckout";
import { ProductComments } from "@/components/ProductComments";
import PriceTransparency from "@/components/PriceTransparency";
import { useToast } from "@/hooks/use-toast";
import LoadingScreen from '../components/LoadingScreen';
import ScrollToTop from "../components/ScrollToTop";

// Fix the issue with product type extending with quantity
interface CartProduct extends Product {
  quantity: number;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { toast } = useToast();
  const { addToCart, cart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    
    // Simulate API fetch delay
    setTimeout(() => {
      if (id) {
        const foundProduct = productsData.find(p => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
          
          // اضافه کردن به تاریخچه بازدید
          if (window.addToRecentlyViewed) {
            window.addToRecentlyViewed(foundProduct.id);
          }
          
          // Find related products from the same category
          const related = productsData
            .filter(p => p.id !== id && p.category === foundProduct.category)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "محصول به سبد خرید اضافه شد",
        description: `${product.title} به سبد خرید شما اضافه شد.`,
      });
    }
  };

  const handleBuyNow = () => {
    if (product) {
      if (!cart.find(item => item.id === product.id)) {
        addToCart(product, quantity);
      }
      setShowCheckoutForm(true);
      window.scrollTo({
        top: document.getElementById('checkout-section')?.offsetTop || 0,
        behavior: 'smooth'
      });
    }
  };

  const handleFavoriteToggle = () => {
    if (!product) return;
    
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
      toast({
        title: "از علاقه‌مندی‌ها حذف شد",
        description: `${product.title} از لیست علاقه‌مندی‌های شما حذف شد.`,
      });
    } else {
      addToFavorites(product);
      toast({
        title: "به علاقه‌مندی‌ها اضافه شد",
        description: `${product.title} به لیست علاقه‌مندی‌های شما اضافه شد.`,
      });
    }
  };

  const handleShare = () => {
    if (navigator.share && product) {
      navigator
        .share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "لینک کپی شد",
        description: "لینک این محصول در کلیپ‌بورد کپی شد.",
      });
    }
  };

  const handleCheckoutComplete = () => {
    toast({
      title: "خرید با موفقیت انجام شد",
      description: "سفارش شما با موفقیت ثبت شد و در اسرع وقت برای شما ارسال خواهد شد.",
    });
    navigate('/');
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-offwhite dark:bg-gray-900">
        <Navbar />
        <LoadingScreen />
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-offwhite dark:bg-gray-900">
        <Navbar />
        <div className="container-custom py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">محصول یافت نشد</h1>
          <p className="mb-6">متأسفانه محصول مورد نظر شما در سیستم موجود نیست.</p>
          <Button onClick={() => navigate('/products')}>بازگشت به صفحه محصولات</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite dark:bg-gray-900">
      <Navbar />
      <main className="container-custom py-12">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-primary transition-colors">خانه</Link>
          <ChevronLeft className="mx-2" size={14} />
          <Link to="/products" className="hover:text-primary transition-colors">محصولات</Link>
          <ChevronLeft className="mx-2" size={14} />
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-primary transition-colors">
            {product.category}
          </Link>
          <ChevronLeft className="mx-2" size={14} />
          <span className="text-foreground truncate max-w-[200px]">{product.title}</span>
        </div>

        {/* Product details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product images */}
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-border">
            <div className="h-96 overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">{product.title}</h1>
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <Star className="w-5 h-5 text-gray-300" />
                  <span className="mr-1 text-sm text-gray-600">(4.0)</span>
                </div>
                <Badge variant="outline" className="border-primary text-primary">
                  {product.category}
                </Badge>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-md">
              <div className="text-2xl font-bold text-primary">{formatPrice(product.price)}</div>
              <div className="flex items-center mt-1">
                <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                  موجود
                </div>
                <div className="mr-2 text-sm">
                  <span className="text-gray-600">کد محصول: </span>
                  <span className="font-medium">{product.id}</span>
                </div>
              </div>
            </div>

            <p className="text-foreground/80 leading-7">
              {product.description}
            </p>

            <Separator />

            {/* اضافه کردن کامپوننت شفافیت قیمت */}
            <PriceTransparency productPrice={product.price} />

            <Separator />

            {/* Quantity and actions */}
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="ml-4 text-foreground/80">تعداد:</span>
                <div className="flex items-center border border-border rounded-md">
                  <button
                    className="px-3 py-1 border-l border-border hover:bg-muted"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button
                    className="px-3 py-1 border-r border-border hover:bg-muted"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="ml-2" size={18} />
                  افزودن به سبد خرید
                </Button>
                
                <Button 
                  className="flex-1 bg-secondary hover:bg-secondary/90"
                  onClick={handleBuyNow}
                >
                  خرید مستقیم
                </Button>
                
                <Button 
                  variant="outline" 
                  className={`w-12 h-12 p-0 ${isFavorite(product.id) ? 'text-red-500' : 'text-gray-500'}`}
                  onClick={handleFavoriteToggle}
                >
                  <Heart size={20} fill={isFavorite(product.id) ? "currentColor" : "none"} />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-12 h-12 p-0 text-gray-500"
                  onClick={handleShare}
                >
                  <Share2 size={20} />
                </Button>
              </div>
            </div>

            {/* Shipping info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-border p-4 space-y-3">
              <div className="flex items-center">
                <Truck className="ml-3 text-primary" size={20} />
                <div>
                  <p className="font-medium">ارسال سریع</p>
                  <p className="text-sm text-gray-500">ارسال به سراسر کشور</p>
                </div>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="ml-3 text-primary" size={20} />
                <div>
                  <p className="font-medium">گارانتی اصالت و سلامت</p>
                  <p className="text-sm text-gray-500">تضمین کیفیت محصولات</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="description">توضیحات محصول</TabsTrigger>
            <TabsTrigger value="specifications">مشخصات فنی</TabsTrigger>
            <TabsTrigger value="comments">نظرات کاربران</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border">
            <h3 className="text-xl font-bold mb-4 text-primary">معرفی محصول</h3>
            <div className="prose prose-p:text-foreground/80 prose-headings:text-primary max-w-none">
              <p className="mb-4 leading-7">{product.description}</p>
              <p className="mb-4 leading-7">
                این محصول با استفاده از مواد اولیه مرغوب و توسط هنرمندان چیره‌دست ایرانی تولید شده است.
                طرح و نقش منحصر به فرد آن الهام گرفته از هنر اصیل ایرانی می‌باشد.
              </p>
              <h4 className="text-lg font-bold mt-6 mb-3">ویژگی‌های محصول</h4>
              <ul className="list-disc pr-6 space-y-2">
                <li>طراحی منحصر به فرد</li>
                <li>ساخت دست هنرمندان ایرانی</li>
                <li>استفاده از مواد اولیه با کیفیت</li>
                <li>مناسب برای هدیه و دکوراسیون منزل</li>
                <li>قابل شستشو و تمیز کردن</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border">
            <h3 className="text-xl font-bold mb-6 text-primary">مشخصات فنی</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 pl-10 font-medium bg-muted/30 w-1/3">دسته بندی</td>
                    <td className="py-3 pr-6">{product.category}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 pl-10 font-medium bg-muted/30">جنس</td>
                    <td className="py-3 pr-6">چوب درجه یک</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 pl-10 font-medium bg-muted/30">رنگ</td>
                    <td className="py-3 pr-6">طبیعی</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 pl-10 font-medium bg-muted/30">ابعاد</td>
                    <td className="py-3 pr-6">20 × 15 × 10 سانتی‌متر</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 pl-10 font-medium bg-muted/30">وزن</td>
                    <td className="py-3 pr-6">500 گرم</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="comments" className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border">
            <ProductComments productId={product.id} />
          </TabsContent>
        </Tabs>

        {/* Guest checkout section */}
        <div id="checkout-section" className="mb-16">
          {showCheckoutForm && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">تکمیل خرید</h2>
                <Button
                  variant="outline"
                  onClick={() => setShowCheckoutForm(false)}
                >
                  انصراف
                </Button>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">خلاصه سفارش</h3>
                <div className="bg-muted/30 p-4 rounded-md">
                  <div className="flex items-center mb-3">
                    <img 
                      src={product.imageUrl} 
                      alt={product.title} 
                      className="w-16 h-16 object-cover rounded-md ml-3"
                    />
                    <div>
                      <h4 className="font-medium">{product.title}</h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>تعداد: {quantity}</span>
                        <span className="mx-2">|</span>
                        <span>{formatPrice(product.price)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-medium">مبلغ قابل پرداخت:</span>
                    <span className="font-bold text-primary">{formatPrice(product.price * quantity)}</span>
                  </div>
                </div>
              </div>
              
              <GuestCheckout 
                cartItems={[{...product, quantity}] as CartProduct[]} 
                cartTotal={product.price * quantity} 
                onComplete={handleCheckoutComplete}
              />
            </div>
          )}
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-primary mb-6">محصولات مرتبط</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link 
                  key={relatedProduct.id} 
                  to={`/product/${relatedProduct.id}`} 
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={relatedProduct.imageUrl} 
                      alt={relatedProduct.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2 truncate">{relatedProduct.title}</h3>
                    <div className="text-primary font-bold">{formatPrice(relatedProduct.price)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default ProductDetail;
