import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./JobDashboard.css";
import validator from 'validator';

const AddJob = () => {
  const [values, setValues] = useState({});
  const [contact, setContact] = useState({});

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onContactChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact({ ...contact, [name]: value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    e.persist();
    const token = localStorage.getItem("token");

    // replace empty/undefined fields with emptry strings to make them editable
    checkForEmptyFields();

    // validate contact information (phone, email)
    if (validateContactInfo(contact)) {
      // POST job to DB
      fetch('/api/jobs', {
        method: 'POST',
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(values)
      }).then( async (response) => {
        onSubmitSuccess(await response.json(), token).catch(err => console.error(err))
      })
    }
  };

  const checkForEmptyFields = () => {
    values.jobLocation = (values.jobLocation === undefined) ? '' : values.jobLocation;
    values.appLink = (values.appLink === undefined) ? '' : values.appLink;
    values.jobDescription = (values.jobDescription === undefined) ? '' : values.jobDescription;
  }

  const validateContactInfo = (contact) => {
    const validPhoneReg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    if (contact.contactPhone !== undefined && contact.contactPhone.trim().length > 0) {
      if (validPhoneReg.test(contact.contactPhone) === false) {
        return false;
      }
    }

    if (contact.contactEmail !== undefined && contact.contactEmail.trim().length > 0) {
      if (validator.isEmail(contact.contactEmail) === false) {
        return false;
      }
    }
    return true;
  }

  const onSubmitSuccess = (response, token) => {
    // POST contact information to DB
    if (contact.contactName !== undefined && contact.contactName.trim().length > 0) {
      const id = {jobID: response._id};
      const contactInfo = Object.assign(contact, id);

      fetch('/api/contacts', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(contactInfo)
      }).then(window.location.href = "/job-dashboard").catch(err => console.log(err))
    } else {
      window.location.href = "/job-dashboard";
    }
  }

  return (
    <div className="add-job-padding">
      <h3 className="jobs-header-2">Add Job</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group className="form-padding">
          <Form.Control required placeholder="Title" name="jobTitle" onChange={onChange}></Form.Control>
        </Form.Group>

        <Form.Group className="form-padding">
          <Form.Control required placeholder="Company" name="jobCompany" onChange={onChange}></Form.Control>
        </Form.Group>

        <Form.Group className="form-padding">
          <Form.Control placeholder="Location" name="jobLocation" onChange={onChange}></Form.Control>
        </Form.Group>

        <Form.Group className="form-padding">
          <Form.Control placeholder="Link to Application" name="appLink" onChange={onChange}></Form.Control>
        </Form.Group>

        <Form.Group className="form-padding">
          <Form.Control required as="select" aria-label="Default select example" name="jobType" onChange={onChange}>
            <option value="">Type: </option>
            <option value="INTERNSHIP">INTERNSHIP</option>
            <option value="FULLTIME">FULLTIME</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Control placeholder="Description: skills, salary, and benefits as applicable" name="jobDescription" onChange={onChange}></Form.Control>
        </Form.Group>
        <br />

        <div style={{ color: "#5dbb79" }}>Dates</div>
        <Form.Group>
          <Form.Control type="date" placeholder="Applied Date" name="dateApplied" onChange={onChange}></Form.Control>
        </Form.Group>
        <div className="form-label">Applied Date</div>

        <Form.Group>
          <Form.Control type="date" placeholder="Response Date" name="dateResponse" onChange={onChange}></Form.Control>
        </Form.Group>
        <div className="form-label">Response Date</div>

        <Form.Group>
          <Form.Control type="date" placeholder="Interview Date" name="dateInterview" onChange={onChange}></Form.Control>
        </Form.Group>
        <div className="form-label">Interview Date</div>

        <Form.Group>
          <Form.Control type="date" placeholder="Offer Date" name="dateOffer" onChange={onChange}></Form.Control>
        </Form.Group>
        <div className="form-label">Offer Date</div>
        <br />

        <div style={{ color: "#5dbb79" }}>Process</div>
        <Form.Group className="form-padding">
          <Form.Control as="select" aria-label="Default select example" name="appStatus" onChange={onChange}>
            <option value="">Status: </option>
            <option value="APPLIED">APPLIED</option>
            <option value="WAITING">WAITING</option>
            <option value="INTERVIEW SCHEDULED">INTERVIEW SCHEDULED</option>
            <option value="INTERVIEW DONE">INTERVIEW DONE</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="form-padding">
          <Form.Control placeholder="Next steps" name="nextSteps" onChange={onChange}></Form.Control>
        </Form.Group>

        <Form.Group className="form-padding">
          <Form.Control placeholder="Decision" name="decision" onChange={onChange}></Form.Control>
        </Form.Group>
        <br />

        <div style={{ color: "#5dbb79" }}>Contact Information</div>
        <Form.Group className="form-padding">
          <Form.Control placeholder="Name" name="contactName" onChange={onContactChange}></Form.Control>
        </Form.Group>

        <Form.Group className="form-padding">
          <Form.Control placeholder="Phone" name="contactPhone" onChange={onContactChange}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Control placeholder="Email" name="contactEmail" onChange={onContactChange}></Form.Control>
        </Form.Group>
        <br />

        <Button type="submit">Add</Button>
        <Link to="/job-dashboard">
          <Button style={{ marginLeft: "0.5rem" }}>Cancel</Button>
        </Link>
        <br />
        <br />
      </Form>
    </div>
  );
};

export default AddJob;
