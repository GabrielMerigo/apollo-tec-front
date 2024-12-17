import { FC, ReactNode } from "react";
import Button from "react-bootstrap/Button";
import { ButtonVariant } from "react-bootstrap/esm/types";
import Modal from "react-bootstrap/Modal";
import { Spinner } from "react-bootstrap";

type CustomModalProps = {
  show?: boolean;
  onHide?: () => void;
  modalTitle: string | ReactNode;
  modalDescription: string | ReactNode;
  variant?: "error" | "info" | "success";
  onConfirm?: () => void;
  isLoading?: boolean;
};
export const ConfirmationModal: FC<CustomModalProps> = ({
  show,
  onHide,
  modalTitle,
  modalDescription,
  variant = "info",
  onConfirm,
  isLoading = false,
}) => {
  const variantMap: Record<"error" | "info" | "success", ButtonVariant> = {
    info: "primary",
    error: "danger",
    success: "success",
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalDescription}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button
          className="d-flex align-items-center justify-content-center"
          variant={variantMap[variant]}
          color="danger"
          onClick={onConfirm}
          style={{ maxHeight: "37px" }}
        >
          {isLoading ? <Spinner animation="border" /> : "Confirmar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
