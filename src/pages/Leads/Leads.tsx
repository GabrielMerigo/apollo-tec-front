import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { useLeads } from "./hooks/useLeads";
import { CustomTable } from "../../components/Table/Table";
import { headers, LEADS_MOCK } from "./constants/LEADS_MOCK";
import { useState } from "react";
import { ConfirmationModal } from "../../components/Modal/ConfirmationModal";
import { LeadsRows } from "./constants/ROWS";
import { KanbanBoard } from "../../components/KanbamBoard";

// eslint-disable-next-line react-refresh/only-export-components
export enum ViewMode {
  TABLE = "TABLE",
  KANBAN = "KANBAN",
}

export const Leads = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [toogleView, setToogleView] = useState<ViewMode>(ViewMode.TABLE);

  const navigate = useNavigate();

  const { control } = useLeads();

  return (
    <>
      <div className="container">
        <div className="py-4">
          <Header
            control={control}
            name="search"
            onImport={() => null}
            title="Leads"
            buttonLabel="Adicionar Lead"
            onAdd={() => navigate("/createLeads")}
            onFilter={() => null}
            onToggle={() =>
              setToogleView((state) =>
                state === ViewMode.TABLE ? ViewMode.KANBAN : ViewMode.TABLE
              )
            }
            onSearchInput={() => null}
          />

          {toogleView === ViewMode.TABLE ? (
            <CustomTable
              headers={headers}
              rows={LeadsRows({
                leads: LEADS_MOCK,
                setOpenDeleteModal,
                navigate,
              })}
            />
          ) : (
            <KanbanBoard />
          )}
        </div>
      </div>

      <ConfirmationModal
        modalTitle="Tem certeza de que deseja excluir este lead?"
        modalDescription="Essa ação é irreversível. O lead excluído não poderá ser recuperado."
        show={openDeleteModal}
        onHide={() => setOpenDeleteModal(false)}
        variant="error"
        onConfirm={() => console.log("lead excluído com sucesso!")}
      />
    </>
  );
};
