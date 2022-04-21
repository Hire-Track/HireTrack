import React from "react";
import { Container } from "react-bootstrap";
import styles from './styles.css';

export const HomePage = () => {
  return (
    <Container>
      <div className={'row'}>
        <div>
            <h1>HireTrack</h1>
        </div>
        <div>
            <h2>Log In</h2>
        </div>
      </div>
    </Container>
  );
};
