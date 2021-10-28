import React, { useState } from "react";
import {
  Button,
  Modal,
  InputGroup,
  Form,
  Col,
} from "react-bootstrap";

const AddConsultantModal = ({ show, handleClose, handleAdd, rowData }) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    form.checkValidity() && handleAdd();
    setValidated(true);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Consultant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {rowData &&
            rowData.length > 0 &&
            Object.keys(rowData[0]).map(
              (col) =>
                col !== "id" && (
                  <div>
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationCustomUsername"
                    >
                      <Form.Label>{col}</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          id={col}
                          type={col === 'Consultant Start Date' || col === 'Proposed End Date' ? 'date': 'string' }
                          placeholder={`Enter ${col}`}
                          required
                          // defaultValue={"test"}
                        />
                        <Form.Control.Feedback type="invalid">
                          {`Please enter ${col}`}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </div>
                )
            )}
          <Button className="m-2" type="submit">
            Add
          </Button>
          <Button className="m-2" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddConsultantModal;
