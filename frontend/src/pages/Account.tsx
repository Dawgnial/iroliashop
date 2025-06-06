
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { UserPlus, LogIn, Mail, Phone, User } from "lucide-react";
import { authApi, LoginCredentials } from "../services/authApi";
import { userApi } from "../services/userApi";

interface LoginFormValues {
  email: string;
  password: string;
}

interface RegisterFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const Account = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const loginForm = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const registerForm = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const onLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const credentials: LoginCredentials = {
        email: data.email,
        password: data.password,
      };
      
      const response = await authApi.login(credentials);
      
      // ذخیره توکن در localStorage
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      toast.success("با موفقیت وارد شدید");
      console.log("Login successful:", response);
      
      // می‌توانید کاربر را به صفحه دیگری هدایت کنید
      // window.location.href = '/';
      
    } catch (error) {
      console.error("Login error:", error);
      toast.error("خطا در ورود. لطفاً اطلاعات خود را بررسی کنید.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const onRegister = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      if (data.password !== data.confirmPassword) {
        toast.error("رمزهای عبور مطابقت ندارند");
        setIsLoading(false);
        return;
      }
      
      // در این API، register از همان endpoint login استفاده می‌کند
      const credentials: LoginCredentials = {
        email: data.email,
        password: data.password,
      };
      
      const response = await authApi.login(credentials);
      
      // ذخیره توکن در localStorage
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      toast.success("ثبت‌نام با موفقیت انجام شد و وارد شدید.");
      console.log("Register successful:", response);
      
    } catch (error) {
      console.error("Register error:", error);
      toast.error("خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container-custom py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-persian-blue">حساب کاربری</h1>
            <p className="text-gray-600 mt-2">به ایرولیا شاپ خوش آمدید</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">ورود</TabsTrigger>
                <TabsTrigger value="register">ثبت نام</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">ایمیل</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="login-email"
                        type="email"
                        className="pr-10"
                        placeholder="example@mail.com"
                        {...loginForm.register("email", { required: true })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">رمز عبور</Label>
                      <a href="#" className="text-xs text-persian-blue hover:underline">فراموشی رمز؟</a>
                    </div>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      {...loginForm.register("password", { required: true })}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-persian-blue hover:bg-persian-blue/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin ml-2"></div>
                        در حال پردازش...
                      </div>
                    ) : (
                      <>
                        <LogIn className="ml-2" size={18} />
                        ورود به حساب
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">نام کامل</Label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="register-name"
                        placeholder="نام و نام خانوادگی"
                        className="pr-10"
                        {...registerForm.register("name", { required: true })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email">ایمیل</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="register-email"
                        type="email"
                        className="pr-10"
                        placeholder="example@mail.com"
                        {...registerForm.register("email", { required: true })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-phone">شماره همراه</Label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="register-phone"
                        type="tel"
                        className="pr-10"
                        placeholder="09123456789"
                        {...registerForm.register("phone", { required: true })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">رمز عبور</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      {...registerForm.register("password", { required: true })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">تکرار رمز عبور</Label>
                    <Input
                      id="register-confirm-password"
                      type="password"
                      placeholder="••••••••"
                      {...registerForm.register("confirmPassword", { required: true })}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-persian-blue hover:bg-persian-blue/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin ml-2"></div>
                        در حال پردازش...
                      </div>
                    ) : (
                      <>
                        <UserPlus className="ml-2" size={18} />
                        ثبت نام
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              ورود شما به معنای پذیرش <a href="#" className="text-persian-blue hover:underline">قوانین و مقررات</a> ایرولیا شاپ است.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
