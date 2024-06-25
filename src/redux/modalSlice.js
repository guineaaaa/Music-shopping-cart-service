import { createSlice } from '@reduxjs/toolkit';
import { clearCart } from './cartSlice';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalOpen: false,
    isOpen: false,
  },
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearCart, (state) => {
      state.isOpen = false; // 장바구니 비우기 후 모달 닫기
    });
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
