import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "../../pages/home-page";
import CreateAccountPage from "../../pages/create-account-page";
import JobDashboard from "../../pages/job-dashboard-page/JobDashboard";
import JobDetails from "../../pages/job-dashboard-page/JobDetails";
import AddJob from "../../pages/job-dashboard-page/addJob";
import SkillsDashboard from "../../pages/skills-dashboard-page";
import AddSkillPage from "../../pages/skills-dashboard-page/add-skill-page";
import AccountPage from "../../pages/account-page";
import ResetPage from "../../pages/reset-page";
import RequestResetPage from "../../pages/request-reset";

const AllRoutes = ({ user }) => {
  const routeComponents = [
    { path: "/", component: <HomePage user={user} /> },
    { path: "/signup", component: <CreateAccountPage /> },
    { path: "/job-dashboard", component: <JobDashboard /> },
    { path: "/job-dashboard/:jobId", component: <JobDetails /> },
    { path: "/add-job", component: <AddJob /> },
    { path: "/skills", component: <SkillsDashboard /> },
    { path: "/add-skill", component: <AddSkillPage /> },
    { path: "/account", component: <AccountPage /> },
    { path: "/reset/:token", component: <ResetPage /> },
    { path: "/request-reset", component: <RequestResetPage /> }
  ];

  return (
    <Routes>
      {routeComponents.map(({ path, component }, key) => (
        <Route exact path={path} element={component} key={key} />
      ))}
    </Routes>
  );
};

export default AllRoutes;
