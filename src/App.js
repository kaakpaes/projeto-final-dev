import React from "react";
import CarouselComponent from "./components/carousel/carousel";
import Filmes from "./components/filmes/filmes";
import Footer from "./components/footer/footer.jsx";
import Header from "./components/header/header";
import Main from "./components/main/main";
import NavComponent from "./components/NavBar/navbar";
import Series from "./components/series/series.js";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

`;

export default function App() {
  return (
    <>
      <Header />
      <Main />
      <NavComponent />
      <CarouselComponent />
      <Filmes />
      {/* <Footer /> */}
      {/* <Series /> */}
      <GlobalStyle />
    </>
  );
}
