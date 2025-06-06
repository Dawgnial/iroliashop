
import { Button } from "@/components/ui/button";
import { Settings, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdminQuickAccessProps {
  className?: string;
}

const AdminQuickAccess = ({ className }: AdminQuickAccessProps) => {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate('/admin')}
        className="bg-gradient-to-r from-persian-blue to-blue-600 text-white border-none hover:from-persian-blue/90 hover:to-blue-600/90"
      >
        <Shield className="w-4 h-4 ml-2" />
        پنل مدیریت
      </Button>
    </div>
  );
};

export default AdminQuickAccess;
