import { LuTrash2, LuPencil } from "react-icons/lu";
import { Avatar } from "../../../components/Avatar/Avatar";
import { TableStatus } from "../../../components/TableStatus";
import { LeadsProps } from "./LEADS_MOCK";

interface LeadsRowsProps {
  leads: LeadsProps[];
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: (path: string) => void;
}

export const LeadsRows = ({
  leads,
  setOpenDeleteModal,
  navigate,
}: LeadsRowsProps) =>
  leads.map((lead) => [
    {
      id: `${lead.id}-name`,
      content: lead.leadName,
    },
    {
      id: `${lead.id}-status`,
      content: <TableStatus statusType={lead.status} />,
    },
    { id: `${lead.id}-email`, content: lead.leadEmail },
    {
      id: `${lead.id}-responsible`,
      content: (
        <div className="d-flex gap-2">
          <Avatar image={lead.responsibleImage} />
          {lead.leadResponsible || "Sem responsável"}
        </div>
      ),
    },
    {
      id: `${lead.id}-actions`,
      content: (
        <div className="d-flex gap-4">
          <LuTrash2
            style={{ cursor: "pointer" }}
            color="#8C8E90"
            onClick={() => {
              setOpenDeleteModal(true);
            }}
          />
          <LuPencil
            style={{ cursor: "pointer" }}
            color="#8C8E90"
            onClick={() => navigate(`editar/${lead.id}`)}
          />
        </div>
      ),
    },
  ]);
