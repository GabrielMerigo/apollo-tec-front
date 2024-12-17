import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RiBankLine } from "react-icons/ri";
import { GoArrowUpRight } from "react-icons/go";

type Bank = {
  id: number;
  name: string;
  logoImage: string;
};

export const BankCard: React.FC<Bank> = ({ id, name, logoImage }) => {
  const [hasFailed, setHasFailed] = useState(false);
  const navigate = useNavigate();
  return (
    <Card
      className="d-flex flex-row align-items-center border-0 shadow-sm"
      style={{ minWidth: "265px", height: "7.375rem" }}
    >
      {hasFailed ? (
        <div
          className="d-flex justify-content-center"
          style={{ width: "6.25rem" }}
        >
          <RiBankLine
            color="#d3d3d4"
            style={{ width: "4rem", height: "auto" }}
          />
        </div>
      ) : (
        <Card.Img
          alt={`banco ${name}`}
          className="img-fluid p-1"
          src={logoImage}
          style={{ width: "6.25rem", height: "auto" }}
          onError={() => setHasFailed(true)}
        />
      )}

      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>{`Banco ${id}`}</Card.Subtitle>
        <Card.Subtitle
          className="mt-2 text-warning d-flex gap-1 align-items-center"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/bancos/detalhes/${id}`)}
        >
          Ver detalhes
          <GoArrowUpRight fontSize="18px" />
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};
