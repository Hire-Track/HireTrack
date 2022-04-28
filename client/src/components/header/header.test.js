import React from "react";
import PageHeader from "./index";
import { render, screen } from "@testing-library/react";

test("renders PageHeader", () => {
  render(<PageHeader text={"Header"} />);
  expect(screen.getByText("Header")).toBeInTheDocument();
});
