import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./JobDashboard.css";

const AddJob = () => {
  const [values, setValues] = useState({});

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    e.persist();
    // console.log(values);

    // POST to DB

    // SUCCESS HANDLER
    // onSubmitSuccess();

    // ERROR HANDLER
  };

  // const onSubmitSuccess = () => {
  // }

  return (
    <div className="add-job-padding">
      <h3 className="jobs-header-2">Add job</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Control placeholder="Title" name="jobTitle" onChange={onChange}></Form.Control>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control placeholder="Company" name="jobCompany" onChange={onChange}></Form.Control>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control placeholder="Location" name="jobLocation" onChange={onChange}></Form.Control>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control placeholder="Link to Application" name="appLink" onChange={onChange}></Form.Control>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control placeholder="Job Type" name="jobType" onChange={onChange}></Form.Control>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control placeholder="Job Description" name="jobDescription" onChange={onChange}></Form.Control>
        </Form.Group>
        <br />
        <Button type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddJob;
