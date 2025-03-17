import React from 'react';

const PageBody = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            {children}
        </div>
    );
};

export default PageBody;