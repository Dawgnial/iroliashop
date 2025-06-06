
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface Artisan {
  id: number;
  name: string;
  specialty: string;
  location: string;
  image: string;
  rating: number;
  productCount: number;
  isMaster?: boolean;
}

const artisans: Artisan[] = [
  {
    id: 1,
    name: "استاد رضا محمدی",
    specialty: "سفال و سرامیک",
    location: "اصفهان",
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.9,
    productCount: 42,
    isMaster: true
  },
  {
    id: 2,
    name: "سارا حسینی",
    specialty: "میناکاری",
    location: "شیراز",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.7,
    productCount: 28
  },
  {
    id: 3,
    name: "استاد علی رضایی",
    specialty: "خاتم کاری",
    location: "تبریز",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.8,
    productCount: 36,
    isMaster: true
  },
  {
    id: 4,
    name: "مریم کریمی",
    specialty: "قالی‌بافی",
    location: "کاشان",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.6,
    productCount: 24
  }
];

const FeaturedArtisans = () => {
  return (
    <section id="sellers" className="py-16 bg-gradient-to-r from-persian-blue to-persian-turquoise">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">هنرمندان برجسته</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            با هنرمندان برتر ایرانی آشنا شوید و آثار منحصر به فرد آنها را کشف کنید
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artisans.map((artisan) => (
            <Card 
              key={artisan.id} 
              className="bg-white/10 backdrop-blur-sm border-none hover:bg-white/20 transition-colors"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <Avatar className="w-24 h-24 border-4 border-white/50">
                    <AvatarImage src={artisan.image} alt={artisan.name} />
                    <AvatarFallback>{artisan.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>
                
                <h3 className="font-bold text-white text-lg mb-1">{artisan.name}</h3>
                <p className="text-white/80 mb-2">{artisan.specialty}</p>
                
                <div className="flex items-center justify-center mb-3">
                  <div className="flex text-persian-gold">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} className={artisan.rating >= 4.8 ? "text-persian-gold" : "text-white/30"} fill={artisan.rating >= 4.8 ? "currentColor" : "none"} />
                  </div>
                  <span className="text-sm text-white/80 mr-1">{artisan.rating}</span>
                </div>
                
                <div className="flex justify-center items-center space-x-2 space-x-reverse mb-4">
                  <Badge variant="outline" className="text-white border-white/40">
                    {artisan.location}
                  </Badge>
                  <Badge variant="outline" className="text-white border-white/40">
                    {artisan.productCount} محصول
                  </Badge>
                  {artisan.isMaster && (
                    <Badge className="bg-persian-gold text-persian-blue">
                      استاد برجسته
                    </Badge>
                  )}
                </div>
                
                <a 
                  href={`#artisan-${artisan.id}`}
                  className="block text-white hover:text-persian-gold transition-colors"
                >
                  مشاهده پروفایل و محصولات
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a
            href="#all-artisans"
            className="inline-block px-6 py-3 bg-white text-persian-blue rounded-md hover:bg-persian-gold transition-colors"
          >
            مشاهده همه هنرمندان
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtisans;
