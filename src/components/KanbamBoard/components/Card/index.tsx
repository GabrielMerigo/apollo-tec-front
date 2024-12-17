import { LuPencil, LuTrash2 } from "react-icons/lu";
import { Avatar } from "../../../Avatar/Avatar";
import { TbMail } from "react-icons/tb";
import cardStyle from "./style.module.css";
import clsx from "clsx";
import { Draggable } from "../Draggable";

export interface CardProps {
  id: string;
  leadName: string;
  leadEmail: string;
  leadResponsible?: string;
  responsibleImage: string;
  status: string;
}

export const Card = ({
  id,
  leadName,
  leadEmail,
  leadResponsible,
  responsibleImage,
}: CardProps) => {
  return (
    <Draggable id={id}>
      <div
        className={clsx(
          cardStyle.container,
          "w-100 d-flex justify-content-center align-items-center flex-column"
        )}
      >
        <div className="d-flex flex-column w-100">
          <b className="m-0">{leadName}</b>
          <p className="m-0">
            <TbMail /> {leadEmail}
          </p>
        </div>
        <div
          className="w-100 d-flex align-items-center justify-content-start"
          style={{ gap: "8px" }}
        >
          <Avatar image={responsibleImage} />
          {leadResponsible ? (
            <p className="m-0">{leadResponsible}</p>
          ) : (
            <p className="m-0">Sem responsável</p>
          )}
          <div className="d-flex" style={{ gap: "12px", marginLeft: "auto" }}>
            <LuTrash2 style={{ cursor: "pointer" }} color="#8C8E90" />
            <LuPencil style={{ cursor: "pointer" }} color="#8C8E90" />
          </div>
        </div>
      </div>
    </Draggable>
  );
};
