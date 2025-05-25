
import React from 'react';
import { Shield, Truck, Clock, Phone, Award, CheckCircle } from 'lucide-react';

const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      title: 'پرداخت امن',
      description: 'SSL و رمزنگاری ۲۵۶ بیتی'
    },
    {
      icon: Truck,
      title: 'ارسال سریع',
      description: 'ارسال رایگان بالای ۵۰۰ هزار تومان'
    },
    {
      icon: Clock,
      title: 'پشتیبانی ۲۴/۷',
      description: 'پاسخگویی در کمتر از ۲۴ ساعت'
    },
    {
      icon: Award,
      title: 'ضمانت کیفیت',
      description: 'ضمانت بازگشت وجه تا ۷ روز'
    },
    {
      icon: CheckCircle,
      title: 'محصولات اصل',
      description: '۱۰۰٪ اصالت محصولات'
    },
    {
      icon: Phone,
      title: 'مشاوره رایگان',
      description: 'مشاوره خرید با کارشناسان'
    }
  ];

  return (
    <section className="py-12 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container-custom">
        <h3 className="text-2xl font-bold text-center text-primary mb-8">
          چرا ایرولیا شاپ؟
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <badge.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h4 className="font-semibold text-foreground mb-1 text-sm">
                {badge.title}
              </h4>
              <p className="text-xs text-foreground/70 leading-relaxed">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
