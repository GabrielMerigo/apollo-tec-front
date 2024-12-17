import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Banks } from "./pages/Bancos";
import { BankCounter } from "./pages/Balcões";

import { Clients } from "./pages/Clients";
import Layout from "./components/layouts/Layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Processes } from "./pages/Processes/Processes";
import { ProcessesTypes } from "./pages/ProcessesTypes/ProcessesTypes";
import useWindowSize from "./hooks/useWindowSize";
import LayoutMobile from "./components/layouts/LayoutMobile/LayoutMobile";
import { BankEdition } from "./pages/BankEdition/BankEdition";
import { BankCreation } from "./pages/BankCreation/BankCreation";
import { BankCounterCreation } from "./pages/BankCounterCreation/BankCounterCreation";
import { BankCounterEdition } from "./pages/BankCounterEdition/BankCounterEdition";
import { ProcessCreation } from "./pages/ProcessCreation/ProcessCreation";
import { ProcessEdition } from "./pages/ProcessEdition/ProcessEdition";
import { Leads } from "./pages/Leads";

const App: React.FC = () => {
  const windowSize = useWindowSize();
  const queryClient = new QueryClient();

  const { isMobile } = windowSize;

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={isMobile ? <LayoutMobile /> : <Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bancos/" element={<Banks />} />
            <Route path="/bancos/detalhes/:id" element={<BankEdition />} />
            <Route path="/bancos/adicionar/" element={<BankCreation />} />
            <Route path="/balcoes" element={<BankCounter />} />
            <Route
              path="/balcoes/adicionar"
              element={<BankCounterCreation />}
            />
            <Route
              path="/balcoes/editar/:id"
              element={<BankCounterEdition />}
            />
            <Route
              path="/processos/:processName/:processId"
              element={<Processes />}
            />
            <Route
              path="/processos/:processName/:processId/iniciar"
              element={<ProcessCreation />}
            />

            <Route
              path="/processos/:processName/:processId/editar/:id"
              element={<ProcessEdition />}
            />

            <Route path="/clientes" element={<Clients />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/tipos-de-processos" element={<ProcessesTypes />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
