import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
            <input type="text" value={inputValue} onChange={handleInputChange} />
            <button type="submit" onClick={handleSubmit}>Procurar</button>
        </form>
    )
}