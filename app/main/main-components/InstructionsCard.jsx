import React from 'react';
import '../styles/InstructionsCard.css'; 

const InstructionsCard = ({ title, steps }) => {
  return (
    <div className="instructions-card">
      <h2 className="card-title">{title}</h2>
      <ol className="steps-list">
        {steps.map((step, index) => (
          <li key={index} className="step-item">{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default InstructionsCard;
