// Home.jsx
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import Search from './components/Search.jsx';
import Spinner from './components/Spinner.jsx';
import Moviecard from './components/Moviecard.jsx';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movielist, setmovielist] = useState([]);
  const [isloding, setisloding] = useState(false);
  const [debounce, setDebounce] = useState('');

  useDebounce(() => setDebounce(searchTerm), 700, [searchTerm]);

  const fetchMovies = async (query = '') => {
    setisloding(true);
    setErrorMessage('');

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch Movies");
      }

      const data = await response.json();

      if (data.results?.length === 0) {
        setErrorMessage("No movies found.");
        setmovielist([]);
        return;
      }

      setmovielist(data.results || []);
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Try again later.");
    } finally {
      setisloding(false);
    }
  };

  useEffect(() => {
    fetchMovies(debounce.trim());
  }, [debounce]);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span>. You'll Enjoy Without Any Hassle.
          </h1>

          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            fetchMovies={fetchMovies} 
          />
        </header>

        <section className="all-movies">
          <h2 className='mt-10'>
            {debounce.trim() ? 'Searched Movies' : 'Trending Movies'}
          </h2>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          {isloding ? (
            <Spinner />
          ) : (
            <ul>
              {movielist.map((movie) => (
                <Moviecard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default Home;
