import { useQuery } from "@tanstack/react-query";
import { fetchAllBankCounters } from "../../services/queries";
import { IBankCounter } from "./types";
import { Badge } from "react-bootstrap";
import "./styles.css";
import clsx from "clsx";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import useWindowSize from "../../hooks/useWindowSize";
import { TableCard } from "../../components/TableCard/TableCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Loading } from "../../components/Loading/Loading";
import { CustomTable } from "../../components/Table/Table";
import { useForm } from "react-hook-form";

export const StatusBadge = (status: 0 | 1) => {
  return (
    <Badge
      text={clsx({ success: status === 1, dark: status === 0 })}
      bg=""
      pill
      style={{
        backgroundColor: clsx({
          "#EAFDEE": status === 1,
          "#ECECEE": status === 0,
        }),
      }}
    >
      {status === 1 ? "Ativo" : "Inativo"}
    </Badge>
  );
};

export const BankCounter = () => {
  const [bankCounters, setBankCounters] = useState<IBankCounter[] | undefined>(
    []
  );
  const { data, isLoading } = useQuery<IBankCounter[]>({
    queryKey: ["bank-counters"],
    queryFn: async () => await fetchAllBankCounters(),
  });

  const { control } = useForm();

  const navigate = useNavigate();

  const { isMobile } = useWindowSize();

  useEffect(() => {
    setBankCounters(data);
  }, [data]);

  const handleSearch = (value: string) => {
    const searchText = value.toLowerCase();

    setBankCounters(() =>
      data?.filter((bankCounter) => {
        return Object.values(bankCounter).some((value) =>
          String(value).toLowerCase().includes(searchText)
        );
      })
    );
  };

  if (isLoading) return <Loading />;

  const noop = () => null;

  return (
    <div className="p-4">
      <Header
        control={control}
        name="search"
        onImport={noop}
        buttonLabel="Adicionar balcão"
        title="Balcões"
        onFilter={noop}
        onAdd={() => navigate("adicionar/")}
        onSearchInput={handleSearch}
      />

      <div className="">
        {isMobile ? (
          <div className="d-flex gap-2 flex-column">
            {bankCounters?.map((bankCounter) => (
              <TableCard
                cardTableId={bankCounter.id}
                key={bankCounter.id}
                items={[
                  { title: "Nome do balcão", subtitle: bankCounter.name },
                  { title: "Localização", subtitle: bankCounter.notes },
                  { title: "Responsável", subtitle: bankCounter.manager_name },
                  { title: "Contato", subtitle: bankCounter.phone },
                  {
                    title: "Estado",
                    subtitle: StatusBadge(bankCounter.status),
                  },
                ]}
                onEditClick={(cardId) => navigate(`editar/${cardId}`)}
              />
            ))}
          </div>
        ) : (
          <CustomTable
            headers={[
              { id: "1", content: "Nome do balcão" },
              { id: "2", content: "Localização" },
              { id: "3", content: "Responsável" },
              { id: "4", content: "Contato" },
              { id: "5", content: "Estado" },
              { id: "6", content: " " },
            ]}
            rows={
              bankCounters?.map((bankCounter) => [
                {
                  id: `${bankCounter.id}-name`,
                  content: <span className="fw-bold">{bankCounter.name}</span>,
                },
                { id: `${bankCounter.id}-notes`, content: bankCounter.notes },
                {
                  id: `${bankCounter.id}-manager_name`,
                  content: bankCounter.manager_name,
                },
                { id: `${bankCounter.id}-mobile`, content: bankCounter.mobile },
                {
                  id: `${bankCounter.id}-status`,
                  content: StatusBadge(bankCounter.status),
                },
                {
                  id: `${bankCounter.id}-actions`,
                  content: (
                    <div className="d-flex justify-content-between">
                      <LuTrash2 style={{ cursor: "pointer" }} color="#8C8E90" />
                      <LuPencil
                        onClick={() => navigate(`editar/${bankCounter.id}`)}
                        style={{ cursor: "pointer" }}
                        color="#8C8E90"
                      />
                    </div>
                  ),
                },
              ]) ?? []
            }
          />
        )}
      </div>
    </div>
  );
};
