
import { useState, useEffect } from 'react';
import { BasketItem, basketApi, AddToBasketData } from '../services/basketApi';
import { useToast } from '@/hooks/use-toast';

export const useBasket = () => {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchBasket = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      setLoading(true);
      setError(null);
      const data = await basketApi.getBasket();
      setBasketItems(data);
    } catch (err) {
      console.error('Error fetching basket:', err);
      setError('خطا در دریافت سبد خرید');
    } finally {
      setLoading(false);
    }
  };

  const addToBasket = async (data: AddToBasketData) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast({
        title: "نیاز به ورود",
        description: "برای افزودن به سبد خرید باید وارد شوید.",
        variant: "destructive",
      });
      return;
    }

    try {
      const newItem = await basketApi.addToBasket(data);
      setBasketItems(prev => [...prev, newItem]);
      toast({
        title: "محصول اضافه شد",
        description: "محصول با موفقیت به سبد خرید اضافه شد.",
      });
    } catch (err) {
      console.error('Error adding to basket:', err);
      toast({
        title: "خطا",
        description: "خطا در افزودن به سبد خرید",
        variant: "destructive",
      });
    }
  };

  const clearBasket = async () => {
    try {
      await basketApi.clearBasket();
      setBasketItems([]);
      toast({
        title: "سبد خرید پاک شد",
        description: "تمام محصولات از سبد خرید حذف شدند.",
      });
    } catch (err) {
      console.error('Error clearing basket:', err);
      toast({
        title: "خطا",
        description: "خطا در پاک کردن سبد خرید",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchBasket();
  }, []);

  return {
    basketItems,
    loading,
    error,
    addToBasket,
    clearBasket,
    refetch: fetchBasket
  };
};
