import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
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
}];

const deleteJob = (jobId) => {
  const token = localStorage.getItem("token");
  fetch(`api/jobs/${jobId}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }).then(onSubmitSuccess().catch(err => console.err(err)))
}

const onSubmitSuccess= () => {
  window.location.href = "/job-dashboard"
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
        console.log(json);
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