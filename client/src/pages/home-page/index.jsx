import React from "react";
import HireTrackDescription from "./components/description";
import LogInForm from "./components/loginForm";
import About from "./components/about";
import "./styles.css";

const HomePage = () => {
  return (
    <>
      <div className="hero-row">
        <HireTrackDescription />
        <LogInForm />
      </div>
      <About />
    </>
  );
};

export default HomePage;
