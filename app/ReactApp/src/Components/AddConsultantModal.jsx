import React from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";

const AddConsultantModal = ({ show, handleClose, handleAdd, rowData }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add Consultant</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {rowData &&
        rowData.length > 0 &&
        Object.keys(rowData[0]).map(
          (col) =>
            col !== "id" && (
              <div>
                <InputGroup className="mb-3">
                  <FormControl
                    id={col}
                    placeholder={`Enter ${col}`}
                    aria-label={col}
                    aria-describedby={col}
                  />
                </InputGroup>
              </div>
            )
        )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleAdd}>
        Add
      </Button>
    </Modal.Footer>
  </Modal>
);

export default AddConsultantModal;
