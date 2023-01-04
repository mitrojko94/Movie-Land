import "./App.css";
import { useEffect, useState } from "react";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=c032e2d7";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovie("Spiderman");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovie(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => {
            return <MovieCard movie={movie} key={movie.imdbID} />;
          })}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found!</h2>
        </div>
      )}
    </div>
  );
};

export default App;
