import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Star from "./star.png"

export const MainStyle = styled.main`
  background-image: url(${(props) => props.back});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  color: #717171;
  display: flex;
  padding-top: 22rem;
  padding-left: 9rem;
  flex-direction: column;
`;
export const H3 = styled.h3`
  width: 55rem;
  font-size: 1rem;
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
`;

const ButtonDiv = styled.div`
width: 25rem;
display: flex;
justify-content: space-between;
margin-top: 1rem;
`;
const ButtonAssistir = styled.button`
  width: 14vw;
  height: 6vh;
  border-radius: 20px;
  border: none;
  background: #d53a00;
  color: #f2f2f2;
  font-weight: bold;
`;
const ButtonTrailer = styled.button`
  width: 14vw;
  height: 6vh;
  border-radius: 20px;
  border: none;
  background: #717171;
  color: #f2f2f2;
  font-weight: bold;
`;


export default function MainSeries() {
  const [filmes, setFilmes] = useState([]);
  const [fundo, setFundo] = useState([]);

 
  useEffect(() => {
    getFilmes();
  }, [])

  const getFilmes = async () => {
    await axios
      .get(
        "https://api.themoviedb.org/3/tv/popular?api_key=34635a3c54d72514d08fd6979b14e222&language=pt-Br&page=1"
      )
      .then((resposta) => {
        const allApi = resposta.data.results.map((item) => {
          return {
            ...item,
            poster: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
          };
        });
        setFilmes(allApi);

        if (allApi.length > 0) {
          const cover = allApi[0];
          getCover(cover);
        }
      })
  };

  const getCover = async (movie) => {
    const movieDetail = await axios.get(
      `https://api.themoviedb.org/3/tv/${movie.id}?api_key=34635a3c54d72514d08fd6979b14e222&language=pt-Br`
    );

    const releaseYear = movie.first_air_date.split("-")[0];

    function getGenres() {
      const movieGenres = movieDetail.data.genres;
      let genero = "";
      if (movieGenres != null) {
        const genreNames = movieGenres.map((genre) => genre.name);
        genero = genreNames.join(", ");
      }
      return genero;
    }

    const cover = {
      title: movie.name,
      year: releaseYear,
      genres: getGenres(),
      number_episodes: movieDetail.number_of_seasons,
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
          <H3>{fundo.duration} | {fundo.genres} | {fundo.year}</H3>
          <h3><img src={Star} alt="lupa" width={"2.5%"} /> {fundo.rating}/10</h3>
          <H3>{fundo.overview}</H3>
          <ButtonDiv>
          <ButtonAssistir> Assitir Agora </ButtonAssistir>
          <ButtonTrailer> Trailer </ButtonTrailer>
        </ButtonDiv>
        </div>
      </MainStyle>
    </>
  );
}
