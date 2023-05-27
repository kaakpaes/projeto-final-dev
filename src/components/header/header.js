import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Logo from "../header/logo.png";
import Lupa from "../header/lupa.png";
import InputSearch from "./inputheader";

export const HeaderStyle = styled.header`
width: 100vw;
  height: 10vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(119, 136, 153, 0.4);
  backdrop-filter: blur(15px);


  nav {
    display: flex;
  }

  ul {
    display: flex;
    justify-content: center;
    list-style: none;
    width: 34%;
  }

  a {
    font-family: "Open Sans", sans-serif;
    font-weight: 300;
    text-decoration: none;
    color: white;
    font-size: 1rem;
  }
`;

export const LiMenu = styled.li`
  display: flex;
  width: 24%;
  align-items: center;
`;

export const A = styled.a`
  &:hover {
    background-color: #747474;
    border-radius: 18px;
    width: 6rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// FUNÇÃO QUE CLICA NA IMAGEM PARA A BARRA DE PESQUISA APARECER E NO SEGUNDO CLIQUE A BARRA DESAPARECE
export default function Header() {
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
    document.addEventListener('click', mudandoClick);
    return () => {
      document.removeEventListener('click', mudandoClick);
    };
  }, []);


  return (
    <HeaderStyle>
      <nav>
        <ul>
          <li>
            <img src={Logo} alt="logo" />{" "}
          </li>
        </ul>

        <ul>
          <LiMenu>
            <A href="/series">Séries</A>
          </LiMenu>
          <LiMenu>
            <A href="/">Filmes</A>
          </LiMenu>
        </ul>

        <ul>
          <LiMenu>
            <img
              onClick={click}
              src={Lupa}
              ref={imgRef}
              alt="lupa"
            />
            {searchBar && <InputSearch />}
          </LiMenu>
          <LiMenu>
            <a href="#">Filtro</a>
          </LiMenu>
          <LiMenu>
            <a href="#filmes">Login</a>
          </LiMenu>
        </ul>
      </nav>
    </HeaderStyle>
  );
}