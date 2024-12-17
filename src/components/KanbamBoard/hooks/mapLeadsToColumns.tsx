import { StatusTypeEnum } from "../../../constants/STATUS_MOCK";
import {
  LEADS_MOCK,
  LeadsProps,
} from "../../../pages/Leads/constants/LEADS_MOCK";
import { ColumnType } from "../types";

export const mapLeadsToColumns = (leads: LeadsProps[]): ColumnType[] => {
  return [
    {
      id: "column-1",
      status: "Pendente",
      statusColor: "#ECECEE",
      boldColor: "#2A2A2A",
      cards: leads
        .filter((lead) => lead.status === StatusTypeEnum.PENDING)
        .map((lead) => ({
          id: lead.id,
          leadName: lead.leadName,
          leadEmail: lead.leadEmail,
          leadResponsible: lead.leadResponsible,
          responsibleImage: lead.responsibleImage,
          status: "Pendente",
        })),
    },
    {
      id: "column-2",
      status: "Qualificado",
      statusColor: "#EAFDEE",
      boldColor: "#147129",
      cards: leads
        .filter((lead) => lead.status === StatusTypeEnum.QUALIFIED)
        .map((lead) => ({
          id: lead.id,
          leadName: lead.leadName,
          leadEmail: lead.leadEmail,
          leadResponsible: lead.leadResponsible,
          responsibleImage: lead.responsibleImage,
          status: "Qualificado",
        })),
    },
    {
      id: "column-3",
      status: "Rejeitado",
      statusColor: "#FFE0E0",
      boldColor: "#CD0000",
      cards: leads
        .filter((lead) => lead.status === StatusTypeEnum.REJECTED)
        .map((lead) => ({
          id: lead.id,
          leadName: lead.leadName,
          leadEmail: lead.leadEmail,
          leadResponsible: lead.leadResponsible,
          responsibleImage: lead.responsibleImage,
          status: "Rejeitado",
        })),
    },
  ];
};

export const INITIAL_COLUMNS = mapLeadsToColumns(LEADS_MOCK);
