import React from "react";
import { Outlet } from "react-router-dom";
import { Sidemenu } from "../../Sidemenu/Sidemenu";

const Layout: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidemenu />
      <main
        style={{
          minHeight: "100dvh",
          flexGrow: 1,
          padding: "1rem",
          backgroundColor: "#f5f5f5",
          width: "calc(100dvw - 20dvw)",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
