import clsx from "clsx";
import { StatusTypeEnum, statusTypeStyles } from "../../constants/STATUS_MOCK";
import "bootstrap/dist/css/bootstrap.min.css";

export interface TableStatusProps {
  statusType: StatusTypeEnum;
}

export const TableStatus = ({ statusType }: TableStatusProps) => {
  const { backgroundColor, color } = statusTypeStyles[statusType];

  return (
    <div
      className={clsx(
        "d-flex justify-content-center align-items-center",
        "rounded-pill px-2 py-1",
        "text-center fw-medium"
      )}
      style={{
        backgroundColor,
        color,
        width: "81px",
        height: "24px",
        fontSize: "12px",
      }}
    >
      {statusType}
    </div>
  );
};
