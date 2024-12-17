import React from "react";
import { Badge as BadgeBootstrap } from "react-bootstrap";

type BadgeProps = {
  label: string;
  color?: string;
  onClick?: () => void;
};

export const Badge: React.FC<BadgeProps> = ({ label, color, onClick }) => {
  return (
    <BadgeBootstrap
      onClick={onClick}
      bg=""
      pill
      style={{
        backgroundColor: color,
        color: "black",
        fontWeight: "normal",
        cursor: "pointer",
      }}
    >
      {label}
    </BadgeBootstrap>
  );
};
