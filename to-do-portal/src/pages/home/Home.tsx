import { Col, Container, Row } from "react-bootstrap";
import { IconContext } from "react-icons";
import { PiListChecksLight } from "react-icons/pi";

export const Home = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Row>
        <Col style={{ marginTop: "50px", alignContent: "center" }}>
          <h1 style={{ marginLeft: "20px" }}>To Do</h1>
          <IconContext.Provider value={{ size: "150px" }}>
            <PiListChecksLight />
          </IconContext.Provider>
        </Col>
      </Row>
    </Container>
  );
};
