import { useMutation } from "@tanstack/react-query";
import { updateProcess } from "../../services/mutations";
import { ProcessRequest } from "../Processes/types";
import { useNavigate, useParams } from "react-router-dom";
import { ProcessDetails } from "../../components/ProcessDetails/ProcessDetails";

export const ProcessEdition = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate: editProcess } = useMutation<unknown, Error, ProcessRequest>({
    mutationFn: (formValues) => updateProcess(id!, formValues),
    onSuccess: () => {
      navigate(-1);
    },
    onError: (error) => {
      console.error("Erro ao atualizar o processo:", error);
    },
  });

  return (
    <ProcessDetails
      onSave={(formValues) => editProcess(formValues)}
      id={parseInt(id!)}
    />
  );
};
