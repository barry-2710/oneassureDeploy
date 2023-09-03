import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { resetCart } from '../store/cartSlice';


const Purchase = () => {

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(resetCart());
    // }, [dispatch]);
    
  return (
    <div className="purchase-success-container">
    <div className="purchase-success-content">
      <CheckCircleIcon className="success-icon" />
      <h2>Successfully Purchased</h2>
      <p>Your purchase was successful. Thank you for shopping with us!</p>
      <Link to="/" className="home-link">
        Continue Shopping
      </Link>
    </div>
  </div>
  );
};

export default Purchase;