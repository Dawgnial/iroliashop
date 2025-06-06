
import { Link } from "react-router-dom";

const NavbarLogo = () => {
  return (
    <div className="flex-shrink-0">
      <Link to="/" className="flex items-center space-x-2 space-x-reverse">
        <img src="/lovable-uploads/55df9896-8e16-4a98-8113-d851974bd93d.png" alt="ایرولیا شاپ" className="h-8 w-auto" />
        <span className="text-2xl font-bold text-terracotta">ایرولیا شاپ</span>
      </Link>
    </div>
  );
};

export default NavbarLogo;
