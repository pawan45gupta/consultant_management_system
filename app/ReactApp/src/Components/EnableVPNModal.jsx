import React from "react";
import { Button, Modal, Form, InputGroup, Col } from "react-bootstrap";

const VPNModal = ({ show, handleClose, handleDelete }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Confirmation</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Are you sure to enable/disable VPN?
      <Form noValidate>
        <div>
        <Form.Group as={Col} md="12" controlId="boardingModal">
          <Form.Label>USER ID</Form.Label>
          <InputGroup hasValidation>
            <Form.Select
              id={"userID"}
              aria-label="Default select example"
              required={"true"}
            >
              <option value={"test"}>Test</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {`Please enter User ID`}
            </Form.Control.Feedback>
          </InputGroup>
          </Form.Group>
        </div>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleDelete}>
        Confirm
      </Button>
    </Modal.Footer>
  </Modal>
);

export default VPNModal;
