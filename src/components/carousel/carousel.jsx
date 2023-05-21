import React, { useEffect, useState } from "react";
import Carousel, { consts } from "react-elastic-carousel";
import axios from "axios";
import styled from "styled-components";

const ContainerCarousel = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000000;
`;
const CarouselTitle = styled.h2`
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  color: #f2f2f2;
`;

const Lancamentos = styled.h2`
  color: #f2f2f2;
`;

const CarouselDate = styled.h3`
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 0.8rem;
  color: #f6f6f6;
  opacity: 0.5;
`;

export default function CarouselComponent() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    getFilmes();
  }, []);

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
      .catch((error) =>
        alert(`desculpe, você teve um erro de requisição ${error}`)
      );
  };

  return (
    <ContainerCarousel>
      <Lancamentos>Últimos Lançamentos</Lancamentos>
      <Carousel itemsToScroll={3} itemsToShow={5} itemPadding={[30, 30]}>
        {filmes.map((item) => (
          <div>
            <img src={item.image} style={{ width: "90%" }} />
            <CarouselTitle>{item.title}</CarouselTitle>
            <CarouselDate>{item.release_date}</CarouselDate>
          </div>
        ))}
      </Carousel>
    </ContainerCarousel>
  );
}
