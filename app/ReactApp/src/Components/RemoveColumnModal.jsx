import React, { useState } from "react";
import { Button, Modal, InputGroup, Form, Col } from "react-bootstrap";

const RemoveColumnModal = ({ show, handleClose, handleRemove, columns }) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    form.checkValidity() && handleRemove();
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
              <Form.Label>Select Column Name</Form.Label>
              <InputGroup hasValidation>
                <Form.Select
                  aria-label="Default select example"
                  id="removedColumnName"
                  required
                >
                  {columns?.map((value) => (
                    <option value={value?.name}>{value?.name}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {`Please select Column Name`}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </div>
          <Button className="m-2" type="submit" variant="danger">
            Remove Column
          </Button>
          <Button className="m-2" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveColumnModal;
