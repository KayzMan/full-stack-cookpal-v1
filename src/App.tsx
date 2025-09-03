import { Separator } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";

// components...

// pages...

export function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Separator mb={"4"} />
      <Routes>
        <Route path="/" id="home" element={<h1>Hello, World</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
