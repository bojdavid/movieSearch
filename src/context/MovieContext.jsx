import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();
export const useMovieContext = () =>  useContext(useContext)
export const movieProvider = ({children}) => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const storedFavs = localStorage.getItem("favourites")

        if(storedFavs){
            setFavourites(JSON.parse(storedFavs))
        }
    })

    return(
        <MovieContext.Provider>
            {children}
        </MovieContext.Provider>
    )
}