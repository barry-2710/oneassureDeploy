import React from 'react';
import classes from './Homepage.module.css'
import { useEffect, useState } from 'react';
import Form from './Form';
import { useDispatch } from 'react-redux';
import { fetchItemsFromJson } from '../store/cartSlice';


import Pricing from './Pricing';

const Homepage = () => {
    const [jsonData, setJsonData] = useState([]);
    const [formData, setFormData] = useState(null);
    const [adultCost, setadultCost] = useState(null);
    const [childrenCost, setchildrenCost] = useState(null);
    const [plan, setPlan] = useState("");
    const dispatch = useDispatch();

    const formEnteredData = (formData,currentPlan) => {

      setFormData(formData)
      setPlan(currentPlan)
      const adultsCriteria = formData.adults.map((adult) => ({
        age: adult.age,
        tier: adult.tier,
      }));
      const childrenCriteria = formData.children.map((child) => ({
        age: child.age,
        tier: child.tier,
      }));

      const insuredSum = formData.insuredSum;

      const adultsFilteredData = [];

      adultsCriteria.forEach((criteria) => {
        const matchingItems = jsonData.filter(
          (item) =>
            criteria.age === item.age_range &&
            criteria.tier === item.tier &&
            currentPlan === item.member_csv &&
            item[insuredSum]
        );
      
        adultsFilteredData.push(...matchingItems);
      });

      const childrenFilteredData = [];

      childrenCriteria.forEach((criteria) => {
        const matchingItems = jsonData.filter(
          (item) =>
            criteria.age === item.age_range &&
            criteria.tier === item.tier &&
            currentPlan === item.member_csv &&
            item[insuredSum]
        );
      
        childrenFilteredData.push(...matchingItems);
      });

      // console.log("adultsFilteredData",adultsFilteredData,"childrenFilteredData",childrenFilteredData)

      const adultsCosts = adultsFilteredData.map((item) => ({
        member_csv: item.member_csv,
        age_range: item.age_range,
        tier: item.tier,
        insuredSum: insuredSum,
        cost: item[insuredSum],
      }));
      
      const childrenCosts = childrenFilteredData.map((item) => ({
        member_csv: item.member_csv,
        age_range: item.age_range,
        tier: item.tier,
        insuredSum: insuredSum,
        cost: item[insuredSum],
      }));


      setadultCost(adultsCosts)
      setchildrenCost(childrenCosts)
    
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://oneassuredeploy.onrender.com/api/data');
            const data = await response.json();
            dispatch(fetchItemsFromJson());
            setJsonData(data);
          } catch (error) {
            console.error('Error:', error);
          }
        };
        fetchData();
      }, [dispatch]);

    return (
      <div className={classes.content}>
      <h2 className={classes.welcometext}>
        Welcome to OneAssure Premium Calculator
      </h2>
      <div className={classes.card}>
        <Form data={jsonData} formEnteredData={formEnteredData} />
      </div>
      { (adultCost || childrenCost) && 
        <div className={classes.card}>
          <div className={classes.pricingcard}>
            <h2>The premium selected is {plan}</h2>
            <Pricing adultCost={adultCost} childrenCost={childrenCost} formData={formData} />
          </div>
        </div>
      }
    </div>
    );
}

export default Homepage;
