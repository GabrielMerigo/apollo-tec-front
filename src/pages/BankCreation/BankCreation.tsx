import { useMutation } from "@tanstack/react-query";
import { postBank } from "../../services/mutations";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BankDetails,
  FormValues,
} from "../../components/BankDetails/BankDetails";
import { Loading } from "../../components/Loading/Loading";

export const BankCreation: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: createBank, isPending } = useMutation<
    unknown,
    Error,
    FormValues
  >({
    mutationKey: ["create-bank"],
    mutationFn: async (formValue) => {
      await postBank({
        name: formValue.name,
        notes: formValue.notes,
        phone: formValue.phone,
        website: formValue.website,
      });
    },
    onError: (error) => console.log(error, "erro"),
    onSuccess: () => navigate("/bancos"),
  });

  if (isPending) return <Loading />;

  const handleSave = (formValues: FormValues) => {
    createBank(formValues);
  };

  return <BankDetails onSave={handleSave} />;
};
