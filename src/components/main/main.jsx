import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

export const MainStyle = styled.main`
  background-image: url(${(props) => props.back});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  color: white;
  display: flex;
  padding-top: 18rem;
  padding-left: 9rem;
  flex-direction: column;
`;
export const H2 = styled.h2`
  font-size: 3rem;
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
`;

export const H3 = styled.h3`
  width: 55rem;
  font-size: 1rem;
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
`;

export default function Main() {
  const [filmes, setFilmes] = useState([]);
  const [fundo, setFundo] = useState([]);

  useEffect(() => {
    getFilmes();
  });

  const getFilmes = async () => {
    await axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=34635a3c54d72514d08fd6979b14e222&language=pt-Br&page=1"
      )
      .then((resposta) => {
        const allApi = resposta.data.results.map((item) => {
          return {
            ...item,
            poster: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
          };
        });
        setFilmes(allApi);
        getCover(allApi[0]);
      })
      .catch((error) =>
        alert(`desculpe, você teve um erro de requisição ${error}`)
      );
  };

  const getCover = async (movie) => {
    const movieDetail = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie.id}?api_key=34635a3c54d72514d08fd6979b14e222&language=pt-Br`
    );

    const releaseYear = movie.release_date.split("-")[0];

    function getGenres() {
      const movieGenres = movieDetail.genres;
      console.log(movieGenres);
      let genreString = "";
      if (movieGenres != null) {
        const genreNames = movieGenres.map((genre) => genre.name);
        genreString = genreNames.join(", ");
      }
      return genreString;
    }

    function getMovieDuration() {
      const hours = Math.floor(movieDetail.rutime / 60);
      const minutes = movieDetail.rutime % 60;

      return `${hours} horas e ${minutes} minutos`;
    }

    const cover = {
      title: movie.title,
      year: releaseYear,
      genres: getGenres(),
      duration: getMovieDuration(),
      overview: movie.overview,
      rating: movie.vote_average,
      poster: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
    };

    setFundo(cover);
  };

  return (
    <>
      <MainStyle back={fundo.poster} id="main">
        <div>
          <h1>{fundo.title}</h1>
          <h3>{fundo.year}</h3>
          <h3>{fundo.genres}</h3>
          <h3>{fundo.duration}</h3>

          <h3>IMDB{fundo.rating}</h3>

          <H3>{fundo.overview}</H3>
        </div>
      </MainStyle>
    </>
  );
}
