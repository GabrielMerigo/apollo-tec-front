import { Col, Container, Form, Row } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { IBankCounter } from "../../pages/Balcões/types";
import { fetchAllBankCounters, fetchAllBanks } from "../../services/queries";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";
import { AddButton } from "../AddButton/AddButton";

type BankCounterDetailsProps = {
  onSave: (
    formValues: Omit<IBankCounter, "id" | "createdAt" | "updatedAt" | "email">
  ) => void;
};
export const BankCounterDetails: React.FC<BankCounterDetailsProps> = ({
  onSave,
}) => {
  const isBankCounterDetails = location.pathname.includes("/balcoes/detalhes/");

  const handleSave = () => {
    onSave(formValues);
  };

  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["bank-counters"],
    queryFn: async () => await fetchAllBankCounters(),
    enabled: isBankCounterDetails,
  });

  const { data: banks } = useQuery({
    queryKey: ["banks"],
    queryFn: async () => await fetchAllBanks(),
  });

  const selectedBankCounter = data?.find(
    (bankCounter) => id && bankCounter.id.toLocaleString() === id
  );

  const [formValues, setFormValues] = useState<
    Omit<IBankCounter, "id" | "createdAt" | "updatedAt" | "email">
  >(() =>
    selectedBankCounter
      ? {
          bank: selectedBankCounter.bank,
          manager_email: selectedBankCounter.manager_email,
          manager_name: selectedBankCounter.manager_name,
          mobile: selectedBankCounter.mobile,
          name: selectedBankCounter.name,
          notes: selectedBankCounter.name,
          phone: selectedBankCounter.phone,
          status: selectedBankCounter.status,
        }
      : {
          bank: 0,
          manager_email: "",
          manager_name: "",
          mobile: "",
          name: "",
          notes: "",
          phone: "",
          status: 0,
        }
  );
  console.log("formValues", formValues);

  const handleFormChange = (
    e: React.ChangeEvent<unknown>,
    formValue: keyof Omit<IBankCounter, "id" | "createdAt" | "updatedAt">
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [formValue]: (e.target as HTMLInputElement).value,
    }));
  };
  return (
    <Container>
      <h3 className="fw-semibold mb-4">{`Balcões | ${
        isBankCounterDetails ? "Editar" : "Adicionar"
      }`}</h3>

      <Container
        className="bank-details-form"
        style={{ padding: "40px 35px", gap: "8px" }}
      >
        <div className="mb-4 d-flex justify-content-between align-center">
          <span className="fw-semibold" style={{ fontSize: "20px" }}>
            {isBankCounterDetails ? "Editar balcão" : "Adicionar balcão"}
          </span>

          {isBankCounterDetails ? (
            <div className="d-flex gap-2">
              <ButtonIcon label="Cancelar alterações" className="btn-light" />
              <AddButton label="Salvar alterações" onClick={handleSave} />
            </div>
          ) : (
            <AddButton label="Salvar" onClick={handleSave} />
          )}
        </div>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Banco vinculado</Form.Label>
              <Form.Select
                defaultValue={formValues.bank}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    bank: parseInt(e.target.value),
                  }))
                }
              >
                {banks?.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Nome da taxa</Form.Label>
              <Form.Control
                value={formValues.name}
                onChange={(e) => handleFormChange(e, "name")}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                onChange={(e) => handleFormChange(e, "notes")}
                value={formValues.notes}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Form.Group>
              <Form.Label>Localização</Form.Label>
              <Form.Control onChange={() => console.log("falta esse dado")} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Gerente responsável</Form.Label>
              <Form.Control
                onChange={(e) => handleFormChange(e, "manager_name")}
                value={formValues.manager_name}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Horário de funcionamento</Form.Label>
              <Form.Control onChange={() => console.log("falta esse dado")} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Telemóvel</Form.Label>
              <Form.Control
                onChange={(e) => handleFormChange(e, "phone")}
                value={formValues.phone}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                onChange={(e) => handleFormChange(e, "manager_email")}
                value={formValues.manager_email}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    status: parseInt(e.target.value) as 0 | 1,
                  }))
                }
                value={formValues.status}
              >
                <option value={1}>Ativo</option>
                <option value={0}>Inativo</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
