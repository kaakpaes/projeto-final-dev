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
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
  }

  img {
    width: 15px;
    cursor: pointer;
  }
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

const Caixa = styled.input`
  display: ${(props) => props.show};
`;

export default function ListarSeries() {
  const [filmes, setFilmes] = useState([]);
  const [mode, setMode] = useState(false);


  useEffect(() => {
    getFilmes();
  }, []);

  const getFilmes = async () => {
    await axios
      .get(
        "https://api.themoviedb.org/3/tv/popular?api_key=34635a3c54d72514d08fd6979b14e222&language=pt-Br&page=1"
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

  return (
    <FilmesStyle id="filmes">
      <BoxTitle>
        <H2>Em Alta</H2>
        <div>
          <img onClick={() => setMode(!mode)} src={Lupa} alt="" />
          <Caixa
            show={mode === false ? "none" : "initial"}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </div>
      </BoxTitle>
      {filmes.map((item) => (
        <BoxFilms>
          <img src={item.image} alt={item.title} style={{ width: "60%" }} />
          <FilmesTitle>{item.name}</FilmesTitle>
          <FilmesDate>{item.first_air_date.split("-")[0]}</FilmesDate>
        </BoxFilms>
      ))}
    </FilmesStyle>
  );
}
