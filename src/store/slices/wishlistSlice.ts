
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Wishlist } from '@/types';
import { api } from '@/lib/api';

interface WishlistState {
  wishlist: Wishlist | null;
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  wishlist: null,
  loading: false,
  error: null,
};

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (token: string) => {
    const response = await api.wishlist.get(token);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch wishlist');
    }
    return data;
  }
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async ({ productId, token }: { productId: string; token: string }) => {
    const response = await api.wishlist.add({ product: productId }, token);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add to wishlist');
    }
    return data;
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async ({ productId, token }: { productId: string; token: string }) => {
    const response = await api.wishlist.remove(productId, token);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to remove from wishlist');
    }
    return productId;
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearWishlist: (state) => {
      state.wishlist = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch wishlist';
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        if (state.wishlist) {
          state.wishlist.products = state.wishlist.products.filter(
            product => product._id !== action.payload
          );
        }
      });
  },
});

export const { clearWishlist, clearError } = wishlistSlice.actions;
export default wishlistSlice.reducer;
