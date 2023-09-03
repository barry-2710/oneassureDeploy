import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; 
import { setProcessedData } from '../store/cartSlice';
import AddToCart from './AddToCart';
import FormatedAmount from './FormatedAmount';


import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
  } from '@mui/material';

const Pricing = (props) => {

    const formData = props.formData;
    const adultCosts = props.adultCost;
    const childrenCosts = props.childrenCost;
    const [cost, setCost] = useState();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(setProcessedData(processedData));
    }
    const mergedData = {
        adults: formData.adults.map((adult, index) => ({
          ...adult,
          cost: adultCosts[index].cost,
        })),
        children: formData.children.map((child, index) => ({
          ...child,
          cost: childrenCosts[index].cost,
        })),
        insuredSum: formData.insuredSum,
      };

      const discountedPriceFunction = (data) => {
        
        const maxAgeAdult = data.adults.reduce((maxAge, adult) => {
          const ageRange = adult.age.split('-').map(Number);
          const maxAgeRange = maxAge.age.split('-').map(Number);
          return ageRange[1] > maxAgeRange[1] ? adult : maxAge;
        });

        let totalDiscountedPrice = 0;

  const processedData = {
    adults: data.adults.map((adult) => {
      const discountedCost = adult === maxAgeAdult ? adult.cost : adult.cost * 0.5;
      const discount = adult === maxAgeAdult ? "0%" : "50%";
      totalDiscountedPrice += discountedCost;
      return {
        ...adult,
        cost: discountedCost,
        discount
      };
    }),
    children: data.children.map((child) => {
      const discountedCost = child.cost * 0.5;
      const discount = "50%";
      totalDiscountedPrice += discountedCost;
      return {
        ...child,
        cost: discountedCost,
        discount
      };
    }),
    insuredSum: data.insuredSum,
    totalDiscountedPrice
  };
  // console.log("processData", processedData)
  return { processedData, totalDiscountedPrice };
  

        
      }
    const { processedData, totalDiscountedPrice } = discountedPriceFunction(mergedData);

    useEffect(() => {
      setCost(totalDiscountedPrice);
    }, [totalDiscountedPrice]);
    return (
        <form onSubmit={handleSubmit}>
            <TableContainer component={Paper} style={{"marginTop": "20px"}}>
                    <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell><b>Agent</b></TableCell>
                            <TableCell><b>Age</b></TableCell>
                            <TableCell><b>Tenure</b></TableCell>
                            <TableCell><b>City Tier</b></TableCell>
                            <TableCell><b>Discount</b></TableCell>
                            <TableCell><b>Discounted price</b></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {processedData.adults.map((adult) => (
                            <TableRow key={adult._id}>
                              <TableCell>{adult._id}</TableCell>
                              <TableCell>{adult.age}</TableCell>
                              <TableCell>{adult.tenure}</TableCell>
                              <TableCell>{adult.tier}</TableCell>
                              <TableCell>{adult.discount}</TableCell>
                              <TableCell>{adult.cost && <FormatedAmount amount={adult.cost}/>}</TableCell>
                            </TableRow>
                          ))}
                          {processedData.children.map((child) => (
                            <TableRow key={child._id}>
                              <TableCell>{child._id}</TableCell>
                              <TableCell>{child.age}</TableCell>
                              <TableCell>{child.tenure}</TableCell>
                              <TableCell>{child.tier}</TableCell>
                              <TableCell>{child.discount}</TableCell>
                              <TableCell>{child.cost && <FormatedAmount amount={child.cost}/>}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell>Total Cost</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>{cost && <FormatedAmount amount={cost}/>}</TableCell>
                          </TableRow>
                        </TableBody>
                    </Table>
            </TableContainer>
              <AddToCart item={processedData} />
        </form>
    );
}

export default Pricing;
