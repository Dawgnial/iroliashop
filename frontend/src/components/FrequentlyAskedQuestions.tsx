
import { HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FrequentlyAskedQuestions = () => {
  const faqs = [
    {
      question: "روش‌های پرداخت در ایرولیا شاپ چیست؟",
      answer: "شما می‌توانید از طریق درگاه‌های آنلاین، کارت به کارت یا پرداخت در محل (برای تهران) هزینه محصول را پرداخت کنید."
    },
    {
      question: "زمان ارسال محصولات چقدر است؟",
      answer: "بین ۲ تا ۷ روز کاری بسته به منطقه‌ی جغرافیایی شما متغیر است. برای تهران معمولاً ۲ تا ۳ روز کاری و برای شهرستان‌ها ۳ تا ۷ روز کاری زمان می‌برد."
    },
    {
      question: "آیا امکان مرجوع کردن محصول وجود دارد؟",
      answer: "بله، تا ۷ روز پس از دریافت محصول، در صورت عدم استفاده و سالم بودن بسته‌بندی، می‌توانید محصول را مرجوع کنید."
    },
    {
      question: "آیا محصولات گارانتی دارند؟",
      answer: "بله، اکثر محصولات ما دارای گارانتی اصالت و کیفیت هستند. جزئیات گارانتی هر محصول در صفحه محصول ذکر شده است."
    },
    {
      question: "هزینه ارسال چقدر است؟",
      answer: "برای خریدهای بالای ۵۰۰ هزار تومان، ارسال رایگان است. برای خریدهای کمتر، هزینه ارسال بین ۲۰ تا ۵۰ هزار تومان متغیر است."
    }
  ];

  return (
    <section className="py-16 bg-background" id="faq">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-4">سوالات متداول</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            پاسخ به سوالات رایج شما درباره خرید، ارسال و محصولات ایرولیا شاپ
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-right">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FrequentlyAskedQuestions;
