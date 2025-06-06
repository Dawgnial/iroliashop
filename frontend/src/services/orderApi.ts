import { Product } from '../models/Product';
import { baseUrl } from '../constants/baseUrl';

const API_BASE_URL = 'http://localhost:8000';

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
  address?: OrderAddress;
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface OrderAddress {
  fullName: string;
  phone: string;
  address: string;
  postalCode: string;
}

export interface CreateOrderData {
  items: {
    productId: string;
    quantity: number;
  }[];
  address: OrderAddress;
}

export interface UpdateOrderStatusData {
  status: string;
}

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const orderApi = {
  getOrders: async (): Promise<Order[]> => {
    const token = getAuthToken();
    const response = await fetch(`${baseUrl}/api/v1/order`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    
    return response.json();
  },

  getUserOrders: async (): Promise<Order[]> => {
    const token = getAuthToken();
    const response = await fetch(`${baseUrl}/api/v1/order/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user orders');
    }
    
    return response.json();
  },

  createOrder: async (orderData: CreateOrderData): Promise<Order> => {
    const token = getAuthToken();
    const response = await fetch(`${baseUrl}/api/v1/order`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    
    return response.json();
  },

  updateOrderStatus: async (id: string, statusData: UpdateOrderStatusData): Promise<Order> => {
    const token = getAuthToken();
    const response = await fetch(`${baseUrl}/api/v1/order/${id}/status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statusData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update order status');
    }
    
    return response.json();
  },

  updateOrderAddress: async (id: string, address: OrderAddress): Promise<Order> => {
    const token = getAuthToken();
    const response = await fetch(`${baseUrl}/api/v1/order/address/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(address),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update order address');
    }
    
    return response.json();
  },

  deleteOrder: async (id: string): Promise<void> => {
    const token = getAuthToken();
    const response = await fetch(`${baseUrl}/api/v1/order/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete order');
    }
  }
};
