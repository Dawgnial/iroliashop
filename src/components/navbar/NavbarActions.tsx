
import { useState } from "react";
import { Heart, ShoppingCart, User, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "../ThemeToggle";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { Link } from "react-router-dom";

interface NavbarActionsProps {
  onMobileMenuToggle: () => void;
  onToggleSearch: () => void;
}

export const NavbarActions = ({ onMobileMenuToggle, onToggleSearch }: NavbarActionsProps) => {
  const { getCartItemsCount } = useCart();
  const { favorites } = useFavorites();
  const cartItemsCount = getCartItemsCount();
  const favoritesCount = favorites.length;

  return (
    <div className="flex items-center space-x-2 space-x-reverse">
      {/* Desktop Actions */}
      <div className="hidden md:flex items-center space-x-3 space-x-reverse">
        <ThemeToggle />
        
        <Button
          variant="ghost"
          size="icon"
          className="hover-scale"
          onClick={onToggleSearch}
        >
          <Search size={20} />
        </Button>
        
        <Link to="/favorites">
          <Button variant="ghost" size="icon" className="relative hover-scale">
            <Heart size={20} />
            {favoritesCount > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 min-w-[18px] h-5 flex items-center justify-center p-1 bg-red-500 text-white text-xs"
              >
                {favoritesCount > 99 ? '99+' : favoritesCount}
              </Badge>
            )}
          </Button>
        </Link>
        
        <Link to="/cart">
          <Button variant="ghost" size="icon" className="relative hover-scale">
            <ShoppingCart size={20} />
            {cartItemsCount > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 min-w-[18px] h-5 flex items-center justify-center p-1 bg-primary text-white text-xs"
              >
                {cartItemsCount > 99 ? '99+' : cartItemsCount}
              </Badge>
            )}
          </Button>
        </Link>
        
        <Link to="/account">
          <Button variant="ghost" size="icon" className="hover-scale">
            <User size={20} />
          </Button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden hover-scale"
        onClick={onMobileMenuToggle}
      >
        <Menu size={20} />
      </Button>
    </div>
  );
};
