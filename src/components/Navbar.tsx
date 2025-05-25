
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarLogo } from './navbar/NavbarLogo';
import { NavbarLinks } from './navbar/NavbarLinks';
import { NavbarActions } from './navbar/NavbarActions';
import { SearchBox } from './navbar/SearchBox';
import { MobileMenu } from './navbar/MobileMenu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  // Sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get the navbar height to offset the scrolling
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
      
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const categories = [
    { name: "خانه", href: "/", onClick: () => scrollToSection('hero') },
    { name: "دسته‌بندی‌ها", href: "/#categories", onClick: () => scrollToSection('categories') },
    { name: "محصولات", href: "/products" },
    { name: "دوره آموزشی", href: "/#training-course", onClick: () => scrollToSection('training-course') },
    { name: "سوالات متداول", href: "/#faq", onClick: () => scrollToSection('faq') },
    { name: "درباره ما", href: "/about" },
    { name: "تماس با ما", href: "/about#contact" },
  ];

  return (
    <nav className={`w-full transition-all duration-300 z-50 ${isSticky ? 'fixed top-0 shadow-md bg-offwhite/90 dark:bg-card/95 backdrop-blur-sm' : 'relative bg-white dark:bg-card'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-14 md:h-16 px-2 md:px-0">
          {/* Logo */}
          <NavbarLogo />

          {/* Desktop Navigation - بهتر شده برای ریسپانسیو */}
          <div className="hidden lg:block">
            <NavbarLinks categories={categories} />
          </div>

          {/* Actions */}
          <NavbarActions onMobileMenuToggle={toggleMenu} onToggleSearch={toggleSearch} />
        </div>

        {/* Search dropdown */}
        <SearchBox isOpen={isSearchOpen} onClose={toggleSearch} />
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} categories={categories} />
    </nav>
  );
};

export default Navbar;
