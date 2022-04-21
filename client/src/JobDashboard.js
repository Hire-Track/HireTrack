import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// dummy data
const data = [
  {title: 'Software Engineer', company: 'Meta', location: 'Menlo Park, CA', application: 'www.meta.com/job', type: 'Full Time', description: 'C++, $120k/year, 401k'},
  {title: 'Software Engineer Intern', company: 'Apple', location: 'New York, NY', application: 'www.apple.com/job', type: 'Internship', description: 'Python, $110k/year, 401k'},
  {title: 'Full Stack Web Developer', company: 'Amazon', location: 'Los Angeles, CA', application: 'www.amazon.com/job', type: 'Full Time', description: 'React, $130k/year, 401k'},
  {title: 'Software Engineer', company: 'Google', location: 'San Francisco, CA', application: 'www.google.com/job', type: 'Full Time', description: 'Java, $140k/year, 401k'},
];

const columns = [{
  dataField: 'title',
  text: 'Job Title'
}, {
  dataField: 'company',
  text: 'Company'
}, {
  dataField: 'location',
  text: 'Location'
}, {
  dataField: 'application',
  text: 'Application'
}, {
  dataField: 'type',
  text: 'Job Type'
}, {
  dataField: 'description',
  text: 'Job Description'
}];

function JobDashboard() {
	return (
		<div>
			<h1>Job Dashboard</h1>
			<BootstrapTable keyField='title' data={data} columns={columns} />
		</div>
	)
}

export default JobDashboard;