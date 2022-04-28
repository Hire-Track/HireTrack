import React from "react";
import App from "./App";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("renders app component", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(document.getElementsByClassName("App")).toBeTruthy();
});
