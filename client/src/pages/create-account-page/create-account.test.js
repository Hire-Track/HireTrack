import React from "react";
import CreateAccountPage from "./index";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";

test("renders CreateAccountPage", () => {
  render(
    <BrowserRouter>
      <CreateAccountPage />
    </BrowserRouter>
  );
  expect(screen.getByText(/Create an Account/)).toBeInTheDocument();
});

test("submit button is clicked", () => {
  render(
    <BrowserRouter>
      <CreateAccountPage />
    </BrowserRouter>
  );
  const button = screen.getByText("Submit");
  fireEvent.click(button);
});
