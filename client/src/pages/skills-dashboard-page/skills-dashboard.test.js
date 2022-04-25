import React from "react";
import { SkillCard, SkillListItem } from "./components/skillCard";
import { render, screen } from "@testing-library/react";

test("renders SkillsCard", () => {
  const handleOpen = jest.fn();
  render(
    <SkillCard
      name="React"
      level="Beginner"
      jobCount={5}
      handleOpen={handleOpen}
    />
  );
  expect(screen.getByText("React")).toBeInTheDocument();
  expect(screen.getByText(/Beginner/)).toBeInTheDocument();
});

test("renders SkillListItem", () => {
  const handleOpen = jest.fn();
  render(
    <SkillListItem
      name="React"
      level="Beginner"
      jobCount={5}
      handleOpen={handleOpen}
    />
  );
  expect(screen.getByText("React")).toBeInTheDocument();
  expect(screen.getByText(/Beginner/)).toBeInTheDocument();
});
