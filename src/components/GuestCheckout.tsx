
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Product } from "../models/Product";

interface GuestCheckoutProps {
  cartItems: Product[];
  cartTotal: number;
  onComplete: () => void;
}

const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "نام و نام خانوادگی باید حداقل ۳ حرف باشد.",
  }),
  email: z.string().email({
    message: "لطفاً یک آدرس ایمیل معتبر وارد کنید.",
  }),
  phone: z.string().min(10, {
    message: "شماره تماس باید حداقل ۱۰ رقم باشد.",
  }),
  address: z.string().min(10, {
    message: "آدرس باید حداقل ۱۰ کاراکتر باشد.",
  }),
  postalCode: z.string().min(10, {
    message: "کد پستی باید ۱۰ رقم باشد.",
  }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function GuestCheckout({ cartItems, cartTotal, onComplete }: GuestCheckoutProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      postalCode: "",
      notes: "",
    },
  });

  function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      console.log("Order data:", { ...data, cartItems, cartTotal });
      
      toast({
        title: "سفارش با موفقیت ثبت شد",
        description: "اطلاعات سفارش شما دریافت شد و در حال پردازش است.",
      });
      
      setIsSubmitting(false);
      onComplete();
    }, 1500);
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-light/20 p-4 rounded-lg border border-green-tertiary mb-6">
        <h3 className="text-lg font-iranyekan font-medium text-primary mb-2">خرید به عنوان مهمان</h3>
        <p className="text-sm text-foreground/80">
          شما می‌توانید بدون نیاز به ثبت‌نام، خرید خود را تکمیل کنید. فقط اطلاعات زیر را پر کنید.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام و نام خانوادگی</FormLabel>
                  <FormControl>
                    <Input placeholder="نام و نام خانوادگی خود را وارد کنید" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>آدرس ایمیل</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شماره تماس</FormLabel>
                  <FormControl>
                    <Input placeholder="۰۹۱۲۳۴۵۶۷۸۹" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>کد پستی</FormLabel>
                  <FormControl>
                    <Input placeholder="کد پستی ۱۰ رقمی" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>آدرس کامل</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="آدرس دقیق خود را وارد کنید" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>توضیحات سفارش (اختیاری)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="اگر توضیح خاصی برای سفارش خود دارید، اینجا بنویسید" 
                    className="min-h-[80px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="border-t border-border pt-4 mt-6">
            <div className="flex justify-between font-semibold text-lg mb-4">
              <span>مجموع:</span>
              <span className="text-primary">{formatPrice(cartTotal)}</span>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "در حال ثبت سفارش..." : "ثبت سفارش"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
