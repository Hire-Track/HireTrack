import React from "react";
import HomePage from "./index";
import { render } from "@testing-library/react";

test("renders HomePage", () => {
  render(<HomePage />);
  expect(document.getElementsByClassName("hero-row")).toBeTruthy();
});
