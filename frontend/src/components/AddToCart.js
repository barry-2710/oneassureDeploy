import React from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../store/cartSlice';
import { useState } from 'react';
import {
  Button,
  Alert
} from '@mui/material';


const AddToCart = ({ item }) => {

  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
        const response = await fetch('https://oneassuredeploy.onrender.com/api/data/addtocart',{
          method: 'POST',
          body: JSON.stringify(item),
          headers: {
              'Content-Type': 'application/json'
          }
      })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            console.log(json.error)
        }
        if(response.ok){
            setError(null)
            dispatch(addItemToCart(item));
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 3000);
        }
      }

  return (
    <div>
    <Button type="submit" variant="contained" color="primary" onClick={handleAddToCart} style={{"marginTop": "20px"}}>Add to Cart</Button>
      {showAlert && (
        <Alert severity="success" color="success" variant='filled' style={{"marginTop": "20px"}}>
          Item added to cart
        </Alert>
      )}
      {error && (
        <Alert severity="success" color="success" variant='filled' style={{"marginTop": "20px"}}>
          {error}
        </Alert>
      )}
    </div>  
  );
};

export default AddToCart;