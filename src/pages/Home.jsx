import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css"
import {searchMovies, getPopularMovies} from "../services/api.js"

function Home(){
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    const [movies, setMovies] = useState([])
    


  useEffect( () => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);


    
    const handleSearch = async (e) =>{
        e.preventDefault()
        if(!searchQuery.trim()) return
        if (loading) return

        setLoading(true);

        try{
            const searchResult = await searchMovies(searchQuery)
            setMovies(searchResult)
            setError(null);
        }
        catch(err){
            console.error(err)
            setError("Failed to search Movies...")
        }
        finally{
            
            setLoading(false)
        }

    }

    /*
    const movies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    release_date: "1994-09-22"
  },
  {
    id: 2,
    title: "The Godfather",
    release_date: "1972-03-24"
  },
  {
    id: 3,
    title: "The Dark Knight",
    release_date: "2008-07-18"
  },
  {
    id: 4,
    title: "Pulp Fiction",
    release_date: "1994-10-14"
  },
  {
    id: 5,
    title: "Forrest Gump",
    release_date: "1994-07-06"
  },
  {
    id: 6,
    title: "Inception",
    release_date: "2010-07-16"
  },
  {
    id: 7,
    title: "The Matrix",
    release_date: "1999-03-31"
  },
  {
    id: 8,
    title: "Fight Club",
    release_date: "1999-10-15"
  },
  {
    id: 9,
    title: "Interstellar",
    release_date: "2014-11-07"
  },
  {
    id: 10,
    title: "Parasite",
    release_date: "2019-05-30"
  }
]
  */
  

    return <div className="home">
              <form onSubmit={handleSearch} className="search-form">
                <input
                type="text"
                placeholder="Search for movies..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">
                Search
                </button>
            </form>

            {error && <div className="error-message">{error}</div>}

                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                    </div>
                )}
    </div>

}

export default Home