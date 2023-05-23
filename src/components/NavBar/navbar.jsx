import React, { useState } from "react";
import * as S from "./style";
import Lupa from "../header/lupa.png";
import InputSearch from './inputsearch';

export default function NavComponent() {
  const [searchBar, setSearchBar] = useState(false); 

  const clickHandler = () => {
    event.preventDefault();
    setSearchBar(true);
  }

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
        <a href="#" onClick={clickHandler}>
          <img src={Lupa} alt="lupa" />
        </a>
        {searchBar && <InputSearch />}
      </S.NavList>
    </S.NavBar>
  );
}
