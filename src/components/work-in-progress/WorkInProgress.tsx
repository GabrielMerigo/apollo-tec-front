import { Image, Container, Row, Col } from "react-bootstrap";
import workInProgressImage from "../../assets/work-in-progress.png";

export const WorkInProgress = () => {
  return (
    <Container className="text-center" style={{ padding: "10% 0 0 0" }}>
      <Row className="d-flex justify-content-center align-items-center">
        <Col md={8} lg={6}>
          <h4 className="mb-4" style={{ color: "#343a40", fontWeight: "bold" }}>
            Estamos aprimorando nossa plataforma para trazer esta funcionalidade
            em breve. <br /> Agradecemos a sua paciência e compreensão.
          </h4>
          <Image
            src={workInProgressImage}
            alt="Trabalhando na funcionalidade"
            className="img-fluid"
            style={{
              marginTop: "24px",
              maxWidth: "70%",
              height: "auto",
              borderRadius: "8px",
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};
