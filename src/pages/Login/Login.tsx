import React from "react";
import { Button, Card, Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo-2.png";

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Lógica de autenticação
    navigate("/dashboard");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 vw-100"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <Card className="p-5 shadow-sm">
        <Image src={Logo} className="mb-4" />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" style={{ fontSize: "20px" }}>
              Login
            </Form.Label>
            <Form.Control
              style={{ height: "64px", borderRadius: "12px" }}
              type="text"
              className="shadow-sm w-100"
            />
          </Form.Group>

          <Form.Group className="mb-3 w-100">
            <Form.Label className="fw-bold" style={{ fontSize: "20px" }}>
              Senha
            </Form.Label>
            <Form.Control
              style={{ height: "64px", borderRadius: "12px" }}
              type="password"
              className="shadow-sm"
            />
          </Form.Group>

          <div className="d-flex flex-column align-items-center">
            <Button
              className="fw-bold"
              type="submit"
              style={{
                backgroundColor: "#DECC70",
                width: "168px",
                height: "64px",
                fontSize: "20px",
                marginTop: "44px",
              }}
            >
              Entrar
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};
