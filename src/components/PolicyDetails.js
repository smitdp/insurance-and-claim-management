import React from "react";
import { useLocation } from "react-router-dom";

const PolicyDetails = () => {
  const location = useLocation();

  const policy = location.state.policy;
  console.log(policy);

  const handleBuy = ()=> {
    
  }
 

  return (
    <div>
      {policy != null ? (
        <div>
          <h1>Policy Details</h1>
          <p>Policy Number: {policy.policyNumber}</p>
          <p>PolicyType: {policy.policyTypeName}</p>
          <p>Policy Name: {policy.policyName}</p>
          <p>Description: {policy.description}</p>
          <p>Duration: {policy.duration}</p>
          <p>Installment: {policy.installment}</p>
          <p>Premium amount: {policy.premiumAmount}</p>
          <button onClick={handleBuy}>Buy Policy</button>
        </div>
      ) : (
        <div>No policy data available</div>
      )}
    </div>
  );
};

export default PolicyDetails;
