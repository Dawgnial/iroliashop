
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle";
import { User } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: {
    name: string;
    href: string;
    onClick?: () => void;
  }[];
}

export const MobileMenu = ({ isOpen, onClose, categories }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 bg-white/95 dark:bg-card/95 backdrop-blur-md z-50 animate-fade-in">
      <div className="container py-5">
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <img src="/logo.png" alt="ایرولیا شاپ" className="h-8 w-auto" />
            <span className="text-2xl font-bold text-terracotta">ایرولیا شاپ</span>
          </Link>
          <button onClick={onClose} className="text-foreground">
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          {categories.map((category) => (
            category.onClick ? (
              <button
                key={category.name}
                onClick={() => {
                  category.onClick?.();
                  onClose();
                }}
                className="px-3 py-2 text-lg text-foreground hover:text-terracotta hover-lift"
              >
                {category.name}
              </button>
            ) : (
              <Link
                key={category.name}
                to={category.href}
                className="px-3 py-2 text-lg text-foreground hover:text-terracotta hover-lift"
                onClick={onClose}
              >
                {category.name}
              </Link>
            )
          ))}
          <div className="border-t border-gray-100 dark:border-gray-800 my-4 pt-4">
            <Link 
              to="/account" 
              className="flex items-center space-x-3 space-x-reverse text-foreground hover:text-terracotta px-3 py-2"
              onClick={onClose}
            >
              <User size={20} />
              <span>حساب کاربری</span>
            </Link>
            <div className="flex items-center justify-between px-3 py-2">
              <span>تغییر حالت نمایش:</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
