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
    const token = localStorage.getItem("token");

    // POST to DB
    fetch('/api/jobs', {
      method: 'POST',
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(values)
    }).then(onSubmitSuccess()).catch(err => console.error(err))
  };

  const onSubmitSuccess = () => {
    window.location.href = "/job-dashboard"
  }

  return (
    <div className="add-job-padding">
      <h3 className="jobs-header-2">Add Job</h3>
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
          <Form.Select aria-label="Default select example" name="jobType" onChange={onChange}>
            <option>Type: </option>
            <option value="INTERNSHIP">INTERNSHIP</option>
            <option value="FULLTIME">FULLTIME</option>
          </Form.Select>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control placeholder="Description: skills, salary, and benefits as applicable" name="jobDescription" onChange={onChange}></Form.Control>
        </Form.Group>
        <br />
        <Button type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddJob;
