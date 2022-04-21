import React from "react";
import { Routes, Route } from "react-router";
import { HomePage } from "../../pages/home-page";

export const AllRoutes = () => {
  const routeComponents = [
    { path: "/", component: <HomePage /> },
    // {path: '/job-dashboard', component: },
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
