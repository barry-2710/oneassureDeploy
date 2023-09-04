import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Navbar.css';
import './Purchase.css';

const Navbar = () => {
    const processedData = useSelector(state => state.cart.processedData);

    const totalAdults = processedData ? processedData.adults.length : 0;
    const totalChildren = processedData ? processedData.children.length : 0;
  
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/home">OneAssure</Link>
        </div>
        <div className="navbar-cart">
          <Link to="/cart">
            <ShoppingCartIcon className='cart-item-icon'/>
            <span className="cart-item-count">{totalAdults + totalChildren}</span>
          </Link>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
