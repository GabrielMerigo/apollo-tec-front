import React, { useCallback } from "react";
import {
  Image,
  Nav,
  Accordion,
  Navbar as ReactBootstrapNavbar,
  NavItem,
} from "react-bootstrap";
import Logo from "../../assets/logo-2.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { BiPieChartAlt2 } from "react-icons/bi";
import { TbCopyCheck } from "react-icons/tb";
import { PiHouse } from "react-icons/pi";
import clsx from "clsx";
import { ProcessType } from "../../pages/Processes/types";
import { fetchAllProcessesTypes } from "../../services/queries";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data: processesTypes } = useQuery<ProcessType[]>({
    queryKey: ["processes-types"],
    queryFn: async () => fetchAllProcessesTypes(),
  });

  const isTypeProcess = useCallback(
    (type: string) => location.pathname === `/processos/${type}`,
    [location.pathname]
  );

  const isRoute = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  return (
    <ReactBootstrapNavbar
      className="p-2 w-100"
      expand="lg"
      bg="light"
      variant="light"
    >
      <ReactBootstrapNavbar.Brand href="#">
        <Image
          src={Logo}
          alt="logo"
          style={{ width: "50dvw", height: "auto" }}
        />
      </ReactBootstrapNavbar.Brand>
      <ReactBootstrapNavbar.Toggle aria-controls="navbar-nav" />
      <ReactBootstrapNavbar.Collapse id="navbar-nav">
        <Accordion defaultActiveKey="0" className="w-100">
          <Accordion.Item eventKey="0" className="d-flex">
            <NavItem
              className={`w-100 d-flex align-items-center gap-2 ${
                isRoute("/dashboard") ? "text-warning" : ""
              }`}
              onClick={() => navigate("/dashboard")}
              style={{ cursor: "pointer" }}
            >
              <PiHouse fontSize="24px" />
              Dashboard
            </NavItem>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <div className="fw-semibold d-flex align-items-center gap-2">
                <HiOutlineSquares2X2 fontSize="24px" />
                Processos
              </div>
            </Accordion.Header>
            <Accordion.Body>
              {processesTypes?.map((processType) => (
                <Nav.Link
                  key={processType.id}
                  onClick={() =>
                    navigate(`/processos/${processType.name}/${processType.id}`)
                  }
                  className={clsx("fw-semibold", {
                    "text-warning": isTypeProcess(processType.name),
                  })}
                >
                  {processType.name}
                </Nav.Link>
              ))}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <div className="fw-semibold d-flex align-items-center gap-2">
                <BiPieChartAlt2 fontSize="24px" />
                Definições
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <Nav.Link
                onClick={() => navigate("/bancos")}
                className={clsx("fw-semibold", {
                  "text-warning": isRoute("/bancos"),
                })}
              >
                Bancos
              </Nav.Link>
              <Nav.Link
                onClick={() => navigate("/balcoes")}
                className={clsx("fw-semibold", {
                  "text-warning": isRoute("/balcoes"),
                })}
              >
                Balcões
              </Nav.Link>
              <Nav.Link
                onClick={() => navigate("/tipos-de-processos")}
                className={clsx("fw-semibold", {
                  "text-warning": isRoute("/tipos-de-processos"),
                })}
              >
                Tipos de processos
              </Nav.Link>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3" className="d-flex">
            <NavItem
              className={`w-100 d-flex align-items-center gap-2 ${
                isRoute("/clientes") ? "text-warning" : ""
              }`}
              onClick={() => navigate("/clientes")}
              style={{ cursor: "pointer" }}
            >
              <TbCopyCheck fontSize="24px" />
              Clientes
            </NavItem>
          </Accordion.Item>
        </Accordion>
      </ReactBootstrapNavbar.Collapse>
    </ReactBootstrapNavbar>
  );
};
