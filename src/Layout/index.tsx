import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
  return (
    <div className="App">
      <Header />
      <main>
        <Container maxWidth="md">
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
