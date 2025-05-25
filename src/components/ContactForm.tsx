
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "نام باید حداقل ۲ حرف باشد" }),
  email: z.string().email({ message: "لطفا یک ایمیل معتبر وارد کنید" }),
  phone: z.string().regex(/^(09|\+989)\d{9}$/, {
    message: "شماره موبایل وارد شده معتبر نیست",
  }),
  message: z.string().min(10, { message: "پیام باید حداقل ۱۰ حرف باشد" }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // اینجا در یک پروژه واقعی، اطلاعات به سرور ارسال می‌شود
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "پیام شما ارسال شد",
      description: "به زودی با شما تماس خواهیم گرفت.",
      variant: "default",
    });

    setIsSubmitting(false);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          placeholder="نام و نام خانوادگی"
          {...register("name")}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Input
          placeholder="ایمیل"
          type="email"
          {...register("email")}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          placeholder="شماره موبایل"
          {...register("phone")}
          className={errors.phone ? "border-red-500" : ""}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <Textarea
          placeholder="پیام شما"
          rows={5}
          {...register("message")}
          className={errors.message ? "border-red-500" : ""}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !isDirty || !isValid}
        className="w-full bg-terracotta hover:bg-terracotta/90 text-white hover-scale"
      >
        {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
      </Button>
    </form>
  );
};

export default ContactForm;
