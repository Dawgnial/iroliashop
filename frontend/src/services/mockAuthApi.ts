
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
  };
}

// Mock admin credentials for testing
const mockAdminCredentials = [
  { email: 'admin@airolia.com', password: 'admin123', name: 'مدیر کل', role: 'admin' as const },
  { email: 'manager@airolia.com', password: 'manager123', name: 'مدیر فروش', role: 'admin' as const },
  { email: 'support@airolia.com', password: 'support123', name: 'پشتیبانی', role: 'admin' as const }
];

// Mock regular user credentials  
const mockUserCredentials = [
  { email: 'user@test.com', password: 'user123', name: 'کاربر تست', role: 'user' as const }
];

const allCredentials = [...mockAdminCredentials, ...mockUserCredentials];

export const mockAuthApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = allCredentials.find(
      cred => cred.email === credentials.email && cred.password === credentials.password
    );
    
    if (!user) {
      throw new Error('ایمیل یا رمز عبور اشتباه است');
    }
    
    // Generate mock token
    const token = btoa(JSON.stringify({ email: user.email, timestamp: Date.now() }));
    
    return {
      token,
      user: {
        id: user.email,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  },
  
  register: async (userData: { name: string; email: string; password: string }): Promise<LoginResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user already exists
    const existingUser = allCredentials.find(cred => cred.email === userData.email);
    if (existingUser) {
      throw new Error('این ایمیل قبلاً ثبت شده است');
    }
    
    // For demo purposes, create as regular user
    const token = btoa(JSON.stringify({ email: userData.email, timestamp: Date.now() }));
    
    return {
      token,
      user: {
        id: userData.email,
        name: userData.name,
        email: userData.email,
        role: 'user'
      }
    };
  }
};
