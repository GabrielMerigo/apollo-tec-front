import React from "react";
import { Container } from "react-bootstrap";
import { HiOutlineSelector } from "react-icons/hi";
import { Avatar } from "../Avatar/Avatar";

type UserCardProps = {
  avatarImage: string;
};

export const UserCard: React.FC<UserCardProps> = ({ avatarImage }) => {
  return (
    <Container
      className="d-flex align-items-center justify-content-between"
      style={{
        borderRadius: "12px",
        border: "2px solid #ECECEE",
        padding: "19px",
      }}
    >
      <div className="d-flex align-items-center gap-2">
        <Avatar image={avatarImage} />

        <span style={{ fontWeight: "500", color: "#2A2A2A" }}>
          João Pereira
        </span>
      </div>
      <HiOutlineSelector fontSize="24px" color="#8C8E90" />
    </Container>
  );
};
