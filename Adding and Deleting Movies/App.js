import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://movie-store-4208a-default-rtdb.firebaseio.com/movies.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const loadmovies = [];
      for (const key in data){
        loadmovies.push({
          id:key,
          title:data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].releaseDate,

        })
      }
      setMovies(loadmovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch('https://movie-store-4208a-default-rtdb.firebaseio.com/movies.json',{
      method:'POST',
      body: JSON.stringify(movie),
      headers:{
        'Content-Type' : 'application/json'
      }
    });
    const data = await response.json();
    console.log(data)
  }
  async function deleteMovieHandler(id){
    const response = await fetch(`https://movie-store-4208a-default-rtdb.firebaseio.com/:${id}.json`,{
      method:'DELETE',
      body: JSON.stringify(id),
      headers:{
        'Content-Types' : 'application/json'

      }

    });
    const data = await response.json();
    console.log(data)
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} /><br></br>
        <form onSubmit={deleteMovieHandler}>
          <input type="text" id='text'></input><br></br><br></br>
          <button>Delete Movies</button>
        </form>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
