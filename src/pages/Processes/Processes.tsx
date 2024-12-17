import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchAllProcessesByTypes,
  fetchAllProcessesStatus,
  fetchAllProcessesTypeById,
} from "../../services/queries";
import { Process, ProcessStatus, ProcessType } from "./types";
import { Container, Form, Tab, Tabs } from "react-bootstrap";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import { TableCard } from "../../components/TableCard/TableCard";
import { useEffect, useState } from "react";
import { updateProcess } from "../../services/mutations";
import { CustomTable } from "../../components/Table/Table";
import { Badge } from "../../components/Badge/Badge";
import { Loading } from "../../components/Loading/Loading";
import { ActionBar } from "../../components/ActionBar/ActionBar";
import { ConfirmationModal } from "../../components/Modal/ConfirmationModal";
import { useForm } from "react-hook-form";

export const Processes = () => {
  const { processId } = useParams();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [newStatus, setNewStatus] = useState({ id: 0, name: "" });
  const [openEditStatusModal, setOpenEditStatusModal] = useState(false);

  const [selectedProcessId, setSelectedProcessId] = useState<
    string | number | undefined
  >(undefined);
  const { isMobile } = useWindowSize();
  const navigate = useNavigate();

  const {
    data: processes,
    refetch,
    isLoading,
    isRefetching,
  } = useQuery<Process[]>({
    queryKey: ["processes"],
    queryFn: async () => fetchAllProcessesByTypes(parseInt(processId ?? "")),
    enabled: !!processId,
  });

  const { data: processType } = useQuery<ProcessType>({
    queryKey: ["processesType"],
    queryFn: async () => fetchAllProcessesTypeById(parseInt(processId ?? "")),
    enabled: !!processId,
  });

  useEffect(() => {
    if (processId) {
      refetch();
    }
  }, [processId, refetch]);

  const { data: processStatus } = useQuery<ProcessStatus[]>({
    queryKey: ["processesStatus"],
    queryFn: async () => fetchAllProcessesStatus(),
  });

  const noop = () => null;

  const { control } = useForm();

  const { mutate: deleteProcess, isPending } = useMutation({
    mutationKey: ["updateProcess"],
    mutationFn: async () =>
      updateProcess(selectedProcessId!, { is_deleted: true }),
    onSuccess: () => {
      setOpenDeleteModal(false);
      refetch();
    },
  });

  const { mutate: updateStatus, isPending: isUpdateStatusPending } =
    useMutation({
      mutationKey: ["updateProcess"],
      mutationFn: async () =>
        updateProcess(selectedProcessId!, {
          process_status: newStatus.id,
        }),
      onSuccess: () => {
        setOpenEditStatusModal(false);
        refetch();
      },
    });

  const TableContent = ({ processList }: { processList: Process[] }) => {
    return (
      <CustomTable
        headers={[
          { content: "Nome", id: "1" },
          { content: "Tipo", id: "2" },
          { content: "Origem", id: "3" },
          { content: "Portfolio", id: "4" },
          { content: "Telemóvel", id: "5" },
          { content: "Montante", id: "6" },
          { content: "Estado", id: "7" },
          { content: "Próxima Tarefa", id: "8" },
          { content: " ", id: "9" },
        ]}
        rows={
          processList?.map((process) => [
            {
              id: `${process.id}-name`,
              content: (
                <span className="fw-bold">
                  {process.first_holder_person.full_name}
                </span>
              ),
            },
            { id: `${process.id}-type`, content: process.name },
            {
              id: `${process.id}-origin`,
              content: process.creator_user.name,
            },
            {
              id: `${process.id}-portfolio`,
              content: process.owner_user.name,
            },
            {
              id: `${process.id}-cellphone`,
              content: (
                <span style={{ color: "#F6C143" }}>{"000 000 000"}</span>
              ),
            },
            {
              id: `${process.id}-amount`,
              content: parseFloat(process.value).toLocaleString("pt-PT", {
                style: "currency",
                currency: "EUR",
              }),
            },
            {
              id: `${process.id}-status`,
              content: Badge({
                label: process.process_status.name,
                color: "#ECECEE",
                onClick: () => {
                  setSelectedProcessId(process.id);
                  setOpenEditStatusModal(true);
                },
              }),
            },
            { id: `${process.id}-nextJob`, content: "-" },

            {
              id: `${process.id}-actions`,
              content: (
                <div className="d-flex justify-content-between">
                  <LuTrash2
                    style={{ cursor: "pointer" }}
                    color="#8C8E90"
                    onClick={() => {
                      setOpenDeleteModal(true);
                      setSelectedProcessId(process?.id);
                    }}
                  />
                  <LuPencil
                    onClick={() => navigate(`editar/${process.id}`)}
                    style={{ cursor: "pointer" }}
                    color="#8C8E90"
                  />
                </div>
              ),
            },
          ]) ?? []
        }
      />
    );
  };

  if (isLoading || isRefetching) return <Loading />;

  return (
    <>
      <Container className="p-4">
        <h3 className="fw-semibold mb-4">{processType?.name}</h3>
        <Tabs
          defaultActiveKey={processStatus?.[0].id}
          id="justify-tab-example"
          className="mb-3"
          variant="underline"
          fill
        >
          {processStatus?.map((status) => {
            const processList =
              processes?.filter(
                (item) => item.process_status.id === status.id
              ) ?? [];

            const totalAmount = (
              processList?.reduce((accumulator, currentItem) => {
                return accumulator + parseFloat(currentItem.value);
              }, 0) ?? 0
            ).toLocaleString("pt-PT", {
              style: "currency",
              currency: "EUR",
            });

            return (
              <Tab
                key={status.id}
                eventKey={status.id}
                title={`${status.name} (${totalAmount})`}
                className="custom-tabs"
              >
                <ActionBar
                  name="search"
                  control={control}
                  buttonLabel="Iniciar processo"
                  onFilter={noop}
                  onImport={noop}
                  onAdd={() => navigate("iniciar")}
                  onSearchInput={noop}
                />

                {isMobile && processId ? (
                  <div className="d-flex gap-2 flex-column">
                    {processList
                      .filter(
                        (p) =>
                          p.process_type.id === parseInt(processId) &&
                          p.is_deleted === false
                      )
                      .map((process) => (
                        <TableCard
                          cardTableId={process.id}
                          key={process.id}
                          items={[
                            {
                              title: "Nome",
                              subtitle: process.first_holder_person.full_name,
                            },
                            { title: "Tipo", subtitle: process.name },
                            {
                              title: "Origem",
                              subtitle: process.creator_user.name,
                            },
                            {
                              title: "Portfólio",
                              subtitle: process.owner_user.name,
                            },
                            {
                              title: "Telemóvel",
                              subtitle: (
                                <span style={{ color: "#F6C143" }}>
                                  {"000 000 000"}
                                </span>
                              ),
                            },
                            {
                              title: "Montante",
                              subtitle: parseFloat(
                                process.value
                              ).toLocaleString("pt-PT", {
                                style: "currency",
                                currency: "EUR",
                              }),
                            },
                            {
                              title: "Estado",
                              subtitle: Badge({
                                label: process.process_status.name,
                                color: "#ECECEE",
                                onClick: () => {
                                  setSelectedProcessId(process.id);
                                  setOpenEditStatusModal(true);
                                },
                              }),
                            },
                            { title: "Próxima Tarefa", subtitle: "-" },
                          ]}
                          onEditClick={() => navigate(`editar/${process.id}`)}
                          onTrashClick={() => {
                            setSelectedProcessId(process.id);
                            setOpenDeleteModal(true);
                          }}
                        />
                      ))}
                  </div>
                ) : (
                  processId && (
                    <TableContent
                      processList={processList.filter(
                        (process) =>
                          process.process_type.id === parseInt(processId) &&
                          process.is_deleted === false
                      )}
                    />
                  )
                )}
              </Tab>
            );
          })}
        </Tabs>
      </Container>

      <ConfirmationModal
        modalTitle="Tem certeza de que deseja excluir este processo?"
        modalDescription="Essa ação é irreversível. O processo excluído não poderá ser recuperado."
        show={openDeleteModal}
        onHide={() => setOpenDeleteModal(false)}
        variant="error"
        onConfirm={() => deleteProcess()}
        isLoading={isPending}
      />

      <ConfirmationModal
        modalTitle="Alterar o status do processo"
        modalDescription={
          <>
            <Form.Label>Selecione o novo status:</Form.Label>
            <Form.Control
              as="select"
              defaultValue={
                processStatus?.find((status) => status.id === newStatus.id)?.id
              }
              onChange={(e) => {
                const [id, name] = e.target.value.split(",");
                setNewStatus({ id: parseInt(id), name });
              }}
            >
              {processStatus?.map((status) => (
                <option
                  key={status.id}
                  value={[status.id.toString(), status.name]}
                >
                  {status.name}
                </option>
              ))}
            </Form.Control>
          </>
        }
        show={openEditStatusModal}
        onHide={() => setOpenEditStatusModal(false)}
        variant="error"
        onConfirm={updateStatus}
        isLoading={isUpdateStatusPending}
      />
    </>
  );
};
