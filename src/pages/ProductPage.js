import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import cartItems from '../constants/cartItems';
import { CartIcon, ChevronDown, ChevronUp } from '../constants/icons';
import {
  addItem,
  increase,
  decrease,
  calculateTotals,
} from '../redux/cartSlice';
import { openModal } from '../redux/modalSlice';

const ProductPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    // 임시 데이터를 카트에 추가
    cartItems.forEach(item => {
      dispatch(addItem(item));
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cart, dispatch]);

  // ClearButton 클릭 시 모달 열기
  const handleClearCart = () => {
    dispatch(openModal());
  };

  return (
    <Container>
      <NavBar>
        <Title>기니 playlist</Title>
        <CartIconWrapper>
          <CartIcon />
          <CartItemCount>{cart.items.reduce((total, item) => total + item.quantity, 0)}</CartItemCount>
        </CartIconWrapper>
      </NavBar>

      <Heading>당신이 선택한 음반</Heading>
      <CartList>
        {cart.items.map((item) => (
          <CartItem key={item.id}>
            <CartImage src={item.img} alt={item.title} />
            <CartDetails>
              <TextDetails>
                <CartTitle>{item.title}</CartTitle>
                <CartSinger>{item.singer}</CartSinger>
                <CartPrice>{item.price}원</CartPrice>
              </TextDetails>

              <QuantityControl>
                <ControlButton onClick={() => dispatch(decrease({ id: item.id }))}>
                  <ChevronDown />
                </ControlButton>
                <Quantity>{item.quantity}</Quantity>
                <ControlButton onClick={() => dispatch(increase({ id: item.id }))}>
                  <ChevronUp />
                </ControlButton>
              </QuantityControl>
            </CartDetails>
          </CartItem>
        ))}
      </CartList>
      <CartHr></CartHr>
      <TotalPrice>총 가격: {cart.totalAmount}원</TotalPrice>
      <ClearButton onClick={handleClearCart}>장바구니 초기화</ClearButton>
    </Container>
  );
};

export default ProductPage;

// Styled Components...


const Container = styled.div`
  padding: 20px;
  background-color: #d6f5ff;
  overflow-y: auto;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #005eff;
  color:white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight:900;
`;

const CartIconWrapper = styled.div`
  position: relative;
  width: 60px;
  cursor: pointer;
  color:white;
`;

const CartItemCount = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color:#84C2FF;
  color: white;
  border-radius: 50%;
  padding: 5px;
  font-size: 20px;
`;

const Heading = styled.h2`
  margin-top: 20px;
  text-align: center;
`;

const CartList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  width: 80%;
  max-width: 600px;
  padding: 10px;
`;

const CartImage = styled.img`
  width: 100px;
`;

const CartDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-left: 10px;
  
`;

const TextDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartTitle = styled.h3`
  font-size: 18px;
  margin-bottom:-5px;
`;

const CartSinger = styled.p`
  font-size: 16px;
  margin-bottom:-10px;
`;

const CartPrice = styled.p`
  font-size: 16px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: blue;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const Quantity = styled.p`
  margin: 0 10px;
`;

const TotalPrice = styled.h2`
  margin-top: 20px;
  text-align: center;
`;

const ClearButton = styled.button`
  display: block;
  margin: 10px auto;
  padding: 10px;
  background-color: white;
  color: red;
  font-weight:bold;
  border:2px solid;
  border-radius:10px;
  cursor: pointer;
  box-shadow: 0 4px 8px -4px black;
  &:hover {
    background-color: rgb(228, 8, 10,0.5);
  }
`;

const CartHr = styled.hr`
  width: 80em;
  padding: 0.3em;
  background-color: #005eff;
  border: none;
`;
