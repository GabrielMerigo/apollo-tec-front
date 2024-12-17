import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { useKanbanBoard } from "./hooks/useKanbanBoard";
import { ColumnContainer } from "./components/ColumnContainer";
import { Card } from "./components/Card";

export const KanbanBoard = () => {
  const { columns, activeCard, activeColumn, onDragStart, handleDragEnd } =
    useKanbanBoard();

  return (
    <div className="d-flex" style={{ width: "100%", gap: "24px" }}>
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <SortableContext items={columns.map((column) => column.id)}>
          <div className="d-flex" style={{ gap: "24px" }}>
            {columns.map((column) => (
              <SortableContext
                key={column.id}
                items={column.cards.map((card) => card.id)}
              >
                <ColumnContainer key={column.id} column={column} />
              </SortableContext>
            ))}
          </div>
        </SortableContext>

        {createPortal(
          <DragOverlay>
            {activeCard && <Card {...activeCard} />}
            {activeColumn && <ColumnContainer column={activeColumn} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};
