
import { CheckCircle, Shield, Clock, CreditCard, Truck, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [{
  icon: <Truck size={32} strokeWidth={1.5} />,
  title: 'ارسال سریع و مطمئن',
  description: 'ارسال به سراسر کشور با بسته‌بندی ایمن و مطمئن'
}, {
  icon: <Shield size={32} strokeWidth={1.5} />,
  title: 'تضمین اصالت',
  description: 'تمامی محصولات دارای گواهی اصالت و کیفیت هستند'
}, {
  icon: <CheckCircle size={32} strokeWidth={1.5} />,
  title: 'کیفیت برتر',
  description: 'محصولات با کیفیت ساخته شده توسط استادان برجسته'
}, {
  icon: <CreditCard size={32} strokeWidth={1.5} />,
  title: 'پرداخت امن',
  description: 'پرداخت امن و مطمئن با درگاه‌های معتبر بانکی'
}, {
  icon: <HeartHandshake size={32} strokeWidth={1.5} />,
  title: 'پشتیبانی ۲۴/۷',
  description: 'پاسخگویی به سوالات شما در هر زمان از شبانه‌روز'
}];

// Animation variants for elements
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const TrustIndicators = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-persian-light/30 to-offwhite dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 bg-texture-light opacity-20"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-persian-medium/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-persian-dark/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1 bg-persian-dark/10 dark:bg-persian-dark/30 text-persian-dark dark:text-persian-light rounded-full text-sm font-medium mb-3">
            چرا ما را انتخاب کنید
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-persian-dark dark:text-white mb-4 font-iranyekan">
            چرا ایرولیا شاپ را انتخاب کنید؟
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-vazir">
            ما متعهد به ارائه بهترین تجربه خرید صنایع دستی و هنر ایرانی هستیم
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl p-8 text-center border border-persian-dark/5 dark:border-white/5 hover:border-persian-dark/20 dark:hover:border-white/20 transition-all duration-300 group"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-persian-dark dark:text-persian-light mb-5 mx-auto bg-persian-light/20 dark:bg-persian-dark/20 w-18 h-18 rounded-full p-4 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-persian-dark dark:text-white mb-3 text-shadow-sm group-hover:text-persian-medium transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 font-vazir leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Trust banner */}
        <div className="mt-16 pt-10 border-t border-persian-dark/10 dark:border-white/10">
          <motion.div 
            className="flex flex-wrap justify-center gap-6 md:gap-12 items-center text-persian-dark/70 dark:text-white/70"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span className="font-medium">ضمانت اصالت کالا</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path>
                <rect width="18" height="11" x="3" y="4" rx="2"></rect>
                <circle cx="12" cy="11" r="4"></circle>
                <line x1="12" y1="18" x2="12" y2="21"></line>
              </svg>
              <span className="font-medium">پشتیبانی ۷ روز هفته</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
              </svg>
              <span className="font-medium">پرداخت امن</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
                <path d="m7.5 4.27 9 5.15"></path>
                <polyline points="3.29 7 12 12 20.71 7"></polyline>
                <line x1="12" y1="22" x2="12" y2="12"></line>
              </svg>
              <span className="font-medium">ارسال به سراسر کشور</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
