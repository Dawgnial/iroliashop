
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import ImageViewer from "./ImageViewer";

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  count: number;
}

const allCategories: Category[] = [
  {
    id: 1,
    name: "انواع گل",
    description: "انواع گل‌های سرامیکی و تزئینی",
    image: "/lovable-uploads/ec2ede37-a770-4cac-a57b-b1e73733d47c.png",
    count: 24
  },
  {
    id: 2,
    name: "انواع استین",
    description: "استین‌های با کیفیت برای رنگ آمیزی سرامیک",
    image: "/lovable-uploads/100e7bc3-3774-436b-a96e-708eda69ac63.png",
    count: 18
  },
  {
    id: 3,
    name: "انواع لعاب براشینگ",
    description: "لعاب‌های براشینگ با کیفیت و متنوع",
    image: "/lovable-uploads/467cf13d-00cf-48dd-9fb9-4db6e42bc4d2.png",
    count: 32
  },
  {
    id: 4,
    name: "انواع لاستر",
    description: "لاسترهای متنوع برای دکوراسیون سرامیک",
    image: "https://images.unsplash.com/photo-1616711906333-23cf1f5bd9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    count: 15
  },
  {
    id: 5,
    name: "انواع اکسیدهای فلزات",
    description: "اکسیدهای فلزی برای رنگ آمیزی و لعاب",
    image: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    count: 20
  },
  {
    id: 6,
    name: "انواع اندرگلیز",
    description: "اندرگلیزهای با کیفیت برای زیرسازی",
    image: "/lovable-uploads/3267c38b-e454-4710-b05e-f426faecfbee.png",
    count: 27
  },
  {
    id: 7,
    name: "انواع ترانسفر",
    description: "ترانسفرهای متنوع برای طرح‌های پیچیده",
    image: "/lovable-uploads/892c0b11-de4a-4d2e-bbec-bc7838fbd8e3.png",
    count: 22
  },
  {
    id: 8,
    name: "انواع دوغاب ها",
    description: "دوغاب‌های مختلف برای قالب‌گیری",
    image: "/lovable-uploads/31417e98-9f5d-4377-ab8d-ddf285b637d1.png",
    count: 16
  },
  {
    id: 9,
    name: "انواع ابزار هنری",
    description: "ابزارهای متنوع برای کار با سفال و سرامیک",
    image: "/lovable-uploads/980fea77-947c-4031-ae7e-b7700ed61e90.png",
    count: 30
  },
  {
    id: 10,
    name: "انواع قالب ها",
    description: "قالب‌های متنوع برای ساخت سفال",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    count: 25
  },
  {
    id: 11,
    name: "انواع لعاب",
    description: "لعاب‌های متنوع برای پوشش سفال",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    count: 28
  },
  {
    id: 12,
    name: "انواع محصولات نسوز",
    description: "محصولات نسوز برای کوره‌های سرامیک",
    image: "https://images.unsplash.com/photo-1635952165412-75ad4af3c590?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    count: 19
  }
];

const Categories = () => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const navigate = useNavigate();
  
  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  // Show first 6 categories initially, show all when button is clicked
  const displayCategories = showAllCategories ? allCategories : allCategories.slice(0, 6);

  return (
    <section id="categories" className="pt-8 bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">دسته‌بندی محصولات</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            مجموعه متنوعی از محصولات و ابزارهای سرامیک و سفال را کشف کنید
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCategories.map((category) => (
            <Card 
              key={category.id} 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 bg-card text-card-foreground relative group"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ImageViewer 
                    imageSrc={category.image}
                    imageAlt={category.name}
                    categoryName={category.name}
                  />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{category.name}</h3>
                <p className="text-foreground/80 mb-4">{category.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{category.count} محصول</span>
                  <span className="text-primary hover:text-primary/80 transition-colors">مشاهده محصولات &rarr;</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center pb-16">
          <Button 
            onClick={() => setShowAllCategories(!showAllCategories)}
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            {showAllCategories ? (
              <>
                <ChevronUp className="ml-2" size={18} />
                نمایش کمتر
              </>
            ) : (
              <>
                <ChevronDown className="ml-2" size={18} />
                مشاهده همه دسته بندی ها
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
