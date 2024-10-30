import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import "./index.css";

const Attendance = () => {
  const location = useLocation();
  const { game } = location.state || {};
  const navigate = useNavigate();

  if (!game) {
    return <h1>No Game Data Available</h1>;
  }

  const handleAttendance = (status) => {
    console.log(
      `Attendance for ${game.homeTeam} vs ${game.awayTeam}: ${status}`
    );
    navigate(`/schedule`); // Navigate back
  };

  return (
    <Container fluid className="attendance-container">
      <Row>
        <Col>
          <Card className="attendance-card">
            <Card.Body>
              <Card.Title>
                Attendance for {game.homeTeam} vs {game.awayTeam}
              </Card.Title>
              <Card.Text>
                <p>Date: {game.date}</p>
                <p>Time: {game.time}</p>
                <p>Location: {`${game.location} - ${game.rink}`}</p>
              </Card.Text>
              <div className="attendance-buttons">
                <Button
                  variant="success"
                  onClick={() => handleAttendance("Yes")}
                >
                  Yes
                </Button>
                <Button variant="danger" onClick={() => handleAttendance("No")}>
                  No
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Attendance;
