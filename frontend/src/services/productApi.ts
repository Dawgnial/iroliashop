import { Product } from '../models/Product';
import { baseUrl } from '../constants/baseUrl';

const API_BASE_URL = 'http://localhost:8000';

export interface CreateProductData {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const productApi = {
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${baseUrl}/api/v1/product`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return response.json();
  },

  getProduct: async (id: string): Promise<Product> => {
    const response = await fetch(`${baseUrl}/api/v1/product/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    
    return response.json();
  },

  createProduct: async (productData: CreateProductData): Promise<Product> => {
    const token = getAuthToken();
    const response = await fetch(`${baseUrl}/api/v1/product`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    
    return response.json();
  },

  updateProduct: async (id: string, productData: Partial<CreateProductData>): Promise<Product> => {
    const token = getAuthToken();
    const response = await fetch(`${baseUrl}/api/v1/product/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    
    return response.json();
  },

  deleteProduct: async (id: string): Promise<void> => {
    const token = getAuthToken();
    const response = await fetch(`${baseUrl}/api/v1/product/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  }
};
