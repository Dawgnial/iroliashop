
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Clock, 
  Users, 
  Award, 
  CheckCircle, 
  Calendar,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ScrollToTop from "../components/ScrollToTop";

const Courses = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    age: '',
    experience: '',
    message: ''
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.phone || !formData.email) {
      toast({
        title: "خطا در ثبت‌نام",
        description: "لطفاً تمام فیلدهای اجباری را پر کنید.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "ثبت‌نام موفقیت‌آمیز",
      description: "درخواست ثبت‌نام شما با موفقیت ثبت شد. کارشناسان ما طی ۲۴ ساعت آینده با شما تماس خواهند گرفت.",
      variant: "default",
    });

    // Reset form
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      age: '',
      experience: '',
      message: ''
    });
  };

  const courseFeatures = [
    "آموزش کامل تکنیک‌های سفالگری",
    "کار عملی با چرخ سفالگری",
    "آموزش انواع لعاب و رنگ‌آمیزی",
    "تکنیک‌های پخت و کوره‌کاری",
    "ساخت انواع ظروف و اشیاء تزئینی",
    "مدرک معتبر فنی و حرفه‌ای",
    "پشتیبانی تا ۶ ماه پس از دوره",
    "امکان راه‌اندازی کسب‌وکار"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-offwhite to-clay dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <main className="container-custom py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-terracotta mb-4 animate-fade-in">
            دوره آموزشی سفالگری ایرولیا
          </h1>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            از مبتدی تا حرفه‌ای: فراگیری کامل هنر سفالگری با اساتید مجرب و کسب مدرک معتبر
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Course Information */}
          <div className="space-y-8">
            {/* Course Image */}
            <Card className="overflow-hidden">
              <div className="relative h-80">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(/lovable-uploads/5b65700d-7ff9-4992-ba28-377fbadaadf0.png)` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 via-orange-800/50 to-terracotta/70"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 right-6">
                    <Badge className="bg-terracotta text-white text-lg px-4 py-2">
                      <GraduationCap className="ml-2" size={20} />
                      دوره تخصصی سفالگری
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Course Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-terracotta flex items-center">
                  <Award className="ml-2" size={24} />
                  جزئیات دوره
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Clock className="text-terracotta" size={20} />
                    <div>
                      <p className="font-medium">مدت دوره</p>
                      <p className="text-sm text-foreground/70">۳ ماه (۳۶ جلسه)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Users className="text-terracotta" size={20} />
                    <div>
                      <p className="font-medium">ظرفیت کلاس</p>
                      <p className="text-sm text-foreground/70">حداکثر ۱۲ نفر</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Calendar className="text-terracotta" size={20} />
                    <div>
                      <p className="font-medium">روزهای برگزاری</p>
                      <p className="text-sm text-foreground/70">شنبه و چهارشنبه</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Award className="text-terracotta" size={20} />
                    <div>
                      <p className="font-medium">مدرک</p>
                      <p className="text-sm text-foreground/70">فنی و حرفه‌ای</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-terracotta">سرفصل‌های دوره</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {courseFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 space-x-reverse">
                      <CheckCircle className="text-green-600 flex-shrink-0" size={18} />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form */}
          <div className="space-y-8">
            <Card className="border-2 border-terracotta/20">
              <CardHeader className="bg-gradient-to-r from-terracotta to-amber-600 text-white">
                <CardTitle className="text-2xl text-center">فرم ثبت‌نام</CardTitle>
                <p className="text-center text-amber-100">
                  برای ثبت‌نام در دوره، فرم زیر را تکمیل کنید
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">نام و نام خانوادگی *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="نام کامل خود را وارد کنید"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">شماره تماس *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="09123456789"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">سن</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="سن شما"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">ایمیل *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">سابقه کار با سفال</Label>
                    <Input
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      placeholder="مبتدی / متوسط / پیشرفته یا توضیح مختصر"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">توضیحات اضافی</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="سوالات یا توضیحات اضافی..."
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-terracotta hover:bg-terracotta/90 text-white py-3 text-lg"
                  >
                    ثبت‌نام در دوره
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-terracotta">اطلاعات تماس</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Phone className="text-terracotta" size={20} />
                  <div>
                    <p className="font-medium">تلفن مستقیم</p>
                    <p className="text-sm text-foreground/70">۰۲۱-۸۸۷۷۶۶۵۵</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Mail className="text-terracotta" size={20} />
                  <div>
                    <p className="font-medium">ایمیل</p>
                    <p className="text-sm text-foreground/70">courses@irrolia.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <MapPin className="text-terracotta" size={20} />
                  <div>
                    <p className="font-medium">آدرس کارگاه</p>
                    <p className="text-sm text-foreground/70">تهران، خیابان ولیعصر، نرسیده به میدان ونک</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Courses;
