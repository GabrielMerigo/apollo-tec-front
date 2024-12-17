import { useForm } from "react-hook-form";
import { useDebounce } from "../../../hooks/useDebounce";

interface FormValues {
  search: string;
}

export const useLeads = () => {
  const { control, watch } = useForm<FormValues>({
    defaultValues: {
      search: "",
    },
  });

  const searchWatch = watch("search");

  useDebounce({
    handleDebounce: () =>
      console.log({
        searchWatch,
      }),
    delay: 3000,
    dependencyArray: [searchWatch],
  });

  return {
    control,
  };
};
