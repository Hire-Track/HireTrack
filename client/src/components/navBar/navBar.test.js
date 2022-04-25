import React from "react";
import HireTrackNavBar from "./index";
import { render, screen, fireEvent } from "@testing-library/react";

test("renders HireTrackNavBar", () => {
  render(<HireTrackNavBar />);
  expect(screen.getByText("HireTrack")).toBeInTheDocument();
  expect(screen.getByText("Jobs")).toBeInTheDocument();
  expect(screen.getByText("Skills")).toBeInTheDocument();
  expect(screen.getByText("Account")).toBeInTheDocument();
});

test("renders HireTrackNavBar with drop down", () => {
  render(<HireTrackNavBar />);
  fireEvent.click(screen.getByText("Jobs"));
  expect(screen.getByText("Jobs Dashboard")).toBeInTheDocument();
});
