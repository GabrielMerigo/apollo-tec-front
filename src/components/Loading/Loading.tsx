import { Spinner } from "react-bootstrap";

export const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Spinner animation="grow">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
