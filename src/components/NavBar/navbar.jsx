import React, { useState, useEffect, useRef } from "react";
import * as S from "./style";
import Lupa from "../header/lupa.png";
import InputSearch from './inputsearch';

// FUNÇÃO QUE CLICA NA IMAGEM PARA A BARRA DE PESQUISA APARECER E NO SEGUNDO CLIQUE A BARRA DESAPARECE


export default function NavComponent() {
  const [searchBar, setSearchBar] = useState(false);
  const imgRef = useRef(null);
  const inputRef = useRef(null);

  const click = () => {
    setSearchBar(!searchBar);
  };

  const mudandoClick = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target) && event.target !== imgRef.current) {
      setSearchBar(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', mudandoClick
);
    return () => {
      document.removeEventListener('click', mudandoClick
  );
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
        {searchBar && <InputSearch ref={inputRef} type="text" />}
        <img onClick={click} ref={imgRef} src={Lupa} alt="lupa" />
      </S.NavList>
    </S.NavBar>
  );
}