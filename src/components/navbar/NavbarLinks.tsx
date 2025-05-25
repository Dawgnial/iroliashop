
import { Link } from "react-router-dom";

interface Category {
  name: string;
  href: string;
  onClick?: () => void;
}

interface NavbarLinksProps {
  categories: Category[];
}

export const NavbarLinks = ({ categories }: NavbarLinksProps) => {
  return (
    <div className="flex items-center space-x-2 xl:space-x-4 space-x-reverse">
      {categories.map((category) => (
        <Link
          key={category.name}
          to={category.href}
          onClick={category.onClick}
          className="px-2 xl:px-3 py-2 text-sm xl:text-base text-foreground hover:text-terracotta transition-colors hover-scale font-vazir whitespace-nowrap"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};
