import { useQuery } from "@tanstack/react-query";
import { fetchAllBanks } from "../../services/queries";
import { Bank } from "./types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { BankCard } from "../../components/BankCard/BankCard";
import { useForm } from "react-hook-form";

export const Banks = () => {
  const [banks, setBanks] = useState<Bank[] | undefined>([]);
  const { data } = useQuery<Bank[]>({
    queryKey: ["banks"],
    queryFn: async () => await fetchAllBanks(),
  });

  const navigate = useNavigate();
  const { control } = useForm();

  useEffect(() => {
    setBanks(data);
  }, [data]);

  const handleSearch = (value: string) => {
    const searchText = value.toLowerCase();

    setBanks(() =>
      data?.filter((bank) => {
        return Object.values(bank).some((value) =>
          String(value).toLowerCase().includes(searchText)
        );
      })
    );
  };

  const noop = () => null;

  return (
    <div className="p-4">
      <Header
        control={control}
        name="search"
        onImport={noop}
        title="Bancos"
        buttonLabel="Adicionar banco"
        onAdd={() => navigate("adicionar")}
        onFilter={noop}
        onSearchInput={handleSearch}
      />
      <div className="container">
        <div className="row">
          {banks?.map((bank) => (
            <div className="col-12 col-md-4 mb-4" key={bank.id}>
              <BankCard
                logoImage={bank.website}
                id={bank.id}
                name={bank.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
