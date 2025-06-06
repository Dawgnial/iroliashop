
import React from 'react';
import { Truck, Package, Shield, Clock, Calculator } from 'lucide-react';

interface PriceTransparencyProps {
  productPrice: number;
  isInCart?: boolean;
}

const PriceTransparency = ({ productPrice, isInCart = false }: PriceTransparencyProps) => {
  const calculateShipping = (price: number) => {
    if (price >= 500000) return 0; // ارسال رایگان
    return 25000; // هزینه ارسال
  };

  const shippingCost = calculateShipping(productPrice);
  const totalPrice = productPrice + shippingCost;
  const freeShippingThreshold = 500000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - productPrice);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
      <div className="flex items-center mb-4">
        <Calculator className="w-6 h-6 text-primary ml-3" />
        <h3 className="text-lg font-bold text-primary">
          جزئیات هزینه‌ها
        </h3>
      </div>

      <div className="space-y-4">
        {/* قیمت محصول */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Package className="w-5 h-5 text-gray-500 ml-2" />
            <span className="text-foreground">قیمت محصول:</span>
          </div>
          <span className="font-semibold text-foreground">
            {formatPrice(productPrice)}
          </span>
        </div>

        {/* هزینه ارسال */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Truck className="w-5 h-5 text-gray-500 ml-2" />
            <span className="text-foreground">هزینه ارسال:</span>
          </div>
          <span className={`font-semibold ${shippingCost === 0 ? 'text-green-600' : 'text-foreground'}`}>
            {shippingCost === 0 ? 'رایگان' : formatPrice(shippingCost)}
          </span>
        </div>

        {/* مجموع */}
        <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-foreground">
              مجموع قابل پرداخت:
            </span>
            <span className="text-xl font-bold text-primary">
              {formatPrice(totalPrice)}
            </span>
          </div>
        </div>

        {/* پیام ارسال رایگان */}
        {remainingForFreeShipping > 0 && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3">
            <div className="flex items-start">
              <Truck className="w-5 h-5 text-yellow-600 ml-2 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  با خرید <strong>{formatPrice(remainingForFreeShipping)}</strong> بیشتر، 
                  ارسال برای شما رایگان خواهد بود!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* اطلاعات تحویل */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-3">
          <div className="space-y-2">
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-green-600 ml-2" />
              <span className="text-sm text-green-800 dark:text-green-200">
                زمان تحویل: ۲ تا ۵ روز کاری
              </span>
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 text-green-600 ml-2" />
              <span className="text-sm text-green-800 dark:text-green-200">
                ضمانت بازگشت وجه تا ۷ روز
              </span>
            </div>
          </div>
        </div>

        {/* اطلاعیه پیش‌پرداخت */}
        <div className="text-center text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded p-2">
          💡 هیچ هزینه مخفی یا اضافی وجود ندارد
        </div>
      </div>
    </div>
  );
};

export default PriceTransparency;
