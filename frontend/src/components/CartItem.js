import React from 'react';

const CartItem = ({ item, type }) => {
  return (
    <div className="cart-item">
      <p>Agent: {item._id}</p>
      <p>Age: {item.age}</p>
      <p>Tier: {item.tier}</p>
      <p>Tenure: {item.tenure}</p>
      <p>Cost: {item.cost}</p>
      <p>Discount: {item.discount}</p>
    </div>
  );
};

export default CartItem;