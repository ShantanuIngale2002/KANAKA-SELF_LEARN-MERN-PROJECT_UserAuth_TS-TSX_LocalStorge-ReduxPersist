import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4"> MERN Authentication </h1>
          <p className="text-cneter mb-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum
            minus hic nulla ipsum, suscipit quia alias consequatur iste dolores
            asperiores, consequuntur vel quis deserunt quasi! Ipsum maiores odio
            dolores sunt eos exercitationem repellat dolorem! Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Quibusdam, quo! Vitae,
            dolorum.
          </p>
          <div className="d-flex">
            <Link to="/login">
              <Button className="me-3" variant="primary">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary">Sign Up</Button>
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
