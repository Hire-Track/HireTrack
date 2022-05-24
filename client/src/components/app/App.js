import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AllRoutes from "../routes";
import HireTrackNavBar from "../navBar";
import HomePage from "../../pages/home-page";
import CreateAccountPage from "../../pages/create-account-page";
import LoadingPage from "../../pages/loading-page";
import { userContext } from "./userContext";

function App() {
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    return <LoadingPage />;
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
          <Route exact path="/*" element={<HomePage user={false} />} />
        </Routes>
      </div>
    );
  }
}

export default App;
