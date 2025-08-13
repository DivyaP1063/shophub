import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '@/types';
import { api } from '@/lib/api';

// Fetch all products
export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const response = await api.products.getAll();
    const data = await response.json();
    return data.products || data;
  }
);

// Fetch single product by ID
export const fetchProductById = createAsyncThunk<Product, string>(
  'products/fetchProductById',
  async (id) => {
    const response = await api.products.getById(id);
    const data = await response.json();
    return data;
  }
);

interface ProductsState {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProduct(state) {
      state.product = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchProductById.pending, state => {
        state.loading = true;
        state.error = null;
        state.product = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch product';
        state.product = null;
      });
  },
});

export const { clearProduct } = productsSlice.actions;
export default productsSlice.reducer;