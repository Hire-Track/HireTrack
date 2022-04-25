import React from "react";
import SkillsDashboard from "./index";
import { render, screen } from "@testing-library/react";

test("renders SkillsDashboard", () => {
  render(<SkillsDashboard />);
  expect(screen.getByText("Skills")).toBeInDocument();
});
