import React from 'react';
import { useSelector } from 'react-redux';
import ProductPage from './pages/ProductPage';
import Modal from './redux/modal';
import './App.css';

const App = () => {
  const isOpen = useSelector((state) => state.modal.isOpen);

  return (
    <div className="App">
      <ProductPage />
      {isOpen && <Modal />}
    </div>
  );
};

export default App;
