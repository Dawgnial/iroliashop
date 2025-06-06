
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  timeout?: number;
}

const LoadingScreen = ({ timeout = 1000 }: LoadingScreenProps) => {
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, timeout);
    
    return () => clearTimeout(timer);
  }, [timeout]);

  if (!show) return null;
  
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="mt-4 text-lg text-terracotta font-vazir animate-pulse">در حال بارگذاری...</p>
    </div>
  );
};

export default LoadingScreen;
