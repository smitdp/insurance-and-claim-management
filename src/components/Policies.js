import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../Server";
import axios from "axios";

const Policies = () => {
  const [policies, setPolicies] = useState([]);
  const [policyTypes, setPolicyTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const token = localStorage.getItem("login");
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(`${baseURL}/policy`, {headers:{Authorization:`Bearer ${token}`, credentials:true}});
        setPolicies(response.data);
        const types = Array.from(new Set(response.data.map(policy => policy.policyTypeName)));
        setPolicyTypes(types);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPolicies();
  }, []);

  const handleTypeChange = (type) => {
    const updatedTypes = [...selectedTypes];
    const index = updatedTypes.indexOf(type);
    if (index !== -1) {
      updatedTypes.splice(index, 1);
    } else {
      updatedTypes.push(type);
    }
    setSelectedTypes(updatedTypes);
  };

  const handleClearFilter = () => {
    setSelectedTypes([]);
  };

  const filteredPolicies = selectedTypes.length === 0 ? policies : policies.filter(policy => selectedTypes.includes(policy.policyTypeName));

  return (
    <div>
      <h1>Policies</h1>
      <button onClick={handleClearFilter}>Clear Filter</button>
      <h2>Filter by Policy Type:</h2>
      {policyTypes.map(type => (
        <div key={type}>
          <label>
            <input
              type="checkbox"
              value={type}
              checked={selectedTypes.includes(type)}
              onChange={() => handleTypeChange(type)}
            />
            {type}
          </label>
        </div>
      ))}
      <ul>
        {filteredPolicies.map((policy) => (
          <li key={policy.id}>
            <h3>{policy.policyName}</h3>
            <p>Type: {policy.policyTypeName}</p>
            <Link to={"/policy"} state={{ policy: policy }}>
              Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Policies;
