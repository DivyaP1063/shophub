import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Wishlist } from '@/types';
import { api } from '@/lib/api';

export const fetchWishlist = createAsyncThunk<Wishlist>(
  'wishlist/fetchWishlist',
  async (token: string) => {
    const response = await api.wishlist.get(token);
    const data = await response.json();
    return data;
  }
);

export const removeWishlistItem = createAsyncThunk<Wishlist, { productId: string; token: string }>(
  'wishlist/removeWishlistItem',
  async ({ productId, token }) => {
    const response = await api.wishlist.remove(productId, token);
    const data = await response.json();
    return data;
  }
);

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

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWishlist.pending, state => {
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
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      });
  },
});

export default wishlistSlice.reducer;