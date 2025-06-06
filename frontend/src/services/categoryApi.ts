import { baseUrl } from '../constants/baseUrl';

const API_BASE_URL = 'http://localhost:8000';

export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

export interface CreateCategoryData {
  name: string;
  description?: string;
  imageUrl?: string;
}

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const categoryApi = {
  getCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${baseUrl}/api/v1/category`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    return response.json();
  },

  getCategory: async (id: string): Promise<Category> => {
    const response = await fetch(`${baseUrl}/api/v1/category/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch category');
    }
    
    return response.json();
  },

  createCategory: async (categoryData: CreateCategoryData): Promise<Category> => {
    const token = getAuthToken();
    const response = await fetch(`${baseUrl}/api/v1/category`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create category');
    }
    
    return response.json();
  },

  updateCategory: async (id: string, categoryData: Partial<CreateCategoryData>): Promise<Category> => {
    const token = getAuthToken();
    const response = await fetch(`${baseUrl}/api/v1/category/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update category');
    }
    
    return response.json();
  },

  deleteCategory: async (id: string): Promise<void> => {
    const token = getAuthToken();
    const response = await fetch(`${baseUrl}/api/v1/category/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete category');
    }
  }
};
