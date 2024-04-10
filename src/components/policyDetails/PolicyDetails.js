import React, { useState, useEffect, useRef } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './PolicyDetails.module.scss';
import { baseURL } from '../../Server'
import getCurrentUserId from '../../utils/getCurrentUserId'

const PolicyDetails = () => {
  const navigate = useNavigate();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const location = useLocation();
  const policy = location.state.policy;
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/user/agents`);
        setAgents(response.data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchData();
  }, []);

  const handleBuy = () => {
    setModalIsVisible(true);
  };

  const handleCancel = () => {
    setModalIsVisible(false);
  };

  const handleConfirm = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
  
    if (selectedAgent) {
      const currentuserId = getCurrentUserId();
      const enrollmentDate = formattedDate;
      const policyDuration = policy.duration;
  
      // Calculate end date
      const endDate = new Date(enrollmentDate);
      endDate.setDate(endDate.getDate() + policyDuration);
      const formattedEndDate = endDate.toISOString().split('T')[0];
  
      const updatedBuyPolicyDetails = {
        agentId: selectedAgent,
        userId: Number(currentuserId),
        policyId: policy.id,
        enrollmentDate: enrollmentDate,
        endDate: formattedEndDate
      };


// setBuyPolicyDetails(buyPolicyDetails => buyPolicyDetails)
  
      try {
        const response = await axios.post(`${baseURL}/user/buy-policy`, updatedBuyPolicyDetails);
        console.log("Policy purchase successful:", response.data);
        setModalIsVisible(false);
        alert("Policy purchase successful!");
        navigate("/policies");

      } catch (error) {
        console.error("Error purchasing policy:", error);
        alert("Error purchasing policy. Please try again later.");
      }
    } else {
      alert("Please select an agent.");
    }
  };
  

  const handleAgentChange = (event) => {
    setSelectedAgent(event.target.value);
  };

  return (
    <div>
      <div>
        {policy ? (
          <div>
            <h1>Policy Details</h1>
            <p>Policy Number: {policy.policyNumber}</p>
            <p>Policy Type: {policy.policyTypeName}</p>
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
      {modalIsVisible && (
        <div className={styles.modalOverlay} ref={modalRef}>
          <div className={styles.modalContent}>
            <h2>Select Agent</h2>
            <p>Policy Number: {policy.policyNumber}</p>
            <p>Policy Name: {policy.policyName}</p>
            <select onChange={handleAgentChange}>
              <option value="">Select Agent</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {`${agent.firstName} ${agent.firstName}`}
                </option>
              ))}
            </select>
            <div>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyDetails;
