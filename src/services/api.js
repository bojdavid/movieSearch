const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"
const API_READ = import.meta.env.VITE_API_READ


export const getPopularMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_READ}` 
    }
    };
  const response = await fetch(url, options)
  const data = await response.json();
  return data.results
};


export const searchMovies = async (query)=>{
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_READ}` 
    }
    };

    const response = await fetch(url, options)
    const data = await response.json()
    return data.results
}