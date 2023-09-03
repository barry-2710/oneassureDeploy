import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    adults: [],
    children: [],
    processedData: null
  },
  reducers: {
    setAdults: (state, action) => {
      state.adults = action.payload;
    },
    setChildren: (state, action) => {
      state.children = action.payload;
    },
    setProcessedData: (state, action) => {
      state.processedData = action.payload;
    },
    resetCart: (state) => {
      state.adults = [];
      state.children = [];
      state.processedData = null;
    },
    addItemToCart: (state, action) => {
      const { type, item } = action.payload;
      if (type === 'adult') {
        state.adults.push(item);
      } else if (type === 'child') {
        state.children.push(item);
      }
    },
    removeItemFromCart: (state, action) => {
      const { type, id } = action.payload;
      if (type === 'adult') {
        state.adults = state.adults.filter(item => item._id !== id);
      } else if (type === 'child') {
        state.children = state.children.filter(item => item._id !== id);
      }
    },
    
  },
});

export const {
  setAdults,
  setChildren,
  addItemToCart,
  removeItemFromCart,
  setProcessedData,
  resetCart
} = cartSlice.actions;

export const fetchItemsFromJson = () => {
  return async dispatch => {
    try {
      const response = await fetch('https://oneassuredeploy.onrender.com/api/data/getcartdata');
      const data = await response.json();
      data.forEach(item => {
        dispatch(setProcessedData(item));
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
};
export default cartSlice.reducer;