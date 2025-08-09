import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Cart } from '@/types';
import { api } from '@/lib/api';

export const fetchCart = createAsyncThunk<Cart>(
  'cart/fetchCart',
  async (token: string) => {
    const response = await api.cart.get(token);
    const data = await response.json();
    return data;
  }
);

export const updateCartItem = createAsyncThunk<Cart, { productId: string; quantity: number; token: string }>(
  'cart/updateCartItem',
  async ({ productId, quantity, token }) => {
    const response = await api.cart.update({ product: productId, quantity }, token);
    const data = await response.json();
    return data;
  }
);

export const removeCartItem = createAsyncThunk<Cart, { productId: string; token: string }>(
  'cart/removeCartItem',
  async ({ productId, token }) => {
    const response = await api.cart.remove(productId, token);
    const data = await response.json();
    return data; // Should be the updated cart!
  }
);

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

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCart.pending, state => {
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
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export default cartSlice.reducer;