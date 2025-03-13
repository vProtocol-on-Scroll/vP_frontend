import React from 'react';

interface LoadingProps {
    size?: number; 
}

const Loading: React.FC<LoadingProps> = ({ size = 50 }) => {
    return (
        <div className="flex items-center justify-center h-full">
            <img
                src="/coins/vToken.svg"
                alt="Loading..."
                style={{
                    width: size,
                    height: size,
                }}
                className="animate-spin"
            />
        </div>
    );
};

export default Loading;