import React, { useState, useEffect, useRef } from 'react'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Input = styled.input`
width: 8vw;
height: 3vh;
outline: none;
background-color:transparent;
font-style:italic;
border: none;
background-color:#d8ecec;
border-radius:15px;
`;

const Button = styled.button`
width: 30%;
height: 4vh;
border-radius: 4px;
border: none;
background-color:#d8ecec;
`;

const DivBusca = styled.div`
  background-color:#d8ecec;
  border: none;
  border-radius:15px;
  width: 14vw;
  height: 5vh;
  margin-left: -15rem;
`;


export default function InputSearch() {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate()

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/busca/${inputValue}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <DivBusca>
            <Input type="text" value={inputValue} onChange={handleInputChange} placeholder="Pesquise o filme..." />
            <Button type="submit" onClick={handleSubmit}>Buscar</Button>
            </DivBusca>
        </form>
    )
}