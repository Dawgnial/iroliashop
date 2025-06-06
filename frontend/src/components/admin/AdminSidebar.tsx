
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  ShoppingCart,
  Users,
  Settings,
  FileText,
  BarChart3
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../hooks/useAuth";

const menuItems = [
  {
    title: "داشبورد",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "مدیریت محصولات",
    url: "/admin/products",
    icon: Package,
  },
  {
    title: "مدیریت دسته‌بندی",
    url: "/admin/categories",
    icon: FolderOpen,
  },
  {
    title: "مدیریت سفارشات",
    url: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "مدیریت کاربران",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "گزارشات",
    url: "/admin/reports",
    icon: BarChart3,
  },
  {
    title: "تنظیمات",
    url: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <Sidebar className="border-l border-gray-200">
      <SidebarHeader className="p-4">
        <div className="text-center">
          <h2 className="text-lg font-bold text-persian-blue">پنل مدیریت</h2>
          <p className="text-sm text-gray-600">خوش آمدید، {user?.name}</p>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>منوی اصلی</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <button
                      onClick={() => navigate(item.url)}
                      className="w-full flex items-center gap-3 text-right"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="space-y-2">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="w-full"
          >
            بازگشت به سایت
          </Button>
          <Button 
            variant="destructive" 
            onClick={logout}
            className="w-full"
          >
            خروج
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
