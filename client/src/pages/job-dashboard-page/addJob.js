import React from "react";
import { Form, Button } from "react-bootstrap";
import "./JobDashboard.css";

const AddJob = () => {

	// TODO
	const onClickSubmit = (e) =>{
		window.alert("Submitted")
		// SUBMIT TO DB

		// SUCCESS HANDLER 
		onSubmitSuccess();
		// ERROR HANDLER
	}

	const onSubmitSuccess = () => {

	}

  return (
    <div className="add-job-padding">
      <h3 className="jobs-header-2">Add job</h3>

      <Form>
        <Form.Group>
          <Form.Control placeholder="Title"></Form.Control>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control placeholder="Company"></Form.Control>
        </Form.Group>
        <br />
				<Form.Group>
          <Form.Control placeholder="Location"></Form.Control>
        </Form.Group>
        <br />
				<Form.Group>
          <Form.Control placeholder="Link to Application"></Form.Control>
        </Form.Group>
        <br />
				<Form.Group>
          <Form.Control placeholder="Job Type"></Form.Control>
        </Form.Group>
        <br />
				<Form.Group>
          <Form.Control placeholder="Job Description"></Form.Control>
        </Form.Group>
        <br />
        <Button onClick={onClickSubmit}>
					Submit
				</Button>
      </Form>
    </div>
  );
};

export default AddJob;
