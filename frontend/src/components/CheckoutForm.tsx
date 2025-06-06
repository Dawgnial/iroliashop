
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
import { orderApi, CreateOrderData, OrderAddress } from "../services/orderApi";

interface CheckoutFormProps {
  cartItems: (Product & { quantity: number })[];
  cartTotal: number;
  onComplete: () => void;
}

const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "نام و نام خانوادگی باید حداقل ۳ حرف باشد.",
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
});

type FormValues = z.infer<typeof formSchema>;

export function CheckoutForm({ cartItems, cartTotal, onComplete }: CheckoutFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      postalCode: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
    try {
      const orderAddress: OrderAddress = {
        fullName: data.fullName,
        phone: data.phone,
        address: data.address,
        postalCode: data.postalCode,
      };

      const orderData: CreateOrderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        address: orderAddress,
      };

      const order = await orderApi.createOrder(orderData);
      
      toast({
        title: "سفارش با موفقیت ثبت شد",
        description: `سفارش شما با شماره ${order.id} ثبت شد و در حال پردازش است.`,
      });
      
      console.log("Order created:", order);
      onComplete();
      
    } catch (error) {
      console.error("Order creation error:", error);
      toast({
        title: "خطا در ثبت سفارش",
        description: "لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
        <h3 className="text-lg font-medium text-primary mb-2">اطلاعات تحویل</h3>
        <p className="text-sm text-foreground/80">
          لطفاً اطلاعات دقیق آدرس تحویل را وارد کنید.
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
