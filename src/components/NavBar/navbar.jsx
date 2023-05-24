import React, { useState, useEffect, useRef } from "react";
import * as S from "./style";
import Lupa from "../header/lupa.png";
import InputSearch from './inputsearch';

export default function NavComponent() {
  const [searchBar, setSearchBar] = useState(false);
  const imgRef = useRef(null);

  const clickHandler = () => {
    setSearchBar(true);
  };

  const handleClickOutside = (event) => {
    if (imgRef.current && !imgRef.current.contains(event.target)) {
      setSearchBar(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
        {searchBar && <InputSearch />}
        {/* <a href="" > */}
          <img onClick={clickHandler} ref={imgRef} src={Lupa} alt="lupa" />
        {/* </a> */}
      </S.NavList>
    </S.NavBar>
  );
}
