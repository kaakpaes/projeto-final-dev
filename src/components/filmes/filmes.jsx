import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

export const FilmesStyle = styled.section`
  background-color: #000000;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  min-height: 100vh; /* Define a altura mínima para ocupar toda a tela */
  padding-bottom: 4rem; /* Adiciona espaço para o rodapé */
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

const Footer = styled.footer`
  width: 100%;
  background-color: #000000;
  padding: 1rem;
`;

const PaginationContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
`;

const PageNumber = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border: solid 1px;
  border-radius: 50%;
  background-color: #000000;
  color: #828181;
  margin: 0 0.5rem;

  &:hover {
    background-color: white;
  } 

`;

export default function Filmes() {
  const [filmes, setFilmes] = useState([]);
  const [input, setInput] = useState("");
  const [filtrados, setFiltrados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filmsPerPage] = useState(8);

  useEffect(() => {
    getFilmes();
    filtrar();
  }, [input, filmes, filtrados]);

  const getFilmes = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=34635a3c54d72514d08fd6979b14e222&language=pt-Br&page=${currentPage}`
      )
      .then((resposta) => {
        const allApi = resposta.data.results.map((item) => {
          return {
            ...item,
            image: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
          };
        });
        setFilmes(allApi);
      });
  };

  const filtrar = () => {
    const filtros = filmes.filter((item) => {
      if (item.title.toLowerCase().includes(input.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
    setFiltrados(filtros);
  };

  const indexOfLastFilm = currentPage * filmsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
  const currentFilms = filtrados.slice(indexOfFirstFilm, indexOfLastFilm);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <FilmesStyle id="filmes">
        <BoxTitle>
          <H2>Em Alta</H2>
        </BoxTitle>
        {currentFilms.map((item) => (
          <BoxFilms key={item.id}>
            <img src={item.image} alt={item.title} style={{ width: "60%" }} />
            <FilmesTitle>{item.title}</FilmesTitle>
            <FilmesDate>{item.release_date.split("-")[0]}</FilmesDate>
          </BoxFilms>
        ))}
      </FilmesStyle>
      <Footer>
        <Pagination
          filmsPerPage={filmsPerPage}
          totalFilms={filtrados.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </Footer>
    </>
  );
}

const Pagination = ({ filmsPerPage, totalFilms, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalFilms / filmsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      {pageNumbers.map((number) => (
        <PageNumber
          key={number}
          onClick={() => paginate(number)}
          isActive={number === currentPage}
        >
          {number}
        </PageNumber>
      ))}
    </PaginationContainer>
  );
};