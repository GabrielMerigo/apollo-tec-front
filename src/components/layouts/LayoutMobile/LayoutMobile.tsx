import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../Navbar/Navbar";

const LayoutMobile: React.FC = () => {
  return (
    <div style={{ height: "100vh", width: "100dvw" }}>
      <Navbar />
      <main
        style={{
          minHeight: "100dvh",
          flexGrow: 1,
          padding: "1rem",
          backgroundColor: "#f5f5f5",
          maxWidth: "100%",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutMobile;
