import './App.css';

import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Purchase from './components/Purchase';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
    <Navbar />
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/purchase-success" element={<Purchase />} />
      </Routes>
  </div>
  );
}

export default App;
