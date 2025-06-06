
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "ثبت‌نام با موفقیت انجام شد",
        description: "از اشتراک شما در خبرنامه ما سپاسگزاریم.",
        variant: "default",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-persian-cream to-white dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto bg-white/50 dark:bg-gray-800/30 backdrop-blur-md p-12 rounded-3xl shadow-2xl border border-persian-dark/10 dark:border-white/5">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1 bg-persian-light/20 dark:bg-persian-dark/40 text-persian-dark dark:text-persian-light rounded-full text-sm font-medium mb-3">
              عضویت در خبرنامه
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-persian-dark dark:text-white mb-4 font-iranyekan">
              <span className="relative inline-block">
                از تخفیف‌ها و محصولات جدید باخبر شوید
                <span className="absolute bottom-1 left-0 w-full h-1 bg-persian-medium/30 rounded-full"></span>
              </span>
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 font-vazir max-w-2xl mx-auto">
              با عضویت در خبرنامه هنر زیبا، از آخرین محصولات، تخفیف‌های ویژه و رویدادهای هنری باخبر شوید.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-xl mx-auto gap-3">
            <div className="relative flex-grow">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ایمیل خود را وارد کنید"
                required
                className="w-full pr-10 py-6 font-vazir border-persian-medium/20 dark:border-persian-medium/40 focus:border-persian-dark bg-white/80 dark:bg-gray-800/80 rounded-xl"
                disabled={isSubmitting}
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-persian-dark hover:bg-persian-medium text-white sm:flex-shrink-0 font-vazir py-6 px-8 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></span>
                  <span>در حال ثبت...</span>
                </>
              ) : (
                <>
                  <span>عضویت در خبرنامه</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center font-vazir">
            ما به حریم خصوصی شما احترام می‌گذاریم و هرگز اطلاعات شما را به اشتراک نمی‌گذاریم.
          </p>
          
          {/* Trust badges */}
          <div className="flex justify-center items-center gap-6 mt-10">
            <div className="w-12 h-12 bg-white/90 dark:bg-gray-700 rounded-full flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-persian-dark dark:text-persian-light">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className="w-12 h-12 bg-white/90 dark:bg-gray-700 rounded-full flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-persian-dark dark:text-persian-light">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className="w-12 h-12 bg-white/90 dark:bg-gray-700 rounded-full flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-persian-dark dark:text-persian-light">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
