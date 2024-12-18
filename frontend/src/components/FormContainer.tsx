import { Container, Row, Col } from "react-bootstrap";

interface FormContainerProps {
  children: React.ReactNode;
}

const FormContainer = ({ children }: FormContainerProps) => {
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col className="card p-5" xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
