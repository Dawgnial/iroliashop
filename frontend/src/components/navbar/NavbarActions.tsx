
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
}

interface NavbarActionsProps {
  user: User | null;
  isAuthenticated: boolean;
  onLogout: () => void;
  cartItemCount: number;
  className?: string;
}

const NavbarActions = ({ 
  user, 
  isAuthenticated, 
  onLogout, 
  cartItemCount,
  className 
}: NavbarActionsProps) => {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative hover:bg-green-light/50"
        onClick={() => window.location.href = '/favorites'}
      >
        <Heart className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative hover:bg-green-light/50"
        onClick={() => window.location.href = '/cart'}
      >
        <ShoppingCart className="h-5 w-5" />
        {cartItemCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
          >
            {cartItemCount}
          </Badge>
        )}
      </Button>

      {isAuthenticated && user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-green-light/50">
              <User className="h-5 w-5" />
              <span className="hidden lg:inline">{user.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => window.location.href = '/account'}>
              <User className="ml-2 h-4 w-4" />
              حساب کاربری
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="ml-2 h-4 w-4" />
              خروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button 
          className="bg-persian-blue hover:bg-persian-blue/90"
          onClick={() => window.location.href = '/account'}
        >
          ورود / ثبت نام
        </Button>
      )}
    </div>
  );
};

export default NavbarActions;
