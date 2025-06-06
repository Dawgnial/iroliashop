
import React from 'react';
import { Shield, Truck, Award, CheckCircle } from 'lucide-react';

const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      title: 'پرداخت امن',
      description: 'ضمانت امنیت تراکنش'
    },
    {
      icon: Truck,
      title: 'ارسال سریع',
      description: 'ارسال رایگان بالای ۵۰۰ هزار'
    },
    {
      icon: Award,
      title: 'ضمانت کیفیت',
      description: 'بازگشت وجه تا ۷ روز'
    },
    {
      icon: CheckCircle,
      title: 'محصولات اصل',
      description: '۱۰۰٪ اصالت'
    }
  ];

  return (
    <section className="py-8 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container-custom">
        <h3 className="text-xl font-bold text-center text-primary mb-6 font-vazir">
          چرا ایرولیا شاپ؟
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <badge.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
              <h4 className="font-semibold text-foreground mb-1 text-sm font-vazir">
                {badge.title}
              </h4>
              <p className="text-xs text-foreground/70 leading-relaxed font-vazir">
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
