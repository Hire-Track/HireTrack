import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "./JobDashboard.css";

function JobDetails() {
	const [job, setJob] = useState({})
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setJob({ ...job, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    e.persist();
    const token = localStorage.getItem("token");

    // PUT to DB
    fetch(`/api/jobs/${job._id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(job)
    }).then(onSubmitSuccess()).catch(err => console.error(err))
  }

  const onSubmitSuccess = () => {
    window.location.href = "/job-dashboard"
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

        {/* <div style={{ color: "#5dbb79" }}>Contact</div>
        <Form.Group>
          <Form.Control placeholder="Name" name="contactName" onChange={onChange}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Control placeholder="Phone" name="contactPhone" onChange={onChange}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Control placeholder="Email" name="contactEmail" onChange={onChange}></Form.Control>
        </Form.Group>
        <br /> */}

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

