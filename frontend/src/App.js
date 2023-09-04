import './App.css';

import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Purchase from './components/Purchase';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
    <Navbar />
    <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/purchase-success" element={<Purchase />} />
        <Route path='*' element={<Navigate to="/home" replace />} />
      </Routes>
  </div>
  );
}

export default App;
