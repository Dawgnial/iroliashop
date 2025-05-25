
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Plus, Edit, Trash2, Package, Users, ShoppingCart, Eye, EyeOff } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: string | null;
  is_active: boolean;
  stock_quantity: number | null;
  sku: string | null;
  created_at: string;
  updated_at: string;
  categories?: Category;
}

const Admin = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    price: '',
    image_url: '',
    category_id: '',
    is_active: true,
    stock_quantity: '',
    sku: ''
  });

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      toast({
        variant: 'destructive',
        title: 'خطا',
        description: 'خطا در دریافت دسته‌بندی‌ها'
      });
    } else {
      setCategories(data || []);
    }
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        variant: 'destructive',
        title: 'خطا',
        description: 'خطا در دریافت محصولات'
      });
    } else {
      setProducts(data || []);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        title: productForm.title,
        description: productForm.description || null,
        price: parseFloat(productForm.price),
        image_url: productForm.image_url || null,
        category_id: productForm.category_id || null,
        is_active: productForm.is_active,
        stock_quantity: productForm.stock_quantity ? parseInt(productForm.stock_quantity) : null,
        sku: productForm.sku || null
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;

        toast({
          title: 'موفق',
          description: 'محصول با موفقیت ویرایش شد'
        });
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;

        toast({
          title: 'موفق',
          description: 'محصول با موفقیت اضافه شد'
        });
      }

      setProductForm({
        title: '',
        description: '',
        price: '',
        image_url: '',
        category_id: '',
        is_active: true,
        stock_quantity: '',
        sku: ''
      });
      setEditingProduct(null);
      setShowForm(false);
      fetchProducts();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'خطا',
        description: error.message || 'خطا در ذخیره محصول'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      title: product.title,
      description: product.description || '',
      price: product.price.toString(),
      image_url: product.image_url || '',
      category_id: product.category_id || '',
      is_active: product.is_active,
      stock_quantity: product.stock_quantity?.toString() || '',
      sku: product.sku || ''
    });
    setShowForm(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('آیا از حذف این محصول مطمئن هستید؟')) return;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'خطا',
        description: 'خطا در حذف محصول'
      });
    } else {
      toast({
        title: 'موفق',
        description: 'محصول با موفقیت حذف شد'
      });
      fetchProducts();
    }
  };

  const toggleProductStatus = async (product: Product) => {
    const { error } = await supabase
      .from('products')
      .update({ is_active: !product.is_active })
      .eq('id', product.id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'خطا',
        description: 'خطا در تغییر وضعیت محصول'
      });
    } else {
      toast({
        title: 'موفق',
        description: `محصول ${product.is_active ? 'غیرفعال' : 'فعال'} شد`
      });
      fetchProducts();
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen bg-background p-6">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-persian-dark mb-2">پنل مدیریت</h1>
            <p className="text-persian-dark/70">مدیریت محصولات و سفارشات</p>
          </div>

          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                محصولات
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                سفارشات
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                کاربران
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-persian-dark">مدیریت محصولات</h2>
                <Button
                  onClick={() => {
                    setShowForm(!showForm);
                    setEditingProduct(null);
                    setProductForm({
                      title: '',
                      description: '',
                      price: '',
                      image_url: '',
                      category_id: '',
                      is_active: true,
                      stock_quantity: '',
                      sku: ''
                    });
                  }}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  افزودن محصول جدید
                </Button>
              </div>

              {showForm && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {editingProduct ? 'ویرایش محصول' : 'افزودن محصول جدید'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProductSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">نام محصول *</Label>
                          <Input
                            id="title"
                            value={productForm.title}
                            onChange={(e) => setProductForm(prev => ({ ...prev, title: e.target.value }))}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="price">قیمت (تومان) *</Label>
                          <Input
                            id="price"
                            type="number"
                            value={productForm.price}
                            onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="category">دسته‌بندی</Label>
                          <Select
                            value={productForm.category_id}
                            onValueChange={(value) => setProductForm(prev => ({ ...prev, category_id: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="انتخاب دسته‌بندی" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="stock">موجودی</Label>
                          <Input
                            id="stock"
                            type="number"
                            value={productForm.stock_quantity}
                            onChange={(e) => setProductForm(prev => ({ ...prev, stock_quantity: e.target.value }))}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="sku">کد محصول</Label>
                          <Input
                            id="sku"
                            value={productForm.sku}
                            onChange={(e) => setProductForm(prev => ({ ...prev, sku: e.target.value }))}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="image_url">تصویر (URL)</Label>
                          <Input
                            id="image_url"
                            value={productForm.image_url}
                            onChange={(e) => setProductForm(prev => ({ ...prev, image_url: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">توضیحات</Label>
                        <Textarea
                          id="description"
                          value={productForm.description}
                          onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                          rows={3}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="is_active"
                          checked={productForm.is_active}
                          onCheckedChange={(checked) => setProductForm(prev => ({ ...prev, is_active: checked }))}
                        />
                        <Label htmlFor="is_active">فعال</Label>
                      </div>

                      <div className="flex gap-2">
                        <Button type="submit" disabled={loading}>
                          {loading ? 'در حال ذخیره...' : (editingProduct ? 'ویرایش' : 'افزودن')}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setShowForm(false);
                            setEditingProduct(null);
                          }}
                        >
                          انصراف
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-4">
                {products.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {product.image_url && (
                            <img
                              src={product.image_url}
                              alt={product.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                          <div>
                            <h3 className="font-semibold text-persian-dark">{product.title}</h3>
                            <p className="text-sm text-persian-dark/70">
                              {product.categories?.name} | {formatPrice(product.price)}
                            </p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant={product.is_active ? "default" : "secondary"}>
                                {product.is_active ? 'فعال' : 'غیرفعال'}
                              </Badge>
                              {product.stock_quantity !== null && (
                                <Badge variant="outline">
                                  موجودی: {product.stock_quantity}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleProductStatus(product)}
                          >
                            {product.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>مدیریت سفارشات</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-persian-dark/70">سفارشات به زودی اضافه خواهند شد</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>مدیریت کاربران</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-persian-dark/70">مدیریت کاربران به زودی اضافه خواهد شد</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Admin;
