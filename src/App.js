import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Homepage } from "./components/home";
import Busca from "./components/busca/filmesBusca";
import Series from "./components/series/series";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/series" element={<Series />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/busca/:parametro" element={<Busca />} />
      </Routes>
    </Router>
  )
}
