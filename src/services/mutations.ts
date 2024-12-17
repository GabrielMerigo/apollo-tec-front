import { IBankCounter } from "../pages/Balcões/types";
import { Bank } from "../pages/Bancos/types";
import { ProcessRequest } from "../pages/Processes/types";
import { URL } from "../utils/fetch-data/fetch-data";
import { postData } from "../utils/post-data/post-data";
import { putData } from "../utils/put-data/putData";

export const postBank = async (bank: Omit<Bank, "id">) => {
  return postData({ url: `${URL}/banks`, body: bank });
};

export const postBankCounter = async (
  bankCounter: Omit<IBankCounter, "id" | "createdAt" | "updatedAt" | "email">
) => {
  return postData({ url: `${URL}/bank/counter`, body: bankCounter });
};

export const postProcess = async (process: ProcessRequest) => {
  return postData({ url: `${URL}/process`, body: process });
};

export const updateProcess = async (
  processId: string | number,
  updatedData?: Partial<ProcessRequest>
) => {
  return putData({ url: `${URL}/process/${processId}`, body: updatedData });
};
