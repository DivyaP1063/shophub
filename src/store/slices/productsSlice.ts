
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';
import { api } from '@/lib/api';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    category: string;
    priceRange: string;
    size: string;
    sortBy: string;
  };
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    category: 'all',
    priceRange: 'all',
    size: 'all',
    sortBy: 'latest',
  },
};

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params?: string) => {
    const response = await api.products.getAll(params);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch products');
    }
    return data.products || data;
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async ({ productData, token }: { productData: FormData; token: string }) => {
    const response = await api.products.create(productData, token);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create product');
    }
    return data;
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData, token }: { id: string; productData: FormData; token: string }) => {
    const response = await api.products.update(id, productData, token);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update product');
    }
    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async ({ id, token }: { id: string; token: string }) => {
    const response = await api.products.delete(id, token);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete product');
    }
    return id;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ProductsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
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
      // Create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create product';
      })
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update product';
      })
      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(p => p._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete product';
      });
  },
});

export const { setFilters, clearFilters, clearError } = productsSlice.actions;
export default productsSlice.reducer;
