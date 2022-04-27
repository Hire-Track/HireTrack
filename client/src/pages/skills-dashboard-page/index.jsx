import React from "react";
import Button from "react-bootstrap/button";
import { Link } from "react-router-dom";
import PageHeader from "../../components/header";
import SkillsRow from "./components/skillsRow";
import "./styles.css";

const SkillsDashboard = () => {
  const AddSkillBtn = () => (
    <Link to="/add-skill">
      <Button>Add Skill</Button>
    </Link>
  );

  return (
    <div className="main-content">
      <PageHeader text="Skills" button={<AddSkillBtn />} />
      <SkillsRow />
    </div>
  );
};

export default SkillsDashboard;
