import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "./JobDashboard.css";
import validator from 'validator';

function JobDetails() {
	const [job, setJob] = useState({});
  const [contact, setContact] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const token = localStorage.getItem("token");

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setJob({ ...job, [name]: value });
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

    if (validateContactInfo(contact) === false) {
      setError(true);
    } else {
      // PUT job to DB
      fetch(`/api/jobs/${job._id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(job)
      }).then( async (response) => {
        onSubmitSuccess(await response.json(), token).catch(err => console.error(err))
      })
    }
    
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
    // PUT contact information to DB
    if (contact.contactName !== undefined && contact.contactName.trim().length > 0) {
      const id = {jobID: response._id};
      const contactInfo = Object.assign(contact, id);

      fetch(`/api/contacts/${contact._id}`, {
        method: 'PUT',
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/jobs', {
          headers: {
            "Authorization": `Bearer ${token}`  
          }
        });
        const json = await response.json();
        let data = populateTableData(json);
        setJob(data);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const windowUrl = window.location.pathname;
		const id = windowUrl.split("/")[2];

    const fetchContact = async () => {
      try {
        const contactResponse = await fetch(`/api/contacts/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`  
          }
        });
        const contactJson = await contactResponse.json();
        let contactData = populateContactData(contactJson);
        setContact(contactData);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchContact();
  }, []);

  const populateTableData = (json) => {
		const windowUrl = window.location.pathname;
		const id = windowUrl.split("/")[2];
		let each;
		
    json.forEach(job => {
			if (job._id === id) {
				 each = 
      	{ 
					_id: job._id,
					jobTitle: job.jobTitle, 
					jobCompany: job.jobCompany,
					jobLocation: job.jobLocation,
					appLink: job.appLink,
					jobType: job.jobType,
					jobDescription: job.jobDescription,
					dateApplied: (job.dateApplied === undefined || job.dateApplied === null) ? undefined : job.dateApplied.slice(0, 10),
					dateResponse: (job.dateResponse === undefined || job.dateResponse === null) ? undefined : job.dateResponse.slice(0, 10),
					dateInterview: (job.dateInterview === undefined || job.dateInterview === null) ? undefined : job.dateInterview.slice(0, 10),
					dateOffer: (job.dateOffer === undefined || job.dateOffer === null) ? undefined : job.dateOffer.slice(0, 10),
					appStatus: job.appStatus,
					nextSteps: job.nextSteps,
					decision: job.decision
      	}
			}
    });
		return each;
  }

  const populateContactData = (contactJson) => {
    let contactInfo = 
    {
      _id: contactJson[0]._id,
      contactName: contactJson[0].contactName,
      contactPhone: contactJson[0].contactPhone,
      contactEmail: contactJson[0].contactEmail
    }
    return contactInfo
  }

	return (
    <div className="add-job-padding">
			{setLoading}
      <h3 className="jobs-header-2">Job Details</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group className="form-padding">
          <Form.Control required placeholder="Title" defaultValue={job.jobTitle} onSelect={(e)=> onChange(e)} onChange={(e)=> onChange(e)} name="jobTitle">
          </Form.Control>
        </Form.Group>

        <Form.Group className="form-padding">
          <Form.Control required placeholder="Company" defaultValue={job.jobCompany} onSelect={(e)=> onChange(e)} onChange={(e)=> onChange(e)} name="jobCompany">
          </Form.Control>
        </Form.Group>

        <Form.Group className="form-padding">
          <Form.Control placeholder="Location" defaultValue={job.jobLocation} onSelect={(e)=> onChange(e)} onChange={(e)=> onChange(e)} name="jobLocation">
          </Form.Control>
        </Form.Group>

        <Form.Group className="form-padding">
          <Form.Control placeholder="Link to Application" defaultValue={job.appLink} onSelect={(e)=> onChange(e)} onChange={(e)=> onChange(e)} name="appLink">
          </Form.Control>
        </Form.Group>

        <Form.Group className="form-padding">
          <Form.Control as="select" onChange={(e)=> onChange(e)} aria-label="Default select example" name="jobType">
            <option value="" selected disabled>Type: {job.jobType}</option>
            <option value="INTERNSHIP">INTERNSHIP</option>
            <option value="FULLTIME">FULLTIME</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Control placeholder="Description: skills, salary, and benefits as applicable" 
            defaultValue={job.jobDescription} onSelect={(e)=> onChange(e)} onChange={(e)=> onChange(e)} name="jobDescription">
          </Form.Control>
        </Form.Group>
        <br />

        <div style={{ color: "#5dbb79" }}>Dates</div>
        <Form.Group>
          <Form.Control type="date" placeholder="Applied Date" value={job.dateApplied} onChange={(e)=> onChange(e)} name="dateApplied">
          </Form.Control>
        </Form.Group>
        <div className="form-label">Applied Date</div>

        <Form.Group>
          <Form.Control type="date" placeholder="Response Date" value={job.dateResponse} onChange={(e)=> onChange(e)} name="dateResponse">
          </Form.Control>
        </Form.Group>
        <div className="form-label">Response Date</div>

        <Form.Group>
          <Form.Control type="date" placeholder="Interview Date" value={job.dateInterview} onChange={(e)=> onChange(e)} name="dateInterview">
          </Form.Control>
        </Form.Group>
        <div className="form-label">Interview Date</div>

        <Form.Group>
          <Form.Control type="date" placeholder="Offer Date" value={job.dateOffer} onChange={(e)=> onChange(e)} name="dateOffer">
          </Form.Control>
        </Form.Group>
        <div className="form-label">Offer Date</div>
        <br />

        <div style={{ color: "#5dbb79" }}>Process</div>
        <Form.Group className="form-padding">
          <Form.Control as="select" onChange={(e)=> onChange(e)} aria-label="Default select example" name="appStatus">
            <option value="" selected disabled>Status: {job.appStatus}</option>
            <option value="APPLIED">APPLIED</option>
            <option value="WAITING">WAITING</option>
            <option value="INTERVIEW SCHEDULED">INTERVIEW SCHEDULED</option>
            <option value="INTERVIEW DONE">INTERVIEW DONE</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="form-padding">
          <Form.Control placeholder="Next steps" defaultValue={job.nextSteps} onSelect={(e)=> onChange(e)} onChange={(e)=> onChange(e)} name="nextSteps">
          </Form.Control>
        </Form.Group>

        <Form.Group className="form-padding">
          <Form.Control placeholder="Decision" defaultValue={job.decision} onSelect={(e)=> onChange(e)} onChange={(e)=> onChange(e)} name="decision">
          </Form.Control>
        </Form.Group>
        <br />

        <div style={{ color: "#5dbb79" }}>Contact Information</div>
        <Form.Group className="form-padding">
          <Form.Control placeholder="Name" defaultValue={contact.contactName} name="contactName" onSelect={(e)=> onContactChange(e)} onChange={(e) => onContactChange(e)}></Form.Control>
        </Form.Group>

        <Form.Group className="form-padding">
          <Form.Control placeholder="Phone" defaultValue={contact.contactPhone} name="contactPhone" onSelect={(e)=> onContactChange(e)} onChange={(e) => onContactChange(e)}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Control placeholder="Email" defaultValue={contact.contactEmail} name="contactEmail" onSelect={(e)=> onContactChange(e)} onChange={(e) => onContactChange(e)}></Form.Control>
        </Form.Group>
        <br />
        {error && (
          <span style={{ color: "red", fontSize: "small" }}>
            Please enter a valid phone number and/or email
          </span>
        )}
        <br />
        <Button type="submit">Save</Button>
        <Link to="/job-dashboard">
          <Button style={{ marginLeft: "0.5rem" }}>Go Back</Button>
        </Link>
        <br />
        <br />
      </Form>
    </div>
  );
}

export default JobDetails

