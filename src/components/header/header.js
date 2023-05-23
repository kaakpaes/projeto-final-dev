import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../header/logo.png";
import Lupa from "../header/lupa.png";
import * as S from "../NavBar/style";

export const HeaderStyle = styled.header`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  backdrop-filter: blur(15px);
  width: 100%;
  height: 10vh;

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

export default function Header() {
  const [searchBar, setSearchBar] = useState(false);

  const clickHandler = () => {
    event.preventDefault();
    setSearchBar(true);
  }

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
            <A href="#series">Séries</A>
          </LiMenu>
          <LiMenu>
            <A href="#filmes">Filmes</A>
          </LiMenu>
        </ul>

        <ul>
          <LiMenu>
            <a href="#" onClick={clickHandler}>
              <img src={Lupa} alt="lupa" />
            </a>
            {searchBar && <S.InputSearch />}
          </LiMenu>
          <LiMenu>
            <a href="#filmes">Filtro</a>
          </LiMenu>
          <LiMenu>
            <a href="#filmes">Login</a>
          </LiMenu>
        </ul>
      </nav>
    </HeaderStyle>
  );
}
