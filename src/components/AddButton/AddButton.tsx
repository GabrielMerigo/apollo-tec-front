import React from "react";
import { Button, ButtonProps } from "react-bootstrap";
import clsx from "clsx";
import "./styles.css";
import { GoPlus } from "react-icons/go";

interface AddButtonProps extends ButtonProps {
  label: string;
  onClick?: () => void;
  iconSide?: "right" | "left";
  className?: string;
}

export const AddButton: React.FC<AddButtonProps> = ({
  label,
  onClick,
  iconSide = "left",
  className,
  ...props
}) => {
  return (
    <Button
      {...props}
      className={clsx(
        className,
        "d-flex fw-semibold align-items-center add-button"
      )}
      onClick={onClick}
    >
      {iconSide === "left" && <GoPlus fontSize="24px" />}
      {label}
      {iconSide === "right" && <GoPlus fontSize="24px" />}
    </Button>
  );
};
