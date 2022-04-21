import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import AllRoutes from "../routes";
import HireTrackNavBar from "../navBar";

const isLoggedIn = true;

function App() {
  return (
    <div className="App">
      {isLoggedIn && <HireTrackNavBar />}
      <AllRoutes />
    </div>
  );
}

export default App;
