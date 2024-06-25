import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount = calculateTotalAmount(state.items);
    },
    
    increase: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity += 1;
        state.totalAmount = calculateTotalAmount(state.items);
      }
    },
    decrease: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalAmount = calculateTotalAmount(state.items);
      } else {
        state.items = state.items.filter(item => item.id !== id);
        state.totalAmount = calculateTotalAmount(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
    calculateTotals: (state) => {
      state.totalAmount = calculateTotalAmount(state.items);
    },
  },
});

const calculateTotalAmount = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const { addItem, removeItem, increase, decrease, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
