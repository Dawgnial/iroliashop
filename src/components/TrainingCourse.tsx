
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const TrainingCourse = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleEnrollClick = () => {
    navigate("/courses");
  };
  
  return (
    <section id="training-course" className="py-16 bg-gradient-to-r from-clay to-offwhite dark:from-gray-800 dark:to-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-terracotta mb-4 text-shadow-md">دوره آموزشی سفالگری</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto font-vazir">
            فراگیری هنر سفالگری از مبتدی تا پیشرفته با مدرک معتبر فنی و حرفه‌ای
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-lg border-2 border-terracotta/20 hover:border-terracotta/40 transition-all duration-300 bg-offwhite/80 dark:bg-gray-800/50 backdrop-blur-sm hover-glow">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="md:col-span-1 h-full relative">
                {/* Background image with gradient overlay */}
                <div 
                  className="w-full h-full bg-cover bg-center relative"
                  style={{ backgroundImage: `url(/lovable-uploads/5b65700d-7ff9-4992-ba28-377fbadaadf0.png)` }}
                >
                  {/* Gradient overlay matching site theme */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 via-orange-800/50 to-terracotta/70"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
              <div className="md:col-span-2">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-2 text-terracotta mb-4">
                    <GraduationCap className="h-6 w-6" />
                    <span className="text-sm font-semibold font-vazir">با مدرک معتبر فنی و حرفه‌ای</span>
                  </div>
                  <h3 className="text-2xl font-bold text-terracotta mb-3 text-shadow-sm">
                    دوره جامع آموزش سفالگری
                  </h3>
                  <p className="text-foreground/80 mb-6 font-vazir">
                    این دوره جامع شامل آموزش تکنیک‌های پیشرفته سفالگری، لعاب‌کاری و کار با چرخ سفالگری است که توسط استادان برجسته این هنر ارائه می‌شود. پس از اتمام دوره، مدرک معتبر فنی و حرفه‌ای به شما اعطا خواهد شد.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2 font-vazir">
                        <span className="text-foreground/70">مدت دوره:</span>
                        <span className="font-medium text-foreground">۳ ماه (۳۶ جلسه)</span>
                      </div>
                      <div className="flex items-center gap-2 font-vazir">
                        <span className="text-foreground/70">شروع دوره بعدی:</span>
                        <span className="font-medium text-foreground">۱۵ خرداد ۱۴۰۴</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleEnrollClick} 
                      className="bg-terracotta hover:bg-opacity-90 w-full sm:w-auto text-white transition-all shadow-sm hover-scale"
                    >
                      ثبت‌نام در دوره
                    </Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TrainingCourse;
