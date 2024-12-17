import React, { useCallback } from "react";
import "./style.css";
import { Accordion, Image, NavItem } from "react-bootstrap";
import Logo from "../../assets/logo-2.png";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { BiPieChartAlt2 } from "react-icons/bi";
import { TbCopyCheck, TbLayersLinked } from "react-icons/tb";
import { PiHouse } from "react-icons/pi";
import { UserCard } from "../UserCard/UserCard";
import { ProcessType } from "../../pages/Processes/types";
import { fetchAllProcessesTypes } from "../../services/queries";

export const Sidemenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const normalizedString = useCallback((str?: string) => {
    return str
      ?.replace(/\s+/g, "")
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }, []);

  const { data: processesTypes } = useQuery<ProcessType[]>({
    queryKey: ["processes-types"],
    queryFn: async () => fetchAllProcessesTypes(),
  });

  const isTypeProcess = useCallback(
    (type: string) =>
      location.pathname.includes(`/processos/${normalizedString(type)}`),
    [location.pathname, normalizedString]
  );
  const isRoute = useCallback(
    (path: string) => location.pathname.includes(path),
    [location.pathname]
  );

  return (
    <div
      className="p-2 d-flex flex-column"
      style={{
        minWidth: "20dvw",
        borderRight: "2px solid #ECECEE",
        height: "100dvh",
      }}
    >
      <Image
        className="p-4"
        src={Logo}
        alt="logo"
        style={{ width: "200px", height: "100px" }}
      />

      <Accordion className="flex-grow-1">
        <Accordion.Item eventKey="0">
          <NavItem
            onClick={() => navigate("/dashboard")}
            className={clsx(
              "d-flex gap-1 nav-item align-items-center fw-semibold",
              { "text-warning active-item": isRoute("/dashboard") }
            )}
          >
            <PiHouse fontSize="24px" />
            Dashboard
          </NavItem>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <div className="fw-semibold d-flex align-items-center gap-1">
              <HiOutlineSquares2X2 fontSize="24px" />
              Processos
            </div>
          </Accordion.Header>
          <Accordion.Body>
            {processesTypes?.map((processType) => {
              return (
                <NavItem
                  key={processType.id}
                  className={clsx({
                    "text-warning active-item": isTypeProcess(processType.name),
                  })}
                  onClick={() => {
                    navigate(
                      `/processos/${normalizedString(processType.name)}/${
                        processType.id
                      }`
                    );
                  }}
                >
                  {processType.name}
                </NavItem>
              );
            })}
          </Accordion.Body>
        </Accordion.Item>
        <NavItem
          className={clsx("gap-1", {
            "text-warning active-item": isRoute("/leads"),
          })}
          onClick={() => navigate("/leads")}
        >
          <TbLayersLinked fontSize="24px" />
          Leads
        </NavItem>
        <NavItem
          className={clsx("gap-1", {
            "text-warning active-item": isRoute("/clientes"),
          })}
          onClick={() => navigate("/clientes")}
        >
          <TbCopyCheck fontSize="24px" />
          Clientes
        </NavItem>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <div className="fw-semibold d-flex align-items-center gap-1">
              <BiPieChartAlt2 fontSize="24px" /> Definições
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <NavItem
              className={clsx({
                "text-warning active-item": isRoute("/bancos"),
              })}
              onClick={() => navigate("/bancos")}
            >
              Bancos
            </NavItem>
            <NavItem
              className={clsx({
                "text-warning active-item": isRoute("/balcoes"),
              })}
              onClick={() => navigate("/balcoes")}
            >
              Balcões
            </NavItem>
            <NavItem
              className={clsx({
                "text-warning active-item": isRoute("/tipos-de-processos"),
              })}
              onClick={() => navigate("/tipos-de-processos")}
            >
              Tipos de processos
            </NavItem>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <footer style={{ marginBottom: "36px" }}>
        <UserCard avatarImage="" />
      </footer>
    </div>
  );
};
