import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import styled from "styled-components";

const SliderBox = styled.section`
display: flex;
flex-direction: column;
  height: 70vh;
  padding: 1rem;
  border: 2px white;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  color: #f2f2f2;
`;

const Lancamentos = styled.h2`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  margin-left: 5rem;
`;

const CarouselDate = styled.h3`
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 0.8rem;
  color: #f6f6f6;
  opacity: 0.5;
`;

const CarouselTitle = styled.h2`
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  color: #f2f2f2;
`;

export default function Carousel() {
  const [filmes, setFilmes] = useState([]);

  const getApi = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=34635a3c54d72514d08fd6979b14e222&language=pt-Br&page=1"
      )
      .then((response) => {
        setFilmes(response.data.results);
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5
  };
  return (
    <SliderBox>
      <Lancamentos>Últimos Lançamentos</Lancamentos>
      <Slider {...settings} style={{ width: "95%" }}>
        {filmes.map((item) => (
          
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              alt={item.title}
              style={{ width: "70%" }}
            />
           <CarouselTitle>{item.title}</CarouselTitle>
            <CarouselDate>{item.release_date.split("-")[0]}</CarouselDate>
          </div>
        ))}
      </Slider>
    </SliderBox>
  );
}

