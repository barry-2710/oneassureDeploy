import React from 'react';
import { useSelector } from 'react-redux';
import FormatedAmount from './FormatedAmount';

const CartTotal = () => {
  const processedData = useSelector(state => state.cart.processedData);

  const totalCost = processedData ? processedData.totalDiscountedPrice : 0;

  const getTotalItems = () => {
    const totalAdults = processedData ? processedData.adults.length : 0;
    const totalChildren = processedData ? processedData.children.length : 0;
    return totalAdults + totalChildren;
  };

  return (
    <div className="cart-total">
      <h4>Total Number Agents: {getTotalItems()}</h4>
      <h4>Total cost to Pay: <b><FormatedAmount amount={totalCost}/></b></h4>
    </div>
  );
};

export default CartTotal;