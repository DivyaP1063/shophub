
const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Auth endpoints
  auth: {
    register: (data: any) => fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
    login: (data: any) => fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
    logout: () => fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST' }),
  },

  // Products endpoints
  products: {
    getAll: (params?: string) => fetch(`${API_BASE_URL}/products${params ? `?${params}` : ''}`),
    getById: (id: string) => fetch(`${API_BASE_URL}/products/${id}`),
    create: (data: FormData, token: string) => fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: data,
    }),
    update: (id: string, data: FormData, token: string) => fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` },
      body: data,
    }),
    delete: (id: string, token: string) => fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    }),
  },

  // Cart endpoints
  cart: {
    get: (token: string) => fetch(`${API_BASE_URL}/cart`, {
      headers: { 'Authorization': `Bearer ${token}` },
    }),
    add: (data: any, token: string) => fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(data),
    }),
    update: (data: any, token: string) => fetch(`${API_BASE_URL}/cart`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(data),
    }),
    remove: (productId: string, token: string) => fetch(`${API_BASE_URL}/cart/${productId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    }),
    clear: (token: string) => fetch(`${API_BASE_URL}/cart`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    }),
  },

  // Wishlist endpoints
  wishlist: {
    get: (token: string) => fetch(`${API_BASE_URL}/wishlist`, {
      headers: { 'Authorization': `Bearer ${token}` },
    }),
    add: (data: any, token: string) => fetch(`${API_BASE_URL}/wishlist`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(data),
    }),
    remove: (productId: string, token: string) => fetch(`${API_BASE_URL}/wishlist/${productId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    }),
  },

  // Orders endpoints
  orders: {
    create: (token: string) => fetch(`${API_BASE_URL}/orders/user`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
    }),
    getUser: (token: string) => fetch(`${API_BASE_URL}/orders/user`, {
      headers: { 'Authorization': `Bearer ${token}` },
    }),
    updateStatus: (orderId: string, status: string, token: string) => fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ status }),
    }),
  },
};
