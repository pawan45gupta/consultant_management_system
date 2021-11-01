import React, { useState } from "react";
import { Button, Modal, InputGroup, Form, Col } from "react-bootstrap";

const AddColumnModal = ({ show, handleClose, handleAdd }) => {
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
        <Modal.Title>Add Column</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div>
            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
              <Form.Label>Column Name</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  id={"ColumnName"}
                  type={"string"}
                  placeholder={`Enter Column Name`}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {`Please enter Column Name`}
                </Form.Control.Feedback>
              </InputGroup>
              <Form.Label>Column DataType</Form.Label>
              <InputGroup hasValidation>
                <Form.Select aria-label="Default select example" id="type" required>
                  <option value="string">String</option>
                  <option value="date">Date</option>
                  <option value="number">Number</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {`Please select Column Data Type`}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </div>
          <Button className="m-2" type="submit">
            Add Column
          </Button>
          <Button className="m-2" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddColumnModal;
