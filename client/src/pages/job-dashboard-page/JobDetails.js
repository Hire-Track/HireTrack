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
					id: job._id,
					title: job.jobTitle, 
					company: job.jobCompany,
					location: job.jobLocation,
					application: job.appLink,
					type: job.jobType,
					description: job.jobDescription,
					applied: job.dateApplied.slice(0, 10),
					response: job.dateResponse.slice(0, 10),
					interview: job.dateInterview.slice(0, 10),
					offer: job.dateOffer.slice(0, 10),
					status: job.appStatus,
					next: job.nextSteps,
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
      <Form>
        <Form.Group className="form-padding">
          <Form.Control required placeholder="Title" defaultValue={job.title} name="jobTitle"></Form.Control>
        </Form.Group>

        <Form.Group className="form-padding">
          <Form.Control required placeholder="Company" defaultValue={job.company} name="jobCompany"></Form.Control>
        </Form.Group>

        <Form.Group className="form-padding">
          <Form.Control placeholder="Location" defaultValue={job.location} name="jobLocation"></Form.Control>
        </Form.Group>

        <Form.Group className="form-padding">
          <Form.Control placeholder="Link to Application" defaultValue={job.application} name="appLink"></Form.Control>
        </Form.Group>

        <Form.Group className="form-padding">
          <Form.Control required as="select" onChange={(e)=> onChange(e)} aria-label="Default select example" name="type">
            <option value="" selected disabled>Type: {job.type}</option>
            <option value="INTERNSHIP">INTERNSHIP</option>
            <option value="FULLTIME">FULLTIME</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Control placeholder="Description: skills, salary, and benefits as applicable" defaultValue={job.description} name="jobDescription"></Form.Control>
        </Form.Group>
        <br />

        <div style={{ color: "#5dbb79" }}>Dates</div>
        <Form.Group>
          <Form.Control type="date" placeholder="Applied Date" value={job.applied} name="dateApplied"></Form.Control>
        </Form.Group>
        <div className="form-label">Applied Date</div>

        <Form.Group>
          <Form.Control type="date" placeholder="Response Date" value={job.response} name="dateResponse"></Form.Control>
        </Form.Group>
        <div className="form-label">Response Date</div>

        <Form.Group>
          <Form.Control type="date" placeholder="Interview Date" value={job.interview} name="dateInterview"></Form.Control>
        </Form.Group>
        <div className="form-label">Interview Date</div>

        <Form.Group>
          <Form.Control type="date" placeholder="Offer Date" value={job.offer} name="dateOffer"></Form.Control>
        </Form.Group>
        <div className="form-label">Offer Date</div>
        <br />

        <div style={{ color: "#5dbb79" }}>Process</div>
        <Form.Group className="form-padding">
          <Form.Control required as="select" onChange={(e)=> onChange(e)} aria-label="Default select example" name="status">
            <option value="" selected disabled>Status: {job.status}</option>
            <option value="APPLIED">APPLIED</option>
            <option value="WAITING">WAITING</option>
            <option value="INTERVIEW SCHEDULED">INTERVIEW SCHEDULED</option>
            <option value="INTERVIEW DONE">INTERVIEW DONE</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="form-padding">
          <Form.Control placeholder="Next steps" defaultValue={job.next} name="nextSteps"></Form.Control>
        </Form.Group>

        
        <Form.Group className="form-padding">
          <Form.Control placeholder="Decision" defaultValue={job.decision} name="decision"></Form.Control>
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

        <Button type="submit">Add</Button>
        <Link to="/job-dashboard">
          <Button style={{ marginLeft: "0.5rem" }}>Cancel</Button>
        </Link>
        <br />
        <br />
      </Form>
    </div>
  );
}

export default JobDetails

