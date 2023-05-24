import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Star from "./star.png"

export const MainStyle = styled.main`
  background-image: url(${(props) => props.back});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  color: white;
  display: flex;
  padding-top: 18rem;
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

export default function Main() {
  const [filmes, setFilmes] = useState([]);
  const [fundo, setFundo] = useState([]);

 
// Criado um segundo parametro ([]), para só chamar getfilmes quando renderizar a pagina. Caso esse parametro não seja passado, qualquer interação com a DOM irá chamar o useEffect.

  useEffect(() => {
    getFilmes();
  }, [])

  const getFilmes = async () => {
    // Responsável por chamar todos os filmes, armazenar os filmes e os posteres na constante allAPI e atribuir esses valores no useState Filmes, chamando o setFilmes. 
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

        // caso essa chamada tenha sido bem sucedida ele irá chamar a função getCover passando o primeiro filme da lista.
        if (allApi.length > 0) {
          const cover = allApi[0];
          getCover(cover);
        }
      })
  };

  const getCover = async (movie) => {
    // irá receber o primeiro filme e montar um objeto com todos os campos formatados. ps: abri uma chamada para puxar os detalhes do filme recebido como parametro. (id)
    const movieDetail = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie.id}?api_key=34635a3c54d72514d08fd6979b14e222&language=pt-Br`
    );

    // formatando o ano
    const releaseYear = movie.release_date.split("-")[0];

    function getGenres() {
      // pegando a array dentro do genero e mapeando por cada objeto para conseguir pegar apenas a informação que eu quero de dentro do objeto.
      const movieGenres = movieDetail.data.genres;
      let genero = "";
      if (movieGenres != null) {
        const genreNames = movieGenres.map((genre) => genre.name);
        genero = genreNames.join(", ");
      }
      return genero;
    }
 
    function getMovieDuration() {
      // função para formatar os dados de duração do filme que eram total de minutos para hora e minutos.
      const movieDuration = movieDetail.data.runtime
      const hours = Math.floor(movieDuration / 60);
      const minutes = movieDuration % 60;

      return `${hours} horas e ${minutes} minutos`;
    }

    // montando o objeto da capa e atribuindo a var fundo chamando o useState (setFundo).
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
