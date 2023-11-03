import React from "react";
import "./ReportModal.css"; // Import the CSS file for modal styles

const ReportModal = ({ onClose, report }) => {
  if (!report) return null;

  return (
    <div className={`modal-wrapper ${report ? "active" : ""}`}>
      <div className={`modal ${report ? "active" : ""}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Session ID: {report.sid}</h2>
            <button className="close-btn" onClick={onClose}>
              X
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-image-placeholder"></div>
            <div className="modal-details">
              <p>
                <strong>Disease:</strong> {report.disease}
              </p>
              <p>
                <strong>Time:</strong>
              </p>
              <p>
                <strong>Accuracy:</strong> {report.accuracy}
              </p>
              {/* Add more detailed information here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
