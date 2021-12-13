import React from "react";
import { Button, Modal, Form, InputGroup, Col } from "react-bootstrap";

const EditConsultantModal = ({ show, handleClose, columns }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Consultant</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form noValidate>
        {/* validated={validated} onSubmit={handleSubmit}> */}
        <div>
          <Form.Group as={Col} md="12" controlId="validationCustomUsername">
            {columns &&
              columns.length > 0 &&
              columns.map(
                (col) =>
                  col?.name !== "id" && (
                    <div>
                      <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                        <Form.Label>{col?.name}</Form.Label>
                        <InputGroup hasValidation>
                          {col?.type === "dropdown" ? (
                            <Form.Select
                              id={col?.name}
                              aria-label="Default select example"
                              required={col?.validations.length > 0}
                            >
                              {col?.options?.map((value) => (
                                <option value={value}>{value}</option>
                              ))}
                            </Form.Select>
                          ) : (
                            <Form.Control
                              id={col?.name}
                              type={col?.type}
                              // type={col?.name === 'Consultant Start Date' || col?.name === 'Proposed End Date' ? 'date': 'string' }
                              placeholder={`Enter ${col?.name}`}
                              required={col?.validations.length > 0}
                              // defaultValue={"test"}
                            />
                          )}
                          <Form.Control.Feedback type="invalid">{`Please enter ${col?.name}`}</Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </div>
                  )
              )}
            {/* <Form.Label>UserId</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                id={"userID"}
                type={"text"}
                placeholder={`Enter UserID`}
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                {`Please enter value`}
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Label>LastName</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                id={"LastName"}
                type={"text"}
                placeholder={`Enter LastName`}
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                {`Please enter LastName`}
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Label>FirstName</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                id={"FirstName"}
                type={"text"}
                placeholder={`Enter FirstName`}
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                {`Please enter FirstName`}
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Label>Company</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                id={"Company"}
                type={"text"}
                placeholder={`Enter Company`}
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                {`Please enter Company`}
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Label>Sponsor</Form.Label>
            <InputGroup hasValidation>
              <Form.Select
                id={"sponsor"}
                aria-label="Default select example"
                required={"true"}
              >
                <option value={"IBM"}>IBM</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {`Please enter Sponsor`}
              </Form.Control.Feedback>
            </InputGroup> */}
            <Form.Label>Is Account Manager</Form.Label>
            <InputGroup hasValidation>
              <Form.Check id={"isAccountManager"} required={"true"}></Form.Check>
              <Form.Control.Feedback type="invalid">{`Please enter Company`}</Form.Control.Feedback>
            </InputGroup>
            <Form.Label>Companies Regex</Form.Label>
            <InputGroup hasValidation>
              <Form.Control id={"CompanyRegex"} type={"text"} placeholder={`Enter CompanyRegex`} required={true} />
              <Form.Control.Feedback type="invalid">{`Please enter CompanyRegex`}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </div>
        <Button className="m-2" type="submit">
          Submit
        </Button>
        <Button className="m-2" variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Form>
    </Modal.Body>
    <Modal.Footer></Modal.Footer>
  </Modal>
);

export default EditConsultantModal;
