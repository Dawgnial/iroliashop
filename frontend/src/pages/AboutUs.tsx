
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, MapPin, Clock, HelpCircle, User } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  const location = useLocation();
  const contactRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (location.hash === "#contact" && contactRef.current) {
      setTimeout(() => {
        contactRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // If no hash or hash is not #contact, scroll to top
      window.scrollTo(0, 0);
    }
  }, [location]);

  const faqs = [
    {
      question: "روش‌های پرداخت در ایرولیا شاپ چیست؟",
      answer: "شما می‌توانید از طریق درگاه‌های آنلاین، کارت به کارت یا پرداخت در محل (برای تهران) هزینه محصول را پرداخت کنید."
    },
    {
      question: "زمان ارسال محصولات چقدر است؟",
      answer: "بین ۲ تا ۷ روز کاری بسته به منطقه‌ی جغرافیایی شما متغیر است. برای تهران معمولاً ۲ تا ۳ روز کاری و برای شهرستان‌ها ۳ تا ۷ روز کاری زمان می‌برد."
    },
    {
      question: "آیا امکان مرجوع کردن محصول وجود دارد؟",
      answer: "بله، تا ۷ روز پس از دریافت محصول، در صورت عدم استفاده و سالم بودن بسته‌بندی، می‌توانید محصول را مرجوع کنید."
    },
    {
      question: "آیا محصولات گارانتی دارند؟",
      answer: "بله، اکثر محصولات ما دارای گارانتی اصالت و کیفیت هستند. جزئیات گارانتی هر محصول در صفحه محصول ذکر شده است."
    },
    {
      question: "هزینه ارسال چقدر است؟",
      answer: "برای خریدهای بالای ۵۰۰ هزار تومان، ارسال رایگان است. برای خریدهای کمتر، هزینه ارسال بین ۲۰ تا ۵۰ هزار تومان متغیر است."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">درباره ایرولیا شاپ</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              ایرولیا شاپ با هدف معرفی و ارائه صنایع دستی ایرانی با کیفیت، از سال ۱۳۸۵ فعالیت خود را آغاز کرده و امروز افتخار دارد بزرگترین مجموعه آنلاین صنایع دستی ایران باشد.
            </p>
          </div>
          
          {/* About Image with Gradient */}
          <div className="relative h-80 md:h-96 overflow-hidden rounded-lg mb-12">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-accent/30 to-secondary/40 z-10"></div>
            <img 
              src="/lovable-uploads/d72d0be6-dc6e-449b-8bfd-d8baa9717fbb.png" 
              alt="هنر سفالگری و مجسمه سازی" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Our Story */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">داستان ما</h2>
            <p className="text-muted-foreground mb-4">
              ایرولیا شاپ، با بیش از ۱۵ سال سابقه در زمینه تولید و عرضه صنایع دستی، توانسته با همکاری بیش از ۸۰۰ هنرمند و استاد صنایع دستی در سراسر ایران، مجموعه‌ای منحصر به فرد از هنرهای سنتی ایرانی را گرد هم آورد.
            </p>
            <p className="text-muted-foreground">
              هدف ما حفظ و ترویج هنرهای اصیل ایرانی و حمایت از هنرمندان این عرصه است. تمام محصولات ما دست‌ساز و با بهترین کیفیت تهیه می‌شوند و ما افتخار می‌کنیم که پلی بین هنرمندان ایرانی و علاقه‌مندان به هنر در سراسر دنیا هستیم.
            </p>
          </div>
          
          {/* FAQs */}
          <div className="mb-12" id="faq">
            <h2 className="text-2xl font-bold text-foreground mb-6">سوالات متداول</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-right">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <HelpCircle className="w-5 h-5 text-primary" />
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          {/* Contact Info */}
          <div className="mb-12 bg-card p-6 rounded-lg" ref={contactRef} id="contact">
            <h2 className="text-2xl font-bold text-foreground mb-6">راه‌های ارتباطی</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="bg-muted p-3 rounded-full">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">تلفن تماس</h3>
                  <p className="text-muted-foreground">۰۲۱-۸۸۷۷۶۶۵۵</p>
                  <p className="text-muted-foreground">۰۹۱۲۳۴۵۶۷۸۹</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="bg-muted p-3 rounded-full">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">پست الکترونیکی</h3>
                  <p className="text-muted-foreground">info@iroliashop.com</p>
                  <p className="text-muted-foreground">support@iroliashop.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="bg-muted p-3 rounded-full">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">آدرس</h3>
                  <p className="text-muted-foreground">تهران، خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۲۴۵۶، طبقه سوم</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="bg-muted p-3 rounded-full">
                  <Clock className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">ساعات کاری</h3>
                  <p className="text-muted-foreground">شنبه تا چهارشنبه: ۹ صبح تا ۶ عصر</p>
                  <p className="text-muted-foreground">پنجشنبه: ۹ صبح تا ۱ بعد از ظهر</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">موقعیت ما روی نقشه</h2>
            <div className="h-80 bg-card rounded-lg overflow-hidden">
              <a 
                href="https://nshn.ir/9csb1pWG5JB3FD" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full h-full flex items-center justify-center"
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 flex items-center justify-center">
                    <Button variant="outline" className="bg-card hover:bg-card/90">
                      <MapPin className="mr-2" size={18} />
                      مشاهده در نقشه نشان
                    </Button>
                  </div>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.5238162916255!2d51.41646571144789!3d35.715945680009175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0175ac9b613d%3A0xe54d31c02c5a90b9!2sIran%20National%20Museum!5e0!3m2!1sen!2sir!4v1653516830217!5m2!1sen!2sir" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
