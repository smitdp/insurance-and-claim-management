import React, { useEffect, useState } from "react";
import { baseURL } from "../Server";
import axios from "axios";

const MyPolicies = () => {
  const [myPolicies, setMyPolicies] = useState([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(`${baseURL}/user/my-policies/2`);
        setMyPolicies(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPolicies();
  }, []);

  return (
    <div>
      <h1>My Policies</h1>
      <ul>
        {myPolicies.map((policy) => (
          <li key={policy.id}>
            <h3>{policy.policyName}</h3>
            <p>Type: {policy.policyTypeName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPolicies;
