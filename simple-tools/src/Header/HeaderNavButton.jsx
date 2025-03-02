import React from 'react';
import { useNavigate } from "react-router-dom";

const HeaderNavButton = ({ id, icon }) => {

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/${id}`);
        console.log(id);
    };

    return (
        <button 
            className='cursor-pointer p-2 bg-blue-900 hover:bg-blue-800 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105' 
            id={id} 
            onClick={() => handleClick(id)}
        >
            <img src={icon} alt={id} className='w-6 h-6' />
        </button>
    );
};

export default HeaderNavButton;