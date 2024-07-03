import { configureStore } from '@reduxjs/toolkit';

// cartReducer: 장바구니 상태를 관리하는 리듀서
import cartReducer from './cartSlice';

// modalReducer:  모달 상태를 관리하는 리듀서
import modalReducer from './modalSlice';

// configureStore를 사용하여 Redux 스토어를 생성
const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
});

export default store;
