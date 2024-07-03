import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 장바구니 초기 상태
const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalPrice: 0,
  status: 'idle',
  error: null,
};

// 서버에서 장바구니 아이템을 가져오기
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems', 
  async (_,thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:8080/musics');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('에러가 발생했습니다. 데이터 요청 경로를 다시 확인해주세요.');
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount = calculateTotalAmount(state.cartItems);
    },
    increase: (state, action) => {
      const { id } = action.payload;
      const item = state.cartItems.find(item => item.id === id);
      if (item) {
        item.quantity = (item.quantity || 0) + 1; // ensure quantity is a number
        state.totalAmount = calculateTotalAmount(state.cartItems);
      }
    },
    decrease: (state, action) => {
      const { id } = action.payload;
      const item = state.cartItems.find(item => item.id === id);
      if (item) {
        item.quantity = (item.quantity || 0) - 1; // ensure quantity is a number
        if (item.quantity < 1) {
          state.cartItems = state.cartItems.filter(item => item.id !== id);
        }
        state.totalAmount = calculateTotalAmount(state.cartItems);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
    },
    calculateTotals: (state) => {
      state.totalAmount = calculateTotalAmount(state.cartItems);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload.map(item => ({
          ...item,
          quantity: item.quantity || 0, // ensure quantity is a number
        }));
        state.totalAmount = calculateTotalAmount(state.cartItems);
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        alert(action.payload);
      });
      
  },
});

const calculateTotalAmount = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity || 0), 0);
};

export const { addItem, increase, decrease, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
