import { IBankCounter } from "../pages/Balcões/types";
import { Bank } from "../pages/Bancos/types";
import {
  Person,
  Process,
  ProcessStatus,
  ProcessType,
  User,
} from "../pages/Processes/types";

import { fetchData, URL } from "../utils/fetch-data/fetch-data";

export const fetchAllBanks = async (): Promise<Bank[]> => {
  return fetchData<Bank[]>({
    url: `${URL}/bank`,
  });
};

export const fetchBankById = async (bankid: string): Promise<Bank> => {
  return fetchData<Bank>({
    url: `${URL}/bank/${bankid}`,
  });
};

export const fetchAllBankCounters = async (): Promise<IBankCounter[]> => {
  return fetchData<IBankCounter[]>({
    url: `${URL}/bank/counter`,
  });
};

export const fetchAllProcessesTypes = async (): Promise<ProcessType[]> => {
  return fetchData<ProcessType[]>({
    url: `${URL}/process/types`,
  });
};

export const fetchAllProcessesTypeById = async (
  id: number
): Promise<ProcessType> => {
  return fetchData<ProcessType>({
    url: `${URL}/process/types/${id}`,
  });
};

export const fetchAllProcessesByTypes = async (
  typeId: number
): Promise<Process[]> => {
  const data = await fetchData<Process[]>({
    url: `${URL}/process`,
  });

  return data.filter((item) => item.process_type.id === typeId);
};

export const fetchAllProcessesStatus = async (): Promise<ProcessStatus[]> => {
  return fetchData<ProcessStatus[]>({
    url: `${URL}/process/status`,
  });
};

export const fetchAllPersons = async (): Promise<Person[]> => {
  return fetchData<Person[]>({ url: `${URL}/persons` });
};

export const fetchAllUsers = async (): Promise<User[]> => {
  return fetchData<User[]>({ url: `${URL}/users` });
};