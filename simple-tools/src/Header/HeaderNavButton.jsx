import React from 'react';
import { useNavigate } from "react-router-dom";

const HeaderNavButton = ({ id, icon }) => {
   
    const navigate = useNavigate();
    
    const handleClick = (id) => {
        navigate(`/${id}`);
        console.log(id);
    };

    return (
        <button className='header-nav-button' id={id} onClick={() => handleClick(id)}>
            <img src={icon} alt={id}></img>
        </button>
    );
};

export default HeaderNavButton;