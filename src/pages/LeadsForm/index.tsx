import { useForm, Controller } from "react-hook-form";
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { AddButton } from "../../components/AddButton/AddButton";
import InputMask from "react-input-mask";

export const LeadsForm = () => {
  const { control, handleSubmit } = useForm();

  const estadoCivilOptions = ["Solteiro", "Casado", "Divorciado"];
  const distritosPortugal = [
    "Aveiro",
    "Beja",
    "Braga",
    "Bragança",
    "Castelo Branco",
    "Coimbra",
    "Évora",
    "Faro",
    "Guarda",
    "Leiria",
    "Lisboa",
    "Portalegre",
    "Porto",
    "Santarém",
    "Setúbal",
    "Viana do Castelo",
    "Vila Real",
    "Viseu",
  ];

  const onSubmit = (data) => {
    console.log("Dados do formulário:", data);
  };

  return (
    <Container className="p-4">
      <h3 className="fw-semibold mb-4">{`Criar leads`}</h3>

      <Container
        className="bank-details-form"
        style={{ padding: "40px 35px", gap: "8px" }}
      >
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between">
          <span className="fw-semibold">Descrição</span>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={3}>
              <FormGroup>
                <Form.Label>Primeiro Nome</Form.Label>
                <Controller
                  name="primeiroNome"
                  control={control}
                  render={({ field }) => <Form.Control {...field} />}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Form.Label>Último Nome</Form.Label>
                <Controller
                  name="ultimoNome"
                  control={control}
                  render={({ field }) => <Form.Control {...field} />}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Form.Label>Nome Completo</Form.Label>
                <Controller
                  name="nomeCompleto"
                  control={control}
                  render={({ field }) => <Form.Control {...field} />}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <FormGroup>
                <Form.Label>Email</Form.Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Form.Control type="email" {...field} />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Form.Label>Telemóvel</Form.Label>
                <Controller
                  name="telemovel"
                  control={control}
                  render={({ field }) => (
                    <InputMask
                      {...field}
                      mask="+351 999 999 999"
                      placeholder="+351 123 456 789"
                      className="form-control"
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Form.Label>Documento de Identificação</Form.Label>
                <Controller
                  name="documentoIdentificacao"
                  control={control}
                  render={({ field }) => <Form.Control {...field} />}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={3} className="mt-4 mb-2">
              <span className="fw-semibold">Situação Financeira e Civil</span>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <FormGroup>
                <Form.Label>Incumprimento</Form.Label>
                <Controller
                  name="incumprimento"
                  control={control}
                  render={({ field }) => <Form.Control {...field} />}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Form.Label>Rendimento Líquido Mensal</Form.Label>
                <Controller
                  name="rendimentoMensal"
                  control={control}
                  render={({ field }) => (
                    <InputMask
                      {...field}
                      mask="€ 99999"
                      placeholder="€ 1234"
                      className="form-control"
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Form.Label>Estado Civil</Form.Label>
                <Controller
                  name="estadoCivil"
                  control={control}
                  render={({ field }) => (
                    <Form.Control as="select" {...field}>
                      <option value="">Selecione</option>
                      {estadoCivilOptions.map((estado, index) => (
                        <option key={index} value={estado}>
                          {estado}
                        </option>
                      ))}
                    </Form.Control>
                  )}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={3} className="mt-4 mb-2">
              <span className="fw-semibold">Residência e Trabalho</span>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <FormGroup>
                <Form.Label>Atualmente Reside em</Form.Label>
                <Controller
                  name="residenciaAtual"
                  control={control}
                  render={({ field }) => <Form.Control {...field} />}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Form.Label>Vínculo Laboral</Form.Label>
                <Controller
                  name="vinculoLaboral"
                  control={control}
                  render={({ field }) => <Form.Control {...field} />}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Form.Label>Trabalha na Empresa Há</Form.Label>
                <Controller
                  name="tempoEmpresa"
                  control={control}
                  render={({ field }) => (
                    <Form.Control type="date" {...field} />
                  )}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={3} className="mt-4 mb-2">
              <span className="fw-semibold">Dados adicionais</span>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <FormGroup>
                <Form.Label>Número de Contribuinte</Form.Label>
                <Controller
                  name="numeroContribuinte"
                  control={control}
                  render={({ field }) => (
                    <Form.Control type="number" {...field} />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Form.Label>Distrito</Form.Label>
                <Controller
                  name="distrito"
                  control={control}
                  render={({ field }) => (
                    <Form.Control as="select" {...field}>
                      <option value="">Selecione</option>
                      {distritosPortugal.map((distrito, index) => (
                        <option key={index} value={distrito}>
                          {distrito}
                        </option>
                      ))}
                    </Form.Control>
                  )}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <FormGroup>
                <Form.Label>Data de Nascimento</Form.Label>
                <Controller
                  name="dataNascimento"
                  control={control}
                  render={({ field }) => (
                    <Form.Control type="date" {...field} />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Form.Label>Idade</Form.Label>
                <Controller
                  name="idade"
                  control={control}
                  render={({ field }) => (
                    <Form.Control type="number" {...field} />
                  )}
                />
              </FormGroup>
            </Col>
          </Row>

          <div className="mt-5">
            <AddButton
              type="submit"
              onClick={() => {}}
              label={"Adicionar Lead"}
            />
          </div>
        </Form>
      </Container>
    </Container>
  );
};
