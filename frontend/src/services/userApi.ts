const API_BASE_URL = 'http://localhost:8000';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  phone?: string;
}

import { baseUrl } from '../constants/baseUrl';

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const userApi = {
  getProfile: async (): Promise<UserProfile> => {
    const token = getAuthToken();
    const response = await fetch(`${baseUrl}/api/v1/user/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    
    return response.json();
  },

  updateProfile: async (userData: UpdateUserData): Promise<UserProfile> => {
    const token = getAuthToken();
    const response = await fetch(`${baseUrl}/api/v1/user`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update user profile');
    }
    
    return response.json();
  },

  logout: async (): Promise<void> => {
    const token = getAuthToken();
    const response = await fetch(`${baseUrl}/api/v1/user/log-out`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to logout');
    }
    
    localStorage.removeItem('authToken');
  }
};
