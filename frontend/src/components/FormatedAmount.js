import React from 'react';

const FormatedAmount = (props) => {
    const formatedAmount = props.amount.toLocaleString();
    return (
        <b>{formatedAmount} Rs</b>
    )
}

export default FormatedAmount;
