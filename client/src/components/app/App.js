import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AllRoutes from "../routes";
import HireTrackNavBar from "../navBar";
import HomePage from "../../pages/home-page";
import CreateAccountPage from "../../pages/create-account-page";
import { userContext } from "./userContext";

function App() {
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkLogin = async () => {
    setIsLoading(true);
    const resp = await userContext();
    if (resp) {
      setUser(resp);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (user) {
    return (
      <div className="App">
        <HireTrackNavBar />
        <AllRoutes user={user} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Routes>
        <Route exact path="/signup" element={<CreateAccountPage />} />
        <Route exact path="/*" element={<HomePage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
