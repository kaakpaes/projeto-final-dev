import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Lupa from "./image.png";

export const FilmesStyle = styled.section`
  background-color: #000000;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
export const H2 = styled.h2`
  display: flex;
  font-size: 1.4rem;
  text-align: center;
  color: #f2f2f2;
`;
export const BoxFilms = styled.section`
  width: 22%;

  img {
    width: 80%;
  }
`;

export const BoxTitle = styled.section`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  margin-left: 5rem;

`;

const FilmesTitle = styled.h2`
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  color: #f2f2f2;
`;

const FilmesDate = styled.h2`
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 0.8rem;
  color: #f6f6f6;
  opacity: 0.5;
`;


export default function Filmes() {
  const [filmes, setFilmes] = useState([]);
  const [input, setInput] = useState("");
  const [filtrados, setFiltrados] = useState([]);
  const [mode, setMode] = useState(false);


  useEffect(() => {
    getFilmes();
    filtar();
  }, [input, filmes, filtrados]);

  const getFilmes = async () => {
    await axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=34635a3c54d72514d08fd6979b14e222&language=pt-Br&page=1"
      )
      .then((resposta) => {
        const allApi = resposta.data.results.map((item) => {
          return {
            ...item,
            image: `https://image.tmdb.org/t/p/w500/${item.poster_path}`
          };
        });
        setFilmes(allApi);
      })
  };

  const filtar = () => {
    const filtros = filmes.filter((item) => {
      if (item.title.toLowerCase().includes(input.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
    setFiltrados(filtros);
  };

  return (
    <FilmesStyle id="filmes">
      <BoxTitle>
        <H2>Em Alta</H2>
      </BoxTitle>
      {filtrados.map((item) => (
        <BoxFilms>
          <img src={item.image} alt={item.title} style={{ width: "60%" }} />
          <FilmesTitle>{item.title}</FilmesTitle>
          <FilmesDate>{item.release_date.split("-")[0]}</FilmesDate>
        </BoxFilms>
      ))}
    </FilmesStyle>
  );
}
