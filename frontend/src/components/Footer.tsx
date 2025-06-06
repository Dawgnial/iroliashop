
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToContact = () => {
    setTimeout(() => {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
        const elementPosition = contactElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight - 80; // کاهش فاصله برای اسکرول بهتر
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <footer className="bg-persian-blue text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About Us */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4 font-vazir">درباره ایرولیا شاپ</h3>
            <p className="text-white/80 mb-4 font-vazir leading-relaxed">
              ایرولیا شاپ، بازاری آنلاین برای عرضه و فروش صنایع دستی و آثار هنری ایرانی است. ما به هنرمندان و صنعتگران کمک می‌کنیم تا آثار خود را در سراسر کشور به فروش برسانند.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-white hover:text-persian-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-persian-gold transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-persian-gold transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-vazir">دسترسی سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors font-vazir">صفحه اصلی</Link>
              </li>
              <li>
                <Link to="/products" className="text-white/80 hover:text-white transition-colors font-vazir">محصولات</Link>
              </li>
              <li>
                <Link to="/#categories" className="text-white/80 hover:text-white transition-colors font-vazir">دسته‌بندی‌ها</Link>
              </li>
              <li>
                <Link to="/#faq" className="text-white/80 hover:text-white transition-colors font-vazir">سوالات متداول</Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors font-vazir">درباره ما</Link>
              </li>
              <li>
                <Link 
                  to="/about#contact" 
                  onClick={scrollToContact}
                  className="text-white/80 hover:text-white transition-colors font-vazir"
                >
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div id="contact">
            <h3 className="text-xl font-bold mb-4 font-vazir">تماس با ما</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 space-x-reverse">
                <MapPin size={20} className="flex-shrink-0 mt-1" />
                <span className="text-white/80 text-base text-right font-vazir">خراسان رضوی، مشهد، قاسم آباد فلاحی 19/4، پلاک 31، واحد 1</span>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse">
                <Phone size={20} />
                <span className="text-white/80 hover:text-white transition-colors font-vazir">
                  <a href="tel:+982112345678">۰۲۱-۱۲۳۴۵۶۷۸</a>
                </span>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse">
                <Mail size={20} />
                <span className="text-white/80 hover:text-white transition-colors font-vazir">
                  <a href="mailto:info@iroliashop.ir">info@iroliashop.ir</a>
                </span>
              </li>
            </ul>
          </div>
          
          {/* Enamad Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-vazir">اینماد</h3>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-sm font-vazir text-white/60">لوگو اینماد</span>
              </div>
              <p className="text-sm text-white/80 font-vazir">نماد اعتماد الکترونیکی</p>
              <p className="text-xs text-white/60 mt-1 font-vazir">مجوز فعالیت تجاری</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/80 text-center md:text-right mb-4 md:mb-0 font-vazir">
            © ۱۴۰۴ ایرولیا شاپ. تمامی حقوق محفوظ است.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-white/80 hover:text-white transition-colors text-sm font-vazir">شرایط و قوانین</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors text-sm font-vazir">حریم خصوصی</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors text-sm font-vazir">سوالات متداول</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
