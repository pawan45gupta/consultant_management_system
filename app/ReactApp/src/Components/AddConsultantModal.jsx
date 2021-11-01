import React, { useState } from "react";
import {
  Button,
  Modal,
  InputGroup,
  Form,
  Col,
} from "react-bootstrap";

const AddConsultantModal = ({ show, handleClose, handleAdd, columns }) => {
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
          {columns &&
            columns.length > 0 &&
            columns.map(
              (col) =>
                col?.name !== "id" && (
                  <div>
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationCustomUsername"
                    >
                      <Form.Label>{col?.name}</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          id={col?.name}
                          type={col?.type}
                          // type={col?.name === 'Consultant Start Date' || col?.name === 'Proposed End Date' ? 'date': 'string' }
                          placeholder={`Enter ${col?.name}`}
                          required
                          // defaultValue={"test"}
                        />
                        <Form.Control.Feedback type="invalid">
                          {`Please enter ${col?.name}`}
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
