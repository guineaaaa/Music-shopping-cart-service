import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { closeModal } from '../redux/modalSlice';
import { clearCart } from '../redux/cartSlice';

const Modal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);

  const handleConfirmClear = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleCloseModal}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalContent>
          <Message>담아두신 음반을 전부 삭제하시겠습니까?</Message>
          <ButtonContainer>
            <ConfirmButton onClick={handleConfirmClear}>예</ConfirmButton>
            <CancelButton onClick={handleCloseModal}>아니오</CancelButton>
          </ButtonContainer>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default Modal;

// Styled Components...

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ModalContent = styled.div`
  text-align: center;
`;

const Message = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ConfirmButton = styled.button`
  background-color: white;
  color: blue;
  border: 1px solid blue;
  border-radius:10px;
  padding: 10px 30px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgb(51, 135, 255,0.5);
  }
`;

const CancelButton = styled.button`
  background-color: white;
  color: red;
  border: 1px solid red;
  border-radius:10px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: rgb(255, 51, 51,0.5);
  }
`;
