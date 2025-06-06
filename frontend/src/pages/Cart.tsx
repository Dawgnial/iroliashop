
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Gift, Truck, Clock, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    getCartTotal, 
    clearCart,
    getCartItemsCount 
  } = useCart();
  
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState('standard');
  
  const form = useForm();
  
  const handleApplyCoupon = () => {
    if (couponCode === 'DISCOUNT10') {
      setDiscountApplied(true);
    }
  };
  
  if (cart.length === 0) {
    return (
      <div className="container-custom py-12 min-h-[70vh] flex flex-col items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
            <ShoppingBag className="w-12 h-12 absolute inset-0 m-auto text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-4">سبد خرید شما خالی است</h1>
          <p className="mb-6 text-muted-foreground">
            محصول مورد نظر خود را به سبد خرید اضافه کنید و از خرید لذت ببرید.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/products">مشاهده محصولات</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">بازگشت به صفحه اصلی</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  const subtotal = getCartTotal();
  const discount = discountApplied ? subtotal * 0.1 : 0;
  const deliveryFee = subtotal > 500000 ? 0 : (deliveryOption === 'express' ? 45000 : 30000);
  const total = subtotal - discount + deliveryFee;
  
  return (
    <div className="container-custom py-8 min-h-[70vh]">
      <div className="flex items-center gap-2 mb-6">
        <Button 
          asChild 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground hover:text-foreground"
        >
          <Link to="/products">
            <ArrowRight className="w-4 h-4 ml-1" />
            بازگشت به محصولات
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">سبد خرید شما</h1>
        <p className="text-muted-foreground mt-2">
          {getCartItemsCount()} محصول در سبد خرید شما موجود است
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden border-primary/10">
            <CardHeader className="bg-primary/5 pb-3">
              <CardTitle className="text-lg flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5 text-primary" />
                جزئیات سفارش
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">محصول</TableHead>
                      <TableHead className="text-center">قیمت</TableHead>
                      <TableHead className="text-center">تعداد</TableHead>
                      <TableHead className="text-center">جمع</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img 
                              src={item.imageUrl || '/placeholder.svg'} 
                              alt={item.title} 
                              className="w-16 h-16 object-cover rounded-md border shadow-sm"
                            />
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {item.price.toLocaleString()} تومان
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <div className="flex items-center border rounded-md">
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 rounded-none text-muted-foreground"
                                onClick={() => decreaseQuantity(item.id)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-10 text-center">
                                {item.quantity}
                              </span>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 rounded-none text-muted-foreground"
                                onClick={() => increaseQuantity(item.id)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-medium">
                          {(item.price * item.quantity).toLocaleString()} تومان
                        </TableCell>
                        <TableCell>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Mobile view */}
              <div className="md:hidden divide-y">
                {cart.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="flex gap-4 mb-3">
                      <img 
                        src={item.imageUrl || '/placeholder.svg'} 
                        alt={item.title} 
                        className="w-20 h-20 object-cover rounded-md border shadow-sm"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.title}</h3>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                          {item.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            <span className="text-muted-foreground">قیمت: </span>
                            <span>{item.price.toLocaleString()} تومان</span>
                          </div>
                          <div className="flex items-center border rounded-md">
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 rounded-none text-muted-foreground"
                              onClick={() => decreaseQuantity(item.id)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 rounded-none text-muted-foreground"
                              onClick={() => increaseQuantity(item.id)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-2">
                      <div className="font-medium">
                        <span className="text-muted-foreground text-sm">جمع: </span>
                        <span>{(item.price * item.quantity).toLocaleString()} تومان</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end border-t p-4">
              <Button
                variant="outline"
                className="text-red-500"
                onClick={clearCart}
              >
                <Trash2 className="ml-2 h-4 w-4" />
                پاک کردن سبد خرید
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">روش ارسال</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className={`border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors ${deliveryOption === 'standard' ? 'border-primary bg-primary/5' : ''}`}
                  onClick={() => setDeliveryOption('standard')}
                >
                  <div className="flex items-start">
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${deliveryOption === 'standard' ? 'border-primary' : 'border-muted-foreground'}`}>
                      {deliveryOption === 'standard' && (
                        <div className="w-3 h-3 bg-primary rounded-full m-auto"></div>
                      )}
                    </div>
                    <div className="mr-3">
                      <h4 className="font-medium">ارسال استاندارد</h4>
                      <p className="text-sm text-muted-foreground mt-1">تحویل بین ۳ تا ۵ روز کاری</p>
                      <div className="flex items-center text-sm mt-2">
                        <Truck className="h-4 w-4 ml-1 text-primary" />
                        <span>{subtotal > 500000 ? 'رایگان' : `${(30000).toLocaleString()} تومان`}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors ${deliveryOption === 'express' ? 'border-primary bg-primary/5' : ''}`}
                  onClick={() => setDeliveryOption('express')}
                >
                  <div className="flex items-start">
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${deliveryOption === 'express' ? 'border-primary' : 'border-muted-foreground'}`}>
                      {deliveryOption === 'express' && (
                        <div className="w-3 h-3 bg-primary rounded-full m-auto"></div>
                      )}
                    </div>
                    <div className="mr-3">
                      <h4 className="font-medium">ارسال سریع</h4>
                      <p className="text-sm text-muted-foreground mt-1">تحویل بین ۱ تا ۲ روز کاری</p>
                      <div className="flex items-center text-sm mt-2">
                        <Clock className="h-4 w-4 ml-1 text-primary" />
                        <span>{subtotal > 500000 ? 'رایگان' : `${(45000).toLocaleString()} تومان`}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-6">
            <Card className="border-primary/10">
              <CardHeader className="bg-primary/5 pb-3">
                <CardTitle className="text-lg">خلاصه سفارش</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>تعداد اقلام:</span>
                    <span>{getCartItemsCount()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>جمع کالاها:</span>
                    <span>{subtotal.toLocaleString()} تومان</span>
                  </div>
                  
                  {discountApplied && (
                    <div className="flex justify-between items-center text-sm text-green-600">
                      <span>تخفیف:</span>
                      <span>- {discount.toLocaleString()} تومان</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-sm">
                    <span>هزینه ارسال:</span>
                    <span>{deliveryFee === 0 ? 'رایگان' : `${deliveryFee.toLocaleString()} تومان`}</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between items-center font-bold">
                    <span>جمع نهایی:</span>
                    <span className="text-lg text-primary">{total.toLocaleString()} تومان</span>
                  </div>
                </div>
              </CardContent>
              
              <CardContent className="pt-0 p-4">
                <div className="p-3 rounded-md bg-muted/50 text-sm mb-4">
                  <p className="flex items-center">
                    <Gift className="h-4 w-4 ml-2 text-primary" />
                    کد تخفیف دارید؟
                  </p>
                </div>
                
                <div className="flex gap-2 mb-2">
                  <Input
                    type="text"
                    placeholder="کد تخفیف"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="focus-visible:ring-primary"
                  />
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={handleApplyCoupon}
                    disabled={discountApplied}
                    className="shrink-0"
                  >
                    اعمال
                  </Button>
                </div>
                {discountApplied && (
                  <p className="text-green-600 text-sm mb-4">تخفیف 10% اعمال شد!</p>
                )}
                
                <Button className="w-full bg-primary hover:bg-primary/90 hover-scale mt-2">
                  <CreditCard className="ml-2 h-4 w-4" />
                  ادامه فرآیند خرید
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/20">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div className="mr-3">
                      <p className="font-medium">تحویل سریع</p>
                      <p className="text-xs text-muted-foreground">ارسال به سراسر ایران</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div className="mr-3">
                      <p className="font-medium">پرداخت امن</p>
                      <p className="text-xs text-muted-foreground">درگاه پرداخت معتبر</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5 text-primary" />
                    </div>
                    <div className="mr-3">
                      <p className="font-medium">تضمین کیفیت</p>
                      <p className="text-xs text-muted-foreground">ضمانت اصالت کالا</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Product suggestions */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">شاید دوست داشته باشید</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Placeholder for product suggestions */}
          <div className="aspect-square bg-muted/30 rounded-lg animate-pulse"></div>
          <div className="aspect-square bg-muted/30 rounded-lg animate-pulse"></div>
          <div className="aspect-square bg-muted/30 rounded-lg animate-pulse"></div>
          <div className="aspect-square bg-muted/30 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
