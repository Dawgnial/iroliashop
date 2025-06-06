
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { categoryApi } from "../../services/categoryApi";
import { useToast } from "@/hooks/use-toast";

interface CategoryFormProps {
  category?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const CategoryForm = ({ category, onSuccess, onCancel }: CategoryFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: category?.name || "",
    description: category?.description || "",
    imageUrl: category?.imageUrl || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (category) {
        await categoryApi.updateCategory(category.id, formData);
        toast({
          title: "دسته‌بندی با موفقیت به‌روزرسانی شد",
        });
      } else {
        await categoryApi.createCategory(formData);
        toast({
          title: "دسته‌بندی با موفقیت اضافه شد",
        });
      }
      onSuccess();
    } catch (error) {
      toast({
        title: "خطا در انجام عملیات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">نام دسته‌بندی</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">آدرس تصویر (اختیاری)</Label>
        <Input
          id="imageUrl"
          value={formData.imageUrl}
          onChange={(e) => handleChange("imageUrl", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">توضیحات (اختیاری)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={loading} className="bg-persian-blue hover:bg-persian-blue/90">
          {loading ? "در حال انجام..." : (category ? "به‌روزرسانی" : "افزودن")}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          انصراف
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
