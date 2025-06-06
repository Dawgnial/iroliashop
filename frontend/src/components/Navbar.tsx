
import NavbarLogo from "./navbar/NavbarLogo";
import NavbarLinks from "./navbar/NavbarLinks";
import NavbarActions from "./navbar/NavbarActions";
import MobileMenu from "./navbar/MobileMenu";
import { useAuth } from "../hooks/useAuth";
import { useBasket } from "../hooks/useBasket";
import { useCategories } from "../hooks/useCategories";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { basketItems } = useBasket();
  const { categories } = useCategories();

  const cartItemCount = basketItems.reduce((total, item) => total + item.quantity, 0);

  const navCategories = [
    { name: "صفحه اصلی", href: "/" },
    { name: "محصولات", href: "/products" },
    { name: "درباره ما", href: "/about" },
    { name: "آموزش‌ها", href: "/courses" }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <NavbarLogo />
          <NavbarLinks categories={navCategories} className="hidden md:flex" />
          <NavbarActions 
            user={user}
            isAuthenticated={isAuthenticated}
            onLogout={logout}
            cartItemCount={cartItemCount}
            className="hidden md:flex"
          />
          <MobileMenu 
            user={user}
            isAuthenticated={isAuthenticated}
            onLogout={logout}
            cartItemCount={cartItemCount}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
