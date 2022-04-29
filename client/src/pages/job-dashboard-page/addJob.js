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

    // TO-DO: fetch token from localStorage instead
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNmI2NmMwNDUxZWZkNWU5ZjAxNjEzOSIsImlhdCI6MTY1MTIwNTgyNCwiZXhwIjoxNjUzNzk3ODI0fQ.3fcp8EceqnFJADbtfgd0XoJafBrwe5E1LLT66kLvFe0";

    // POST to DB
    fetch('http://localhost:5000/api/jobs', {
      method: 'POST',
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(values)
    })

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
