import React, { useState } from "react";
import { Container, Form, FormGroup, Row, Col } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import "./styles.css";
import { Bank } from "../../pages/Bancos/types";
import { fetchAllBankCounters, fetchAllBanks } from "../../services/queries";
import { IBankCounter } from "../../pages/Balcões/types";
import { Loading } from "../Loading/Loading";
import { AddButton } from "../AddButton/AddButton";

export type FormValues = {
  name: string;
  code: string | number;
  managerName: string;
  phone: string;
  website: string;
  notes: string;
};

type BankDetailsProps = {
  onSave?: (formValues: FormValues) => void;
};

export const BankDetails: React.FC<BankDetailsProps> = ({ onSave }) => {
  const location = useLocation();
  const { id } = useParams();

  const isBankDetails = location.pathname.includes("/bancos/detalhes/");

  const { data, isLoading } = useQuery<Bank[]>({
    queryKey: ["banks"],
    queryFn: async () => await fetchAllBanks(),
    enabled: isBankDetails && !!id,
  });

  const { data: bankCounter, isLoading: isBankCounterLoading } = useQuery<
    IBankCounter[]
  >({
    queryKey: ["bank-counters"],
    queryFn: async () => await fetchAllBankCounters(),
  });

  const [formValues, setFormValues] = useState<FormValues>(
    data && id && bankCounter
      ? {
          name: data.find((b) => b.id.toString() === id)?.name ?? "",
          code: data.find((b) => b.id.toString() === id)?.id ?? "",
          managerName:
            bankCounter?.find((b) => b.bank.toString() === id)?.manager_name ??
            "",
          phone:
            bankCounter?.find((b) => b.bank.toString() === id)?.mobile ?? "",
          website: data.find((b) => b.id.toString() === id)?.website ?? "",
          notes: bankCounter.find((b) => b.bank.toString() === id)?.notes ?? "",
        }
      : {
          name: "",
          code: "",
          managerName: "",
          phone: "",
          website: "",
          notes: "",
        }
  );

  if (isLoading || isBankCounterLoading) {
    return <Loading />;
  }

  const handleFormChange = (
    e: React.ChangeEvent<unknown>,
    formValue: keyof FormValues
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [formValue]: (e.target as HTMLInputElement).value,
    }));
  };

  return (
    <Container className="p-4">
      <h3 className="fw-semibold mb-4">{`Bancos${
        isBankDetails ? ` | ${formValues?.name}` : ""
      }`}</h3>

      <Container
        className="bank-details-form"
        style={{ padding: "40px 35px", gap: "8px" }}
      >
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between">
          <span className="fw-semibold">Detalhes do banco</span>

          <AddButton
            onClick={() => onSave?.(formValues)}
            label={isBankDetails ? "Salvar alterações" : "Adicionar banco"}
          />
        </div>

        <Row>
          <Col md={3}>
            <FormGroup>
              <Form.Label>Nome do banco</Form.Label>
              <Form.Control
                defaultValue={formValues.name}
                onChange={(e) => handleFormChange(e, "name")}
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Form.Label>Código do banco</Form.Label>
              <Form.Control
                disabled
                defaultValue={formValues.code}
                onChange={(e) => handleFormChange(e, "code")}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={3}>
            <FormGroup>
              <Form.Label>Contato do banco</Form.Label>
              <Form.Control
                defaultValue={formValues.managerName}
                onChange={(e) => handleFormChange(e, "managerName")}
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Form.Label>Telemóvel do banco</Form.Label>
              <Form.Control
                defaultValue={formValues.phone}
                onChange={(e) => handleFormChange(e, "phone")}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={3} className="mt-4 mb-2">
            <span className="fw-semibold">Dados da integração</span>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Form.Label>URL da API</Form.Label>
              <Form.Control
                defaultValue={formValues.website}
                onChange={(e) => handleFormChange(e, "website")}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={3}>
            <FormGroup>
              <Form.Label>Credencial de acesso</Form.Label>
              <Form.Control
                onChange={() => console.log("api não possui esse item")}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                onChange={() => console.log("api não possui esse item")}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup className="textarea-group">
              <Form.Label>Observações</Form.Label>
              <Form.Control
                style={{ height: "74px" }}
                as="textarea"
                placeholder="Insira informações sobre os acordos feitos com o banco parceiro."
                onChange={(e) => handleFormChange(e, "notes")}
                value={formValues.notes ?? ""}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={12}>
            <span className="fw-semibold">Documentos</span>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
