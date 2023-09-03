import React, { useEffect, useState } from 'react';

const PremiumForm = (props) => {

    const premiumData = props.data;

    const [uniqueAge, setuniqueAge] = useState([]);
    const [uniqueTier, setuniqueTier] = useState([]);

    const handleMemberChange = (event) => {
        console.log(event.target.value);
      };

      useEffect(() => {
        // Use a Set to store unique member options
        const uniqueOptionsAge = new Set(premiumData.map(item => item.age_range));
        setuniqueAge([...uniqueOptionsAge]);

        const uniqueOptionsTier = new Set(premiumData.map(item => item.tier));
        setuniqueTier([...uniqueOptionsTier]);
        console.log(uniqueOptionsAge)
      }, [premiumData]);

  return (
    <>
    <div>
    <label>Select Age: </label>
    <select onChange={handleMemberChange}>
      <option value="">Select Age</option>
      {uniqueAge.map((memberOption, index) => (
        <option key={index} value={memberOption}>
          {memberOption}
          {console.log(memberOption)}
        </option>
      ))}
      </select>
    </div>
    <div>
    <label>City Tier: </label>
    <select onChange={handleMemberChange}>
      <option value="">Select Age</option>
      {uniqueTier.map((tier, index) => (
        <option key={index} value={tier}>
          {tier}
        </option>
      ))}
    </select>
  </div>
  <div>
    <label>Plan: </label>
    <select onChange={handleMemberChange}>
      <option value="">Select Age</option>
      {uniqueTier.map((tier, index) => (
        <option key={index} value={tier}>
          {tier}
        </option>
      ))}
    </select>
  </div>
    </>
  );
}

export default PremiumForm;
