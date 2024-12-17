import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CSSProperties, HTMLAttributes } from "react";
interface sortableDataProps {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
interface SortableProps extends HTMLAttributes<HTMLDivElement> {
  sortableData: sortableDataProps;
  draggingProps: {
    styles: CSSProperties;
    className: string;
  };
}

export const Sortable = ({
  sortableData,
  draggingProps,
  children,
  ...rest
}: SortableProps) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable(sortableData);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={{ ...style, ...draggingProps.styles }}
        className={draggingProps.className}
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ ...style, ...rest.style }}
      className={rest.className}
    >
      {children}
    </div>
  );
};
