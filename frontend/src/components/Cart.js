import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItemsFromJson, resetCart } from '../store/cartSlice';
import CartTotal from './CartTotal';
import { Link } from 'react-router-dom';
import './Cart.css';
import FormatedAmount from './FormatedAmount';

const Cart = () => {
  const processedData = useSelector(state => state.cart.processedData);
  const dispatch = useDispatch();

  const handleEmptyCart = async () => {
      const response = await fetch('https://oneassuredeploy.onrender.com/api/data/emptycart',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })

      const json = await response.json()

      if(!response.ok){
          console.log(json.error)
      }
      if(response.ok){
          console.log('Cart is empty', json)
          dispatch(resetCart());
      }
    }

  useEffect(() => {
    dispatch(fetchItemsFromJson());
  }, [dispatch]);

  return (
    <div className="cart">
      <h2>Your Cart</h2>

      {processedData && (
        <div className="cart-items">
          <div className="cart-table">
            <table>
              <thead>
                <tr>
                  <th>Agent</th>
                  <th>Age</th>
                  <th>Tenure</th>
                  <th>City Tier</th>
                  <th>Discount</th>
                  <th>Discounted Price</th>
                </tr>
              </thead>
              <tbody>
                {processedData.adults.map(item => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.age}</td>
                    <td>{item.tenure}</td>
                    <td>{item.tier}</td>
                    <td>{item.discount}</td>
                    <td><FormatedAmount amount={item.cost}/></td>
                  </tr>
                ))}
                {processedData.children.map(item => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.age}</td>
                    <td>{item.tenure}</td>
                    <td>{item.tier}</td>
                    <td>{item.discount}</td>
                    <td><FormatedAmount amount={item.cost}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {processedData ? <CartTotal /> : <h4>Is empty, please go to the Homepage</h4>}

      {processedData && (
        <div className="cart-actions">
          <button className="empty-cart-btn" onClick={handleEmptyCart}>Empty Cart</button>
          <Link to="/oneassureDeploy/purchase-success" className="buy-now-btn" onClick={handleEmptyCart}>Buy Now</Link>
        </div>
      )}
    </div>
  );
};

export default Cart;