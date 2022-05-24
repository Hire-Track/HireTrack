import React from "react";
import Carousel from "react-bootstrap/Carousel";

const ExampleCarousel = () => (
  <div className="main-content body-text text-center">
      <h3>Examples:</h3>
    <Carousel variant="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/jobs.png"
          alt="Jobs Dashboard"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/skills.png"
          alt="Skills Dashboard"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/skills_modal.png"
          alt="Skills Detail"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/process.png"
          alt="Job Process Tracker"
        />
      </Carousel.Item>
    </Carousel>
  </div>
);

export default ExampleCarousel;
