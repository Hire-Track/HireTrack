import React from 'react';
import './App.css';
import JobDashboard from './JobDashboard';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/job-dashboard" element={<JobDashboard/ >} />
      </Routes>
    </div>
  );
}

export default App;
