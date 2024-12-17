import { useMutation } from "@tanstack/react-query";
import { postBankCounter } from "../../services/mutations";
import { IBankCounter } from "../Balcões/types";
import { BankCounterDetails } from "../../components/BankCounterDetails/BankCounterDetails";

export const BankCounterCreation = () => {
  const {
    mutate: createBankCounter,
    isError,
    error,
    isSuccess,
    isPending,
  } = useMutation<
    unknown,
    Error,
    Omit<IBankCounter, "id" | "createdAt" | "updatedAt" | "email">
  >({
    mutationFn: postBankCounter,
    onSuccess: () => {
      console.log("Banco criado com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao criar banco:", error.message);
    },
  });

  return (
    <>
      {isPending && <p>Carregando...</p>}
      {isError && <p>Erro: {error.message}</p>}
      {isSuccess && <p>Banco criado com sucesso!</p>}

      <BankCounterDetails
        onSave={(formValues) => {
          createBankCounter(formValues);
        }}
      />
    </>
  );
};
