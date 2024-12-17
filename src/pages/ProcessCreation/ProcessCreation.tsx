import { useMutation } from "@tanstack/react-query";
import { postProcess } from "../../services/mutations";
import { ProcessRequest } from "../Processes/types";
import { useNavigate } from "react-router-dom";
import { ProcessDetails } from "../../components/ProcessDetails/ProcessDetails";

export const ProcessCreation = () => {
  const navigate = useNavigate();
  const { mutate: createProcess } = useMutation<unknown, Error, ProcessRequest>(
    //TODO: Criar toast de notificação de sucesso e falha
    { mutationFn: postProcess, onSuccess: () => navigate(-1) }
  );

  return <ProcessDetails onSave={(formValues) => createProcess(formValues)} />;
};
