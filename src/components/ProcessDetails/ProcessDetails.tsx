import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Person,
  Process,
  ProcessRequest,
  ProcessStatus,
  ProcessType,
  User,
} from "../../pages/Processes/types";
import {
  fetchAllPersons,
  fetchAllProcessesByTypes,
  fetchAllProcessesStatus,
  fetchAllProcessesTypes,
  fetchAllUsers,
} from "../../services/queries";
import { Loading } from "../Loading/Loading";
import { AddButton } from "../AddButton/AddButton";

export type ProcessDetailsProps = {
  onSave: (values: ProcessRequest) => void;
  id?: number;
};

export const ProcessDetails: React.FC<ProcessDetailsProps> = ({
  onSave,
  id,
}) => {
  const { processId } = useParams();

  const { data: processes, isLoading: isProcessesLoading } = useQuery<
    Process[]
  >({
    queryKey: ["processes"],
    queryFn: async () => fetchAllProcessesByTypes(parseInt(processId ?? "")),
    enabled: !!id,
  });

  const { data: processStatus, isLoading: isStatusLoading } = useQuery<
    ProcessStatus[]
  >({
    queryKey: ["processesStatus"],
    queryFn: async () => fetchAllProcessesStatus(),
  });

  const { data: persons, isLoading: isPersonsLoading } = useQuery<Person[]>({
    queryKey: ["persons"],
    queryFn: async () => await fetchAllPersons(),
  });

  const { data: processesTypes, isLoading: isProcessesTypesLoading } = useQuery<
    ProcessType[]
  >({
    queryKey: ["processes-types"],
    queryFn: async () => fetchAllProcessesTypes(),
  });

  const { data: users, isLoading: isLoadingUsers } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => await fetchAllUsers(),
  });

  const selectedProcess = processes?.find((process) => process.id === id);

  const emptyProcess: ProcessRequest = {
    name: selectedProcess?.name ?? "",
    creator_user: selectedProcess?.creator_user.id ?? 1,
    owner_user: selectedProcess?.owner_user.id ?? 1,
    value: selectedProcess?.value ? parseFloat(selectedProcess?.value) : 0,
    first_holder_person: selectedProcess?.first_holder_person.id ?? 1,
    process_type: selectedProcess?.process_type?.id ?? 1,
    process_status: selectedProcess?.process_status.id ?? 1,
    status: selectedProcess?.status ?? "open",
    is_deleted: selectedProcess?.is_deleted ?? false,
  };

  const [formValues, setFormValues] = useState<ProcessRequest>(emptyProcess);

  const handleFormChange = (
    e: React.ChangeEvent<unknown>,
    formValue: keyof ProcessRequest
  ) => {
    const value =
      formValue === "is_deleted"
        ? (e.target as HTMLInputElement).checked
        : formValue === "first_holder_person" ||
          formValue === "creator_user" ||
          formValue === "process_type" ||
          formValue === "process_status"
        ? Number((e.target as HTMLInputElement).value)
        : (e.target as HTMLInputElement).value;

    setFormValues((prev) => ({
      ...prev,
      [formValue]: value,
    }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9,-]+/g, "");
    const numericValue = parseFloat(value.replace(",", "."));

    setFormValues((prev) => ({
      ...prev,
      value: isNaN(numericValue) ? 0 : numericValue,
    }));
  };

  if (
    isProcessesLoading ||
    isPersonsLoading ||
    isProcessesTypesLoading ||
    isStatusLoading ||
    isLoadingUsers
  )
    return <Loading />;

  return (
    <Container style={{ padding: "40px 35px" }}>
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between">
        <span className="fw-semibold">Detalhes do processo</span>

        <AddButton
          disabled={!formValues.name}
          onClick={() => onSave?.(formValues)}
          label="Submeter processo"
        />
      </div>

      <Row style={{ marginBottom: "16px" }}>
        <Col md={6}>
          <FormGroup>
            <Form.Label>Nome do processo</Form.Label>
            <Form.Control
              defaultValue={formValues.name}
              onChange={(e) => handleFormChange(e, "name")}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row style={{ marginBottom: "16px" }}>
        <Col md={12}>
          <span className="fw-semibold fs-sm">Dados do solicitante</span>
        </Col>
      </Row>

      <Row style={{ marginBottom: "16px" }}>
        <Col md={3}>
          <FormGroup>
            <Form.Label>Solicitante (Criador)</Form.Label>
            <Form.Control
              as="select"
              defaultValue={formValues.creator_user}
              onChange={(e) => handleFormChange(e, "creator_user")}
            >
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Form.Control>
          </FormGroup>
        </Col>
      </Row>

      <Row style={{ marginBottom: "16px" }}>
        <Col md={12} className="mt-4 mb-2">
          <span className="fw-semibold">Dados do titular principal</span>
        </Col>
      </Row>

      <Row style={{ marginBottom: "16px" }}>
        <Col md={4}>
          <FormGroup>
            <Form.Label>Titular principal</Form.Label>
            <Form.Control
              as="select"
              defaultValue={formValues.first_holder_person}
              onChange={(e) => handleFormChange(e, "first_holder_person")}
            >
              {persons?.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.full_name}
                </option>
              ))}
            </Form.Control>
          </FormGroup>
        </Col>
      </Row>

      <Row style={{ marginBottom: "16px" }}>
        <Col md={12} className="mt-4 mb-2">
          <span className="fw-semibold">Dados do processo</span>
        </Col>
      </Row>

      <Row style={{ marginBottom: "16px" }}>
        <Col md={4}>
          <FormGroup>
            <Form.Label>Valor solicitado</Form.Label>
            <Form.Control
              type="text"
              value={formatCurrency(formValues.value)}
              onChange={handleValueChange}
            />
          </FormGroup>
        </Col>

        <Col md={4}>
          <FormGroup>
            <Form.Label>Tipo de processo</Form.Label>
            <Form.Control
              as="select"
              defaultValue={formValues.process_type}
              onChange={(e) => handleFormChange(e, "process_type")}
            >
              {processesTypes?.map((processType) => (
                <option key={processType.id} value={processType.id}>
                  {processType.name}
                </option>
              ))}
            </Form.Control>
          </FormGroup>
        </Col>

        <Col md={4}>
          <FormGroup>
            <Form.Label>Status do processo</Form.Label>
            <Form.Control
              as="select"
              defaultValue={formValues.process_status}
              onChange={(e) => handleFormChange(e, "process_status")}
            >
              {processStatus?.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </Form.Control>
          </FormGroup>
        </Col>
      </Row>

      <Row style={{ marginBottom: "16px" }}>
        <Col md={4}>
          <FormGroup>
            <Form.Label>Estado</Form.Label>
            <Form.Control
              defaultValue={formValues.status}
              onChange={(e) => handleFormChange(e, "status")}
              placeholder="Status"
            />
          </FormGroup>
        </Col>

        <Col md={12}>
          <FormGroup className="mt-3">
            <Form.Check
              type="checkbox"
              label="Excluir"
              checked={formValues.is_deleted}
              onChange={(e) => handleFormChange(e, "is_deleted")}
            />
          </FormGroup>
        </Col>
      </Row>
    </Container>
  );
};
