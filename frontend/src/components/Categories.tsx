
import { useCategories } from "../hooks/useCategories";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const Categories = () => {
  const { categories, loading, error } = useCategories();

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-green-light/20 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <Skeleton key={index} className="h-32 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-b from-green-light/20 to-white">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-green-light/20 to-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-persian-blue mb-4">
            دسته‌بندی محصولات
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            محصولات دست‌ساز ایرانی را در دسته‌بندی‌های مختلف کشف کنید
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6 text-center">
                {category.imageUrl && (
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden bg-green-light/20">
                    <img 
                      src={category.imageUrl} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-persian-blue group-hover:text-green-primary transition-colors">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {category.description}
                  </p>
                )}
                <Badge variant="secondary" className="mt-3 bg-green-light/30 text-green-primary border-0">
                  مشاهده محصولات
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
