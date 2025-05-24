import React from 'react'

const FavoriteToggle = ({ isFavorite, onToggle, hoverBackground }) => {
    return (

        <button
            type="button"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggle();
            }}
            className={`${hoverBackground ? "hover:bg-saffron/10 p-2" : ""} rounded-full h-fit w-fit transition-colors duration-200`}
            title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
            {isFavorite ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${hoverBackground ? "h-6 w-6" : "h-5 w-5"} text-saffron stroke-saffron stroke-[1.5] fill-current hover:text-saffron/70 transition-colors duration-200`}
                    viewBox="0 0 24 24"
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${hoverBackground ? "h-6 w-6" : "h-5 w-5"} text-saffron opacity-70 hover:fill-saffron/80 fill-none stroke-saffron/70 stroke-[1.5] hover:text-saffron/80  transition-colors duration-200`}
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            )}
        </button>

    )
}

export default FavoriteToggle