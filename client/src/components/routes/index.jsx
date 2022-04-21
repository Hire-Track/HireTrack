import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "../../pages/home-page";
import JobDashboard from "../../pages/job-dashboard-page/JobDashboard";

const AllRoutes = () => {
  const routeComponents = [
    { path: "/", component: <HomePage /> },
    { path: "/signup", component: <HomePage /> },
    { path: "/job-dashboard", component: <JobDashboard /> },
    { path: "/skills", component: <HomePage /> },
    { path: "/contacts", component: <HomePage /> },
  ];

  // TODO
  let isLoggedIn = true;
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route exact path={"/"} element={<HomePage />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        {routeComponents.map(({ path, component }, key) => (
          <Route exact path={path} element={component} key={key} />
        ))}
      </Routes>
    );
  }
};

export default AllRoutes;