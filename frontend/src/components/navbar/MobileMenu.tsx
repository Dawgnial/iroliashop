
import { useState } from "react";
import { X, Menu, ShoppingCart, Heart, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  name: string;
  email: string;
}

interface MobileMenuProps {
  user: User | null;
  isAuthenticated: boolean;
  onLogout: () => void;
  cartItemCount: number;
}

const MobileMenu = ({ user, isAuthenticated, onLogout, cartItemCount }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleMenu}
        className="md:hidden"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white/95 backdrop-blur-md z-50 animate-fade-in">
          <div className="container py-5">
            <div className="flex justify-between items-center mb-6">
              <Link to="/" className="flex items-center space-x-2 space-x-reverse" onClick={closeMenu}>
                <img src="/lovable-uploads/55df9896-8e16-4a98-8113-d851974bd93d.png" alt="ایرولیا شاپ" className="h-8 w-auto" />
                <span className="text-2xl font-bold text-terracotta">ایرولیا شاپ</span>
              </Link>
              <button onClick={closeMenu} className="text-foreground">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col space-y-4">
              <Link
                to="/products"
                className="px-3 py-2 text-lg text-foreground hover:text-terracotta hover-lift"
                onClick={closeMenu}
              >
                محصولات
              </Link>
              <Link
                to="/about"
                className="px-3 py-2 text-lg text-foreground hover:text-terracotta hover-lift"
                onClick={closeMenu}
              >
                درباره ما
              </Link>
              <Link
                to="/courses"
                className="px-3 py-2 text-lg text-foreground hover:text-terracotta hover-lift"
                onClick={closeMenu}
              >
                آموزش‌ها
              </Link>
              
              <div className="border-t border-gray-100 my-4 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <Link 
                    to="/favorites" 
                    className="flex items-center space-x-3 space-x-reverse text-foreground hover:text-terracotta px-3 py-2"
                    onClick={closeMenu}
                  >
                    <Heart size={20} />
                    <span>علاقه‌مندی‌ها</span>
                  </Link>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <Link 
                    to="/cart" 
                    className="flex items-center space-x-3 space-x-reverse text-foreground hover:text-terracotta px-3 py-2"
                    onClick={closeMenu}
                  >
                    <ShoppingCart size={20} />
                    <span>سبد خرید</span>
                    {cartItemCount > 0 && (
                      <Badge variant="destructive" className="mr-2">
                        {cartItemCount}
                      </Badge>
                    )}
                  </Link>
                </div>

                {isAuthenticated && user ? (
                  <>
                    <Link 
                      to="/account" 
                      className="flex items-center space-x-3 space-x-reverse text-foreground hover:text-terracotta px-3 py-2 mb-4"
                      onClick={closeMenu}
                    >
                      <User size={20} />
                      <span>حساب کاربری</span>
                    </Link>
                    <button
                      onClick={() => {
                        onLogout();
                        closeMenu();
                      }}
                      className="flex items-center space-x-3 space-x-reverse text-foreground hover:text-terracotta px-3 py-2 w-full text-left"
                    >
                      <LogOut size={20} />
                      <span>خروج</span>
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/account" 
                    className="flex items-center space-x-3 space-x-reverse text-foreground hover:text-terracotta px-3 py-2"
                    onClick={closeMenu}
                  >
                    <User size={20} />
                    <span>ورود / ثبت نام</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
