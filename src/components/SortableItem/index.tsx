import { useDraggable } from "@dnd-kit/core";
import { Card } from "react-bootstrap";

interface SortableItemProps {
  id: string;
  item: {
    id: string;
    name: string;
    email: string;
    responsavel?: string;
  };
}

const SortableItem = ({ id, item }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style: React.CSSProperties = {
    transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
    transition: transform ? "transform 0.2s ease" : undefined,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-2"
    >
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>{item.email}</Card.Text>
        {item.responsavel && (
          <Card.Text>Responsável: {item.responsavel}</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default SortableItem;
