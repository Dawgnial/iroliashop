
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Phone, Mail } from 'lucide-react';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    };
    checkUser();
  }, [navigate, location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('رمزهای عبور مطابقت ندارند');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('رمز عبور باید حداقل ۶ کاراکتر باشد');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: 'ثبت‌نام موفق',
          description: 'حساب کاربری شما با موفقیت ایجاد شد'
        });
        navigate('/');
      }
    } catch (error: any) {
      setError(error.message || 'خطا در ثبت‌نام');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: 'ورود موفق',
          description: 'خوش آمدید'
        });
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      setError(error.message || 'خطا در ورود');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-persian-light/20 to-persian-medium/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-persian-dark">
            {isLogin ? 'ورود' : 'ثبت‌نام'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={isLogin ? 'login' : 'signup'} onValueChange={(value) => {
            setIsLogin(value === 'login');
            setError('');
            setFormData({
              email: '',
              phone: '',
              password: '',
              fullName: '',
              confirmPassword: ''
            });
          }}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">ورود</TabsTrigger>
              <TabsTrigger value="signup">ثبت‌نام</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">ایمیل</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pr-10"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">رمز عبور</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="رمز عبور خود را وارد کنید"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'در حال ورود...' : 'ورود'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">نام و نام خانوادگی</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="نام کامل خود را وارد کنید"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signupEmail">ایمیل</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signupEmail"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pr-10"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">شماره همراه (اختیاری)</Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pr-10"
                      placeholder="09123456789"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signupPassword">رمز عبور</Label>
                  <div className="relative">
                    <Input
                      id="signupPassword"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="حداقل ۶ کاراکتر"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">تأیید رمز عبور</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="رمز عبور را مجدداً وارد کنید"
                    required
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
