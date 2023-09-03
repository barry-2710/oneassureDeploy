import React, { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const Form = (props) => {

  const premiumData = props.data;
  const [uniqueAge, setuniqueAge] = useState([]);
  const [numAdults, setNumAdults] = useState('');
  const [numChildren, setNumChildren] = useState('');
  const [adultAges, setAdultAges] = useState([]);
  const [childAges, setChildAges] = useState([]);
  const [selectedCityTier, setSelectedCityTier] = useState('');
  const [selectedInsuredSum, setSelectedInsuredSum] = useState('');
  const [selectedTenure, setSelectedTenure] = useState('');

  useEffect(() => {
    const uniqueOptionsAge = new Set(premiumData.map(item => item.age_range));
    setuniqueAge([...uniqueOptionsAge]);
  }, [premiumData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // console.log('Number of Adults:', numAdults);
    // console.log('Adult Ages:', adultAges);
    // console.log('Number of Children:', numChildren);
    // console.log('Child Ages:', childAges);
    // console.log('Selected City Tier:', selectedCityTier);
    // console.log('Selected Insured Sum:', selectedInsuredSum);
    // console.log('Selected Tenure:', selectedTenure);
    const formData = {
        adults: adultAges.map((age, index) => ({ _id : `Adult-${index + 1}`, age, tier: selectedCityTier, tenure: selectedTenure })),
        children: childAges.map((age, index) => ({_id : `Child-${index + 1}`, age, tier: selectedCityTier, tenure: selectedTenure })),
        insuredSum: selectedInsuredSum,
      };

      let currentPlan = numChildren<=0 ? (numAdults+"a") : (numAdults+"a,"+numChildren+"c")
    // console.log('Constructed JSON:', JSON.stringify(formData, null, 2));
    props.formEnteredData(formData, currentPlan)
  };

  const handleNumAdultsChange = (event) => {
    const num = event.target.value;
    setNumAdults(num);
    setAdultAges(Array.from({ length: num }, () => ''));
  };

  const handleNumChildrenChange = (event) => {
    const num = event.target.value;
    setNumChildren(num);
    setChildAges(Array.from({ length: num }, () => ''));
  };

  const handleAdultAgeChange = (index, value) => {
    const updatedAges = [...adultAges];
    updatedAges[index] = value;
    setAdultAges(updatedAges);
  };

  const handleChildAgeChange = (index, value) => {
    const updatedAges = [...childAges];
    updatedAges[index] = value;
    setChildAges(updatedAges);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="number-adults-label" variant='filled' required>Number of Adults</InputLabel>
            <Select value={numAdults} onChange={handleNumAdultsChange} labelId="number-adults-label" id="number-adult-select" required>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel variant='filled' required>Number of Children</InputLabel>
            <Select value={numChildren} onChange={handleNumChildrenChange} required>
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {Array.from({ length: numAdults }, (_, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <FormControl fullWidth>
              <InputLabel variant='filled' required>Adult {index + 1} Age</InputLabel>
              <Select
                required
                value={adultAges[index]}
                onChange={(e) => handleAdultAgeChange(index, e.target.value)}
              >
              {uniqueAge.map((memberOption, index) => (
                <MenuItem key={index} value={memberOption}>
                {memberOption}
                </MenuItem>
            ))}
              </Select>
            </FormControl>
          </Grid>
        ))}
        {Array.from({ length: numChildren }, (_, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <FormControl fullWidth>
              <InputLabel variant='filled' required>Child {index + 1} Age</InputLabel>
              <Select
                required
                value={childAges[index]}
                onChange={(e) => handleChildAgeChange(index, e.target.value)}
              >
              {uniqueAge.map((memberOption, index) => (
                <MenuItem key={index} value={memberOption}>
                {memberOption}
                </MenuItem>
            ))}
              </Select>
            </FormControl>
          </Grid>
        ))}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel variant='filled' required>City Tier</InputLabel>
            <Select
              required
              value={selectedCityTier}
              onChange={(e) => setSelectedCityTier(e.target.value)}
            >
              <MenuItem value="tier-1">Tier 1</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel variant='filled' required>Insured Sum</InputLabel>
            <Select
              required
              value={selectedInsuredSum}
              onChange={(e) => setSelectedInsuredSum(e.target.value)}
            >
              <MenuItem value={500000}>500000</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel variant='filled' required>Tenure</InputLabel>
            <Select
              required
              value={selectedTenure}
              onChange={(e) => setSelectedTenure(e.target.value)}
            >
              <MenuItem value="1yr">1 Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default Form;