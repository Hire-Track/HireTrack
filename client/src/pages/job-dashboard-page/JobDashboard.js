import React from 'react';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import "./JobDashboard.css";
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

// dummy data
const data = [
  {title: 'Software Engineer', company: 'Meta', location: 'Menlo Park, CA', application: 'www.meta.com/job', type: 'Full Time', description: 'C++, $120k/year, 401k'},
  {title: 'Software Engineer Intern', company: 'Apple', location: 'New York, NY', application: 'www.apple.com/job', type: 'Internship', description: 'Python, $110k/year, 401k'},
  {title: 'Full Stack Web Developer', company: 'Amazon', location: 'Los Angeles, CA', application: 'www.amazon.com/job', type: 'Full Time', description: 'React, $130k/year, 401k'},
  {title: 'Software Engineer', company: 'Google', location: 'San Francisco, CA', application: 'www.google.com/job', type: 'Full Time', description: 'Java, $140k/year, 401k'},
];

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
}];

function JobDashboard() {
	return (
		<div className='jobs-padding'>
      <div>
        <h2 className='jobs-header-2'>Jobs</h2>
        <Link to='/add-job'>
          <Button className='add-job-button'>Add new job</Button>
        </Link>
      </div>   
			<BootstrapTable 
        bordered={ false } 
        cellEdit={ cellEditFactory({ mode:'click' }) }
        keyField='id' 
        data={ data } 
        columns={ columns } />
		</div>
	)
}

export default JobDashboard;