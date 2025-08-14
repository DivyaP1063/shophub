import { createSlice } from '@reduxjs/toolkit';

interface AuthModalState {
  isOpen: boolean;
}

const initialState: AuthModalState = {
  isOpen: false,
};

const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    openAuthModal: (state) => {
      state.isOpen = true;
    },
    closeAuthModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openAuthModal, closeAuthModal } = authModalSlice.actions;
export default authModalSlice.reducer;