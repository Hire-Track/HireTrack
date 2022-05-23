import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import "./JobDashboard.css";

const columns = [{
  dataField: 'title',
  text: 'Title',
  headerStyle: { color: '#347571'},
  style: {color: '#224e4b'}
}, {
  dataField: 'company',
  text: 'Company',
  headerStyle: { color: '#347571'},
  style: {color: '#224e4b'}
}, {
  dataField: 'location',
  text: 'Location',
  headerStyle: { color: '#347571'},
  style: {color: '#224e4b'}
}, {
  dataField: 'application',
  text: 'Application',
  headerStyle: { color: '#347571'},
  style: {color: '#224e4b'}
}, {
  dataField: 'type',
  text: 'Type',
  editor: {
    type: Type.SELECT,
    options: [
      {
        value: "INTERNSHIP",
        label: "INTERNSHIP"
      },
      {
        value: "FULLTIME",
        label: "FULLTIME"
      }
    ]
  },
  headerStyle: { color: '#347571'},
  style: {color: '#224e4b'}
}, {
  dataField: 'description',
  text: 'Description',
  headerStyle: { color: '#347571'},
  style: {color: '#224e4b'}
}, {
  editable: false,
  formatter: (content, row) => {
    return (
      <button className='delete-button' onClick = {() => deleteJob(row.id)}>
        Delete
      </button>
    )
  }
}, {
  editable: false,
  formatter: (content, row) => {
    return (
      <button className='delete-button' onClick = {() => jobDetails(row.id)}>
        More
      </button>
    )
  }
}];

const jobDetails = (jobID) => {
  window.location.href = `/job-dashboard/${jobID}`
}

const deleteJob = (jobId) => {
  if (window.confirm("Are you sure you want to delete this job?")) {
    const token = localStorage.getItem("token");
    fetch(`api/jobs/${jobId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then( async (response) => {
      onSubmitSuccess(await response.json(), token).catch(err => console.err(err))
  })}
}

const onSubmitSuccess = (response, token) => {
  fetch(`api/contacts/${response.id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then( async (contactResponse) => {
    deleteContact(await contactResponse.json(), token).catch(err => console.err(err))
  })
}

const deleteContact = (contactResponse, token) => {
  if (contactResponse.length !== 0) {
    fetch(`api/contacts/${contactResponse[0]._id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then(window.location.href = "/job-dashboard").catch(err => console.log(err))

  } else {
    window.location.href = "/job-dashboard"
  }
}

function JobDashboard() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

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
        setJobs(data);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const populateTableData = (json) => {
    let dataArray = [];
    json.forEach(job => {
    
      let each = 
      { 
        id: job._id,
        title: job.jobTitle, 
        company: job.jobCompany,
        location: job.jobLocation,
        application: job.appLink,
        type: job.jobType,
        description: job.jobDescription
      }

      dataArray.push(each)
    });
    return dataArray;
  }

  const afterSaveCell = (oldValue, newValue, row, column) => {
    const jobId = row.id;
    let values = {
      jobTitle: row.title,
      jobCompany: row.company,
      jobLocation: row.location,
      appLink: row.application,
      jobType: row.type,
      jobDescription: row.description
    }

    // PUT to DB
    fetch(`api/jobs/${jobId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(values)
    })
  }

	return (
		<div className='jobs-padding'>
    {loading}
      <div>
        <h2 className='jobs-header-2'>Jobs</h2>
        <Link to='/add-job'>
          <Button className='add-job-button'>Add new job</Button>
        </Link>
      </div>

			<BootstrapTable 
        bordered={ false } 
        cellEdit={ cellEditFactory({ 
          mode:'click',
          blurToSave: true,
          afterSaveCell: (oldValue, newValue, row, column) => {
            afterSaveCell(oldValue, newValue, row, column);
          }
        }) }
        keyField= 'id'
        data={ jobs } 
        columns={ columns } />

		</div>
	)
}

export default JobDashboard;