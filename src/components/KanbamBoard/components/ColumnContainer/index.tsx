import { ColumnType } from "../../types";
import clsx from "clsx";
import styles from "./style.module.css";
import { Card } from "../Card";
import { Sortable } from "../Sortable";
import { Droppable } from "../Droppable";
import { SortableContext } from "@dnd-kit/sortable";

export interface ColumnContainerProps {
  column: ColumnType;
}

export const ColumnContainer = ({ column }: ColumnContainerProps) => {
  return (
    <Sortable
      sortableData={{
        id: column.id,
        data: { type: "Column", column },
      }}
      draggingProps={{
        styles: {
          border: `2px solid ${column.boldColor}`,
          opacity: 0.5,
          padding: "24px",
        },
        className: clsx(styles.container),
      }}
      className={clsx(styles.container)}
      style={{ backgroundColor: column.statusColor, padding: "14px" }}
    >
      <Droppable
        id={column.id}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          height: "100%",
        }}
      >
        <div className={styles.header}>
          <b
            style={{
              color: column.boldColor,
            }}
          >
            {column.status}
          </b>
        </div>

        <SortableContext items={column.cards.map((card) => card.id)}>
          <div className={clsx(styles.cardContainer)}>
            {column.cards.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </div>
        </SortableContext>
      </Droppable>
    </Sortable>
  );
};
