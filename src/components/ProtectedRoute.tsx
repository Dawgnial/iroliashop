
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/auth', { state: { from: location }, replace: true });
      } else if (adminOnly && !isAdmin) {
        navigate('/', { replace: true });
      }
    }
  }, [user, loading, isAdmin, adminOnly, navigate, location]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-persian-medium mb-4" />
            <p className="text-persian-dark">در حال بارگذاری...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user || (adminOnly && !isAdmin)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
