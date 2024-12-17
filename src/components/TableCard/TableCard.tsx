import React, { ReactNode } from "react";
import { Card, Container } from "react-bootstrap";
import { LuPencil, LuTrash2 } from "react-icons/lu";

type Item = {
  title: string;
  subtitle: ReactNode;
};

type BankCounterCardProps = {
  cardTableId: string | number;
  items: Item[];
  onTrashClick?: (id: string | number) => void;
  onEditClick?: (id: string | number) => void;
};

export const TableCard: React.FC<BankCounterCardProps> = ({
  items,
  onTrashClick,
  onEditClick,
  cardTableId,
}) => {
  return (
    <Card style={{ padding: "24px", borderRadius: "16px" }}>
      <Card.Body>
        {items.map((item, indexItem) => (
          <Container
            key={indexItem}
            className="d-flex align-items-center gap-2"
            style={{ maxWidth: "100%", overflow: "hidden" }}
          >
            <Card.Title className="text-nowrap fs-6">{`${item.title}: `}</Card.Title>
            <Card.Subtitle className="text-nowrap text-truncate w-100 fs-6">
              {item.subtitle}
            </Card.Subtitle>
          </Container>
        ))}
        <div className="d-flex gap-2" style={{ justifyContent: "right" }}>
          <LuTrash2
            onClick={() => onTrashClick?.(cardTableId)}
            style={{ cursor: "pointer" }}
            color="#8C8E90"
            fontSize="20px"
          />
          <LuPencil
            onClick={() => onEditClick?.(cardTableId)}
            style={{ cursor: "pointer" }}
            color="#8C8E90"
            fontSize="20px"
          />
        </div>
      </Card.Body>
    </Card>
  );
};
