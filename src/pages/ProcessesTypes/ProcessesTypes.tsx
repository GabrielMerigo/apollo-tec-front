import { useQuery } from "@tanstack/react-query";
import { ProcessType } from "../Processes/types";
import { fetchAllProcessesTypes } from "../../services/queries";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { Container } from "react-bootstrap";
import useWindowSize from "../../hooks/useWindowSize";
import { TableCard } from "../../components/TableCard/TableCard";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading/Loading";
import { Header } from "../../components/Header/Header";
import { CustomTable } from "../../components/Table/Table";
import { useForm } from "react-hook-form";

export const ProcessesTypes = () => {
  const { isMobile } = useWindowSize();

  const [processesTypes, setProcessesTypes] = useState<
    ProcessType[] | undefined
  >([]);
  const { data, isLoading } = useQuery<ProcessType[]>({
    queryKey: ["processes-types"],
    queryFn: async () => fetchAllProcessesTypes(),
  });

  const { control } = useForm();

  useEffect(() => {
    setProcessesTypes(data);
  }, [data]);

  const noop = () => null;

  const handleSearch = (value: string) => {
    const searchText = value.toLowerCase();

    setProcessesTypes(() =>
      data?.filter((bank) => {
        return Object.values(bank).some((value) =>
          String(value).toLowerCase().includes(searchText)
        );
      })
    );
  };

  if (isLoading) return <Loading />;

  return (
    <Container className="p-3">
      <Header
        control={control}
        name="search"
        title="Tipo de processo"
        buttonLabel="Novo tipo de processo"
        onFilter={noop}
        onAdd={noop}
        onSearchInput={handleSearch}
      />

      {isMobile ? (
        <div className="d-flex gap-2 flex-column">
          {processesTypes?.map((processType) => (
            <TableCard
              key={processType.id}
              cardTableId={processType.id}
              items={[
                { title: "Tipo", subtitle: processType.name },
                {
                  title: "Descrição",
                  subtitle: new Date(processType.updatedAt).toLocaleDateString(
                    "pt-br"
                  ),
                },
                { title: "Categoria", subtitle: processType.name },
                {
                  title: "Data de criação",
                  subtitle: new Date(
                    processType.createdAt
                  ).toLocaleDateString(),
                },
                { title: "Estado", subtitle: "-" },
              ]}
            />
          ))}
        </div>
      ) : (
        <CustomTable
          headers={[
            { content: "Tipo de processo", id: "1" },
            { content: "Descrição", id: "2" },
            { content: "Categoria", id: "3" },
            { content: "Data de criação", id: "4" },
            { content: "Estado", id: "5" },
            { content: " ", id: "6" },
          ]}
          rows={
            processesTypes?.map((processType) => [
              {
                id: `${processType.id}-name`,
                content: <span className="fw-bold">{processType.name}</span>,
              },
              {
                id: `${processType.id}-description`,
                content: processType.name,
              },
              { id: `${processType.id}-category`, content: processType.name },
              {
                id: `${processType.id}-created-at`,
                content: new Date(processType.createdAt).toLocaleDateString(
                  "pt-br"
                ),
              },
              { id: `${processType.id}-status`, content: "-" },
              {
                id: `${processType.id}-actions`,
                content: (
                  <div className="d-flex justify-content-between">
                    <LuTrash2 style={{ cursor: "pointer" }} color="#8C8E90" />
                    <LuPencil style={{ cursor: "pointer" }} color="#8C8E90" />
                  </div>
                ),
              },
            ]) ?? []
          }
        />
      )}
    </Container>
  );
};
