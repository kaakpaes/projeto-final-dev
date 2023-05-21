import React from "react";
import * as S from "./style";
import Lupa from "../header/lupa.png";

export default function NavComponent() {
  return (
    <S.NavBar>
      <S.NavList>
        <S.NavItem>Popular</S.NavItem>
        <S.NavItem>Drama</S.NavItem>
        <S.NavItem>Ação</S.NavItem>
        <S.NavItem>Aventura</S.NavItem>
        <S.NavItem>Comédia</S.NavItem>
        <S.NavItem>Crime</S.NavItem>
        <S.NavItem>Fantasia</S.NavItem>
        <S.NavItem>Familia</S.NavItem>
        <img src={Lupa} alt="lupa" />
      </S.NavList>
      {/* <SearchBar /> */}
    </S.NavBar>
  );
}

// const SearchBar = () => {
//   return <S.InputSearch />;
// };
