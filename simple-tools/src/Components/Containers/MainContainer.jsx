import React from 'react';

const MainContainer = ({ children }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg m-3 p-6 w-full max-w-md h-full">
            {children}
        </div>
    );
};

export default MainContainer;