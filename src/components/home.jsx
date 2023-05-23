import Header from "./header/header"
import Main from "./main/main"
import NavComponent from "./NavBar/navbar"
import CarouselComponent from './carousel/carousel'
import Filmes from "./filmes/filmes"
import Footer from "./footer/footer"
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

`;

export function Homepage() {
    return (
        <>
            <Header />
            <Main />
            <NavComponent />
            <CarouselComponent />
            <Filmes />
            {/* <Footer /> */}
            <GlobalStyle />
        </>
    )
}