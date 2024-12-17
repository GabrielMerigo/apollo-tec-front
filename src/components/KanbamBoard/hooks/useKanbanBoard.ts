import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { LEADS_MOCK } from "../../../pages/Leads/constants/LEADS_MOCK";
import { mapLeadsToColumns } from "./mapLeadsToColumns";
import { ColumnType } from "../types";
import { CardProps } from "../components/Card";

export const useKanbanBoard = () => {
  const [columns, setColumns] = useState<ColumnType[]>(
    mapLeadsToColumns(LEADS_MOCK)
  );
  const [activeCard, setActiveCard] = useState<CardProps | null>(null);
  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over) {
      setActiveCard(null);
      setActiveColumn(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    const activeColumnIndex = columns.findIndex(
      (column) => column.id === activeId
    );
    const overColumnIndex = columns.findIndex((column) => column.id === overId);

    if (activeColumnIndex !== -1 && overColumnIndex !== -1) {
      setColumns((prevColumns) =>
        arrayMove(prevColumns, activeColumnIndex, overColumnIndex)
      );
      setActiveColumn(null);
      return;
    }

    const sourceColumn = columns.find((column) =>
      column.cards.some((card) => card.id === activeId)
    );
    const targetColumn = columns.find((column) => column.id === overId);

    if (!sourceColumn || !targetColumn || sourceColumn === targetColumn) {
      setActiveCard(null);
      return;
    }

    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];

      const sourceIndex = updatedColumns.findIndex(
        (col) => col.id === sourceColumn.id
      );
      const targetIndex = updatedColumns.findIndex(
        (col) => col.id === targetColumn.id
      );

      const cardToMove = updatedColumns[sourceIndex].cards.find(
        (card) => card.id === activeId
      );
      if (!cardToMove) return prevColumns;

      updatedColumns[sourceIndex].cards = updatedColumns[
        sourceIndex
      ].cards.filter((card) => card.id !== activeId);

      cardToMove.status = targetColumn.status;

      updatedColumns[targetIndex].cards = [
        ...updatedColumns[targetIndex].cards,
        cardToMove,
      ];

      return updatedColumns;
    });

    setActiveCard(null);
  };

  const onDragStart = (event: DragStartEvent) => {
    const activeId = event.active.id;

    const column = columns.find((column) => column.id === activeId);
    if (column) {
      setActiveColumn(column);
      return;
    }

    const sourceColumn = columns.find((column) =>
      column.cards.some((card) => card.id === activeId)
    );

    const card = sourceColumn?.cards.find((card) => card.id === activeId);
    if (card) {
      setActiveCard(card);
    }
  };

  return {
    columns,
    activeCard,
    activeColumn,
    onDragStart,
    handleDragEnd,
  };
};
