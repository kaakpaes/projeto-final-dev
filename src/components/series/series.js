import React from "react";
import styled from "styled-components";
import Header from "../header/header";
import NavComponent from "../NavBar/navbar";
import { createGlobalStyle } from "styled-components";
import CarouselComponent from './carouselSeries'
import ListarSeries from "./listarSeries";
import MainSeries from "./mainSeries";

const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

`;

export const SerieStyle = styled.main`
`;

export default function Series() {

  return (
    <SerieStyle id="series">
      <>
        <Header />
        <MainSeries />
        <NavComponent />
        <CarouselComponent />
        <ListarSeries />
        <GlobalStyle />
      </>
    </SerieStyle>
  );
}
