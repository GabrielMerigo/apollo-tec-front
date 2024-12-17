import { useDraggable } from "@dnd-kit/core";
import type { PropsWithChildren } from "react";

interface DraggableProps extends PropsWithChildren {
  id: string;
}
export const Draggable = ({ id, children }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 9999,
      }
    : {
        position: "relative",
        zIndex: 1,
      };
  return (
    <div
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      style={{ ...style, position: "relative", zIndex: 2 }}
    >
      {children}
    </div>
  );
};
