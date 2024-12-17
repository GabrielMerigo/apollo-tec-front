import clsx from "clsx";
import React, { ReactNode } from "react";
import { Button } from "react-bootstrap";

type ButtonIconProps = {
  label: string;
  onClick?: () => void;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

export const ButtonIcon: React.FC<ButtonIconProps> = ({
  label,
  onClick,
  className,
  iconLeft,
  iconRight,
}) => {
  return (
    <Button
      className={clsx(
        `d-flex ${className} gap-1 fw-semibold align-items-center`
      )}
      onClick={onClick}
    >
      {iconLeft}
      {label}
      {iconRight}
    </Button>
  );
};
