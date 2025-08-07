import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FaTools, FaExclamationTriangle } from "react-icons/fa";

const UnderConstructionModal = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="bg-success text-dark">
        <Modal.Title className="d-flex align-items-center">
          <FaExclamationTriangle className="me-2" />
          Website Under Maintenance
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center py-4">
        <div className="mb-4">
          <FaTools size={64} className="text-success mb-3" />
          <h4 className="text-dark mb-3">Scheduled Maintenance in Progress</h4>
          <p className="text-muted mb-3">
            Our website is currently undergoing maintenance to serve you better.
          </p>
          <div className="bg-light p-3 rounded">
            <h6 className="text-dark mb-2">Estimated Availability:</h6>
            <p className="text-dark mb-0">
              The website will be available at <strong>4:00 AM</strong>.
            </p>
          </div>
        </div>
        <p className="text-muted small">
          We apologize for any inconvenience and appreciate your patience.
        </p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="success" onClick={onHide}>
          Okay
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UnderConstructionModal;
