import { Product } from '../models/Product';
import { baseUrl } from '../constants/baseUrl';

const API_BASE_URL = 'http://localhost:8000';

export interface BasketItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface AddToBasketData {
  productId: string;
  quantity: number;
}

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const basketApi = {
  getBasket: async (): Promise<BasketItem[]> => {
    const token = getAuthToken();
    const response = await fetch(`${baseUrl}/api/v1/basket`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch basket');
    }
    
    return response.json();
  },

  addToBasket: async (data: AddToBasketData): Promise<BasketItem> => {
    const token = getAuthToken();
    const response = await fetch(`${baseUrl}/api/v1/basket`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add to basket');
    }
    
    return response.json();
  },

  clearBasket: async (): Promise<void> => {
    const token = getAuthToken();
    const response = await fetch(`${baseUrl}/api/v1/basket`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to clear basket');
    }
  }
};
