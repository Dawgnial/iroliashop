
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "../models/Product";
import { useToast } from "@/hooks/use-toast";

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
  getFavoritesCount: () => number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export type FavoriteItem = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  category: string;
};

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const { toast } = useToast();

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Failed to parse favorites from localStorage", error);
        localStorage.removeItem("favorites");
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add to favorites
  const addToFavorites = (product: Product) => {
    setFavorites((prevFavorites) => {
      // Check if product already exists in favorites
      if (prevFavorites.some(item => item.id === product.id)) {
        return prevFavorites; // No change if already exists
      }
      return [...prevFavorites, product];
    });
  };

  // Remove from favorites
  const removeFromFavorites = (productId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((item) => item.id !== productId);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });

    toast({
      title: "از لیست علاقه‌مندی‌ها حذف شد",
      description: "محصول مورد نظر از لیست علاقه‌مندی‌های شما حذف شد.",
      variant: "default",
      duration: 2000,
    });
  };

  // Check if product is in favorites
  const isInFavorites = (productId: string) => {
    return favorites.some((item) => item.id === productId);
  };

  const clearFavorites = () => {
    setFavorites([]);
    toast({
      title: "لیست علاقه‌مندی‌ها پاک شد",
      variant: "default",
    });
  };

  const getFavoritesCount = (): number => {
    return favorites.length;
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      addToFavorites, 
      removeFromFavorites, 
      isFavorite: isInFavorites,
      clearFavorites,
      getFavoritesCount
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
