import { useDroppable } from "@dnd-kit/core";
import type { HTMLAttributes, ReactNode } from "react";

interface DroppableProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  children: ReactNode;
}

export const Droppable = ({ id, children, ...rest }: DroppableProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    color: isOver ? "black" : undefined,
  };

  return (
    <div {...rest} ref={setNodeRef} style={{ ...style, ...rest.style }}>
      {children}
    </div>
  );
};
