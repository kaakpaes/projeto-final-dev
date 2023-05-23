import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

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

export default function Busca() {
  const [filmes, setFilmes] = useState([]);
  const { parametro } = useParams()


  useEffect(() => {
    getFilmes();
  }, []);

  const getFilmes = async () => {
    await axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=34635a3c54d72514d08fd6979b14e222&language=pt-Br&page=1"
      )
      .then(async (resposta) => {
        await axios.get("https://api.themoviedb.org/3/tv/popular?api_key=34635a3c54d72514d08fd6979b14e222&language=pt-Br&page=1")
        .then((respostaSeries) => {
          const respostaSeriesFormatado = respostaSeries.data.results.map(serie => { return { ...serie, title: serie.name, release_date: serie.first_air_date }})
          const resultadoFinal = resposta.data.results.concat(respostaSeriesFormatado)
          const filteredItems = resultadoFinal.filter((item) => item.title.toLowerCase().includes(parametro.toLowerCase()));
          const allApi = filteredItems.map((item) => {
            return {
              ...item,
              image: `https://image.tmdb.org/t/p/w500/${item.poster_path}`
            };
          });
          setFilmes(allApi);
        })
      })
  };

  return (
    <FilmesStyle id="filmes">
      {filmes.map((item) => (
        <BoxFilms>
          <img src={item.image} alt={item.title} style={{ width: "60%" }} />
          <FilmesTitle>{item.title}</FilmesTitle>
          <FilmesDate>{item.release_date.split("-")[0]}</FilmesDate>
        </BoxFilms>
      ))}
    </FilmesStyle>
  );
}
