
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export type Comment = {
  id: string;
  name: string;
  content: string;
  rating: number;
  date: string;
  avatar?: string;
  likes: number;
  userHasLiked?: boolean;
};

interface ProductCommentsProps {
  productId: string;
  initialComments?: Comment[];
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "نام باید حداقل ۲ حرف باشد.",
  }),
  email: z.string().email({
    message: "لطفاً یک آدرس ایمیل معتبر وارد کنید.",
  }),
  rating: z.number().min(1, {
    message: "لطفاً یک امتیاز انتخاب کنید.",
  }).max(5),
  comment: z.string().min(5, {
    message: "نظر باید حداقل ۵ حرف باشد.",
  }),
});

const demoComments: Comment[] = [
  {
    id: "1",
    name: "مریم احمدی",
    content: "کیفیت این محصول فوق‌العاده بود. بسته‌بندی مناسب و ارسال به موقع. حتما خرید این محصول رو به همه توصیه می‌کنم.",
    rating: 5,
    date: "۲ هفته پیش",
    avatar: "https://i.pravatar.cc/100?img=1",
    likes: 8,
    userHasLiked: false
  },
  {
    id: "2",
    name: "علی محمدی",
    content: "طرح زیبایی داره و کیفیت خوبی داره، ولی رنگش با تصویر سایت کمی متفاوت بود.",
    rating: 4,
    date: "۱ ماه پیش",
    avatar: "https://i.pravatar.cc/100?img=2",
    likes: 3,
    userHasLiked: true
  },
  {
    id: "3",
    name: "زهرا کریمی",
    content: "خیلی زیباست و دقیقا همون چیزی بود که می‌خواستم. ممنون از فروشگاه خوبتون.",
    rating: 5,
    date: "۳ ماه پیش",
    avatar: "https://i.pravatar.cc/100?img=3",
    likes: 12,
    userHasLiked: false
  }
];

export function ProductComments({ productId, initialComments = demoComments }: ProductCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: 0,
      comment: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      const newComment: Comment = {
        id: `new-${Date.now()}`,
        name: data.name,
        content: data.comment,
        rating: data.rating,
        date: "همین الان",
        likes: 0,
        userHasLiked: false
      };
      
      setComments([newComment, ...comments]);
      
      toast({
        title: "نظر شما ثبت شد",
        description: "از اینکه نظر خود را با ما به اشتراک گذاشتید متشکریم.",
      });
      
      form.reset({
        name: "",
        email: "",
        rating: 0,
        comment: "",
      });
      
      setIsSubmitting(false);
    }, 1000);
  }

  const handleLike = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        if (comment.userHasLiked) {
          return { ...comment, likes: comment.likes - 1, userHasLiked: false };
        } else {
          return { ...comment, likes: comment.likes + 1, userHasLiked: true };
        }
      }
      return comment;
    }));
  };

  const RatingStars = ({ rating, setRating }: { rating: number, setRating?: (r: number) => void }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? "text-yellow-400 fill-yellow-400" 
                : "text-gray-300"
            } ${setRating ? "cursor-pointer" : ""}`}
            onClick={() => setRating && setRating(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-iranyekan font-bold text-primary">نظرات کاربران</h3>
      
      {/* Comment form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-border">
        <h4 className="text-lg font-medium mb-4">نظر خود را ثبت کنید</h4>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام شما</FormLabel>
                    <FormControl>
                      <Input placeholder="نام خود را وارد کنید" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>آدرس ایمیل</FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>امتیاز شما</FormLabel>
                  <FormControl>
                    <div>
                      <RatingStars 
                        rating={field.value} 
                        setRating={(value) => field.onChange(value)} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نظر شما</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="نظر خود را در مورد این محصول بنویسید..." 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "در حال ثبت..." : "ثبت نظر"}
            </Button>
          </form>
        </Form>
      </div>
      
      {/* Comments list */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium">نظرات ({comments.length})</h4>
        </div>
        
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div 
                key={comment.id} 
                className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-border"
              >
                <div className="flex items-start">
                  <Avatar className="h-10 w-10 ml-3">
                    <AvatarImage src={comment.avatar} alt={comment.name} />
                    <AvatarFallback>{comment.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">{comment.name}</h5>
                        <div className="flex items-center mt-1">
                          <RatingStars rating={comment.rating} />
                          <span className="text-sm text-gray-500 mr-2">{comment.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="mt-3 text-foreground/80">{comment.content}</p>
                    
                    <div className="mt-3 flex items-center">
                      <button
                        className={`flex items-center text-sm ${
                          comment.userHasLiked ? "text-primary" : "text-gray-500"
                        } hover:text-primary transition-colors`}
                        onClick={() => handleLike(comment.id)}
                      >
                        <ThumbsUp size={16} className="ml-1" />
                        <span>{comment.userHasLiked ? "پسندیده شده" : "می‌پسندم"}</span>
                      </button>
                      <span className="text-sm text-gray-500 mr-2">
                        {comment.likes} نفر این دیدگاه را پسندیدند
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-muted/30 rounded-lg">
            <p className="text-foreground/60">هنوز هیچ نظری برای این محصول ثبت نشده است.</p>
          </div>
        )}
      </div>
    </div>
  );
}
