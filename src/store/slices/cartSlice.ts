
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Cart, CartItem } from '@/types';
import { api } from '@/lib/api';

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (token: string) => {
    const response = await api.cart.get(token);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch cart');
    }
    return data;
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity, token }: { productId: string; quantity: number; token: string }) => {
    const response = await api.cart.add({ product: productId, quantity }, token);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add to cart');
    }
    return data;
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, quantity, token }: { productId: string; quantity: number; token: string }) => {
    const response = await api.cart.update({ product: productId, quantity }, token);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update cart');
    }
    return data;
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ productId, token }: { productId: string; token: string }) => {
    const response = await api.cart.remove(productId, token);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to remove from cart');
    }
    return productId;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cart';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (state.cart) {
          state.cart.items = state.cart.items.filter(
            item => item.product._id !== action.payload
          );
        }
      });
  },
});

export const { clearCart, clearError } = cartSlice.actions;
export default cartSlice.reducer;
