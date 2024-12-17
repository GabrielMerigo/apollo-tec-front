import { StatusTypeEnum } from "../../../constants/STATUS_MOCK";

export const headers = [
  { id: "name", content: "Nome" },
  { id: "estado", content: "Estado" },
  { id: "email", content: "Email" },
  { id: "responsavel", content: "Responsável" },
  { id: "actions", content: "Ações" },
];

export interface LeadsProps {
  id: string;
  leadName: string;
  leadEmail: string;
  leadResponsible?: string;
  responsibleImage: string;
  status: StatusTypeEnum;
}

export const LEADS_MOCK: LeadsProps[] = [
  {
    id: "lead-1",
    leadName: "Alice Johnson",
    leadEmail: "alice.johnson@mail.com",
    responsibleImage: "",
    status: StatusTypeEnum.PENDING,
  },
  {
    id: "lead-2",
    leadName: "Bob Smith",
    leadEmail: "bob.smith@mail.com",
    responsibleImage: "",
    status: StatusTypeEnum.PENDING,
  },
  {
    id: "lead-3",
    leadName: "Charlie Brown",
    leadEmail: "charlie.brown@mail.com",
    leadResponsible: "Sarah Connor",
    responsibleImage: "https://picsum.photos/200/202",
    status: StatusTypeEnum.QUALIFIED,
  },
  {
    id: "lead-4",
    leadName: "David Wilson",
    leadEmail: "david.wilson@mail.com",
    leadResponsible: "Michael Scott",
    responsibleImage: "https://picsum.photos/200/203",
    status: StatusTypeEnum.QUALIFIED,
  },
  {
    id: "lead-5",
    leadName: "Emma Thomas",
    leadEmail: "emma.thomas@mail.com",
    leadResponsible: "Dwight Schrute",
    responsibleImage: "https://picsum.photos/200/204",
    status: StatusTypeEnum.REJECTED,
  },
  {
    id: "lead-6",
    leadName: "Fiona Davis",
    leadEmail: "fiona.davis@mail.com",
    leadResponsible: "Pam Beesly",
    responsibleImage: "https://picsum.photos/200/205",
    status: StatusTypeEnum.REJECTED,
  },
  {
    id: "lead-7",
    leadName: "Wesley Patrick",
    leadEmail: "wesleys@mail.com",
    leadResponsible: "Pam Beesly",
    responsibleImage: "https://picsum.photos/200/205",
    status: StatusTypeEnum.REJECTED,
  },
];
